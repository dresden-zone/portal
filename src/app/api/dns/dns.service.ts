import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, Subject, switchMap, tap} from "rxjs";
import {Record, RecordInsert, RecordType, Zone} from "./dns.domain";
import {API_BASE} from "../api.domain";

@Injectable({
  providedIn: 'root'
})
export class DnsService {

  private zones0: BehaviorSubject<Zone[]> | null = null;
  private updatingZones: Subject<void> | null = null;

  private records0: { [K in RecordType]?: BehaviorSubject<Record<K>[]> } = {};
  private zoneId0: string | null = null;

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public getZones(): Observable<Zone[]> {
    if (this.zones0 === null) {
      if (this.updatingZones === null) {
        this.updatingZones = new Subject<void>();
        return this.http.get<Zone[]>(`${API_BASE}/dns/v1/zone`)
          .pipe(switchMap(zones => {
            this.zones0 = new BehaviorSubject(zones);
            this.updatingZones!.next();
            this.updatingZones!.complete();
            return this.zones0;
          }));
      } else {
        return this.updatingZones.pipe(switchMap(() => this.zones0!));
      }
    } else {
      return this.zones0.asObservable();
    }
  }

  public getZone(id: string): Observable<Zone | null> {
    return this.getZones().pipe(map(zones => zones.find(zone => zone.id === id) ?? null));
  }

  public createZone(name: string): Observable<Zone> {
    return this.http.post<Zone>(`${API_BASE}/dns/v1/zone`, {name})
      .pipe(tap(zone => {
        if (this.zones0) {
          this.zones0.next([...this.zones0.value, zone]);
        }
      }))
  }

  public getRecords<T extends RecordType>(type: T, zoneId: string): Observable<Record<T>[]> {
    if (this.zoneId0 === zoneId) {
      const cached = this.records0[type];
      if (typeof cached !== "undefined") {
        return cached.asObservable();
      }
    } else {
      Object.values(this.records0).forEach(records => records.complete());
      this.records0 = {};
      this.zoneId0 = zoneId;
    }

    // @ts-expect-error
    const cached = this.records0[type] = new BehaviorSubject<Record<T>[]>([]);

    return this.http.get<Record<T>[]>(`${API_BASE}/dns/v1/zone/${zoneId}/record/${type}`)
      .pipe(switchMap(records => {
        cached.next(records);
        return cached.asObservable();
      }))
  }

  public getRecord<T extends RecordType>(type: T, zoneId: string, recordId: string): Observable<Record<T> | null> {
    return this.getRecords(type, zoneId)
      .pipe(map(records => records.find(record => record.id === recordId) ?? null));
  }

  public createRecord<T extends RecordType>(type: T, zoneId: string, data: RecordInsert<T>): Observable<Record<T>> {
    return this.http.post<Record<T>>(`${API_BASE}/dns/v1/zone/${zoneId}/record/${type}`, data)
      .pipe(tap(record => {
        const records = this.records0[type];
        if (typeof records !== "undefined") {
          records.next([...records.value, record]);
        }
      }));
  }

  public modifyRecord<T extends RecordType>(type: T, recordId: string, data: RecordInsert<T>): Observable<Record<T>> {
    return this.http.put<Record<T>>(`${API_BASE}/dns/v1/record/${type}/${recordId}`, data)
      .pipe(tap(record => {
        const records = this.records0[type];

        if (typeof records !== "undefined") {
          records.value.forEach(currRecord => {
            if (currRecord.id === recordId) {
              Object.assign(currRecord, record);
            }
          });

          records.next([...records.value]);
        }
      }));
  }
}
