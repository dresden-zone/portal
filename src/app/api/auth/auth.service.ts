import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, switchMap, tap} from "rxjs";
import {Invite, User} from "./auth.domain";
import {API_BASE} from "../api.domain";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private me0: BehaviorSubject<User> | null = null;

  constructor(
    private readonly http: HttpClient,
  ) {
  }

  public isAuthenticated(): Observable<boolean> {
    if (this.me0 === null) {
      return this.http.get<User>(`${API_BASE}/auth/v1/me`)
        .pipe(
          tap(user => this.me0 = new BehaviorSubject(user)),
          map(() => true),
          catchError(() => of(false)),
        );
    } else {
      return of(true);
    }
  }

  public me(): Observable<User> {
    if (!this.me0) {
      throw new Error("missing routing guard for authentication");
    }

    return this.me0;
  }

  public checkInvite(id: string): Observable<Invite> {
    return this.http.get<Invite>(`${API_BASE}/auth/v1/invite/${id}`);
  }

  public register(inviteId: string, name: string, email: string | null, display_name: string, password: string): Observable<User> {
    return this.http.post<User>(`${API_BASE}/auth/v1/register/${inviteId}`, {name, email, display_name, password});
  }

  public password(name: string, password: string): Observable<User> {
    return this.http.post<User>(`${API_BASE}/auth/v1/password`, {name, password})
      .pipe(
        tap(user => {
          if (this.me0 === null) {
            this.me0 = new BehaviorSubject(user);
          } else {
            this.me0.next(user);
          }
        }),
        switchMap(() => this.me0!)
      );
  }
}
