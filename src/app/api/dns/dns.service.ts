import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, switchMap, tap} from "rxjs";
import {Record, RecordInsert, RecordType, Zone} from "./dns.domain";
import {API_BASE} from "../api.domain";

@Injectable({
  providedIn: 'root'
})
export class DnsService {

  private zones0: BehaviorSubject<Zone[]> | null = null;

  private records0: { [K in RecordType]?: BehaviorSubject<Record<K>[]> } = {};

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public getZones(): Observable<Zone[]> {
    if (this.zones0 === null) {
      return this.http.get<Zone[]>(`${API_BASE}/dns/v1/zone`)
        .pipe(switchMap(zones => this.zones0 = new BehaviorSubject(zones)));
    } else {
      return this.zones0.asObservable();
    }
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
    {
      const cached = this.records0[type];
      if (typeof cached !== "undefined") {
        return cached.asObservable();
      }
    }

    // @ts-expect-error
    const cached = this.records0[type] = new BehaviorSubject<Record<T>[]>([]);

    return this.http.get<Record<T>[]>(`${API_BASE}/dns/v1/zone/${zoneId}/record/${type}`)
      .pipe(switchMap(records => {
        cached.next(records);
        return cached.asObservable();
      }))
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
    return this.http.put<Record<T>>(`${API_BASE}/dns/v1/zone/record/${type}/${recordId}`, data)
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
