import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { APP_NAVIGATION } from '../config/navigation.config';
import { LayoutStateService } from '../services/layout-state.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  protected readonly navigationItems = APP_NAVIGATION;
  protected readonly layoutState = inject(LayoutStateService);
}
