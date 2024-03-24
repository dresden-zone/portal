import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SidebarService} from "./sidebar.service";
import {AsyncPipe, NgComponentOutlet, NgIf} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    AsyncPipe,
    NgComponentOutlet,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  protected readonly sidebar = this.sidebarService.getSidebar();

  constructor(
    private readonly sidebarService: SidebarService
  ) {
  }

  protected close(): void {
    this.sidebarService.close();
  }
}
