import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, switchMap, tap} from "rxjs";
import {Zone} from "./dns.domain";
import {API_BASE} from "../api.domain";

@Injectable({
  providedIn: 'root'
})
export class DnsService {

  private zones0: BehaviorSubject<Zone[]> | null = null;

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
}