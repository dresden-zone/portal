import {Injectable, Type} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

export interface Sidebar<C> {
  title: string;
  component: Type<C>
  inputs: Partial<C> | undefined,
  content: any[][] | undefined,
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private readonly sidebar = new BehaviorSubject<Sidebar<unknown> | null>(null);

  public getSidebar(): Observable<Sidebar<unknown> | null> {
    return this.sidebar.asObservable();
  }

  public open<C>(title: string, component: Type<C>, inputs?: Partial<C>, content?: any[][]): void {
    this.sidebar.next({title, component, inputs, content});
  }

  public close(): void {
    this.sidebar.next(null);
  }
}
