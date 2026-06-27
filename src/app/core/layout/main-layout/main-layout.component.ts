import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BreadcrumbItem } from '../models/breadcrumb.model';
import { LayoutStateService } from '../services/layout-state.service';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
    FooterComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  protected readonly layoutState = inject(LayoutStateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.layoutState.setBreadcrumbs(this.createBreadcrumbs()));
  }

  @HostListener('document:keydown.escape')
  protected closeSidebarFromKeyboard(): void {
    this.layoutState.closeMobileSidebar();
  }

  protected closeSidebarFromOverlay(): void {
    this.layoutState.closeMobileSidebar();
    this.document.getElementById('main-menu-button')?.focus();
  }

  private createBreadcrumbs(): readonly BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [];
    let currentRoute = this.router.routerState.snapshot.root;
    let url = '';

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
      const routePath = currentRoute.url.map((segment) => segment.path).join('/');

      if (routePath) {
        url += `/${routePath}`;
      }

      const label = currentRoute.data['breadcrumb'] as string | undefined;

      if (label) {
        breadcrumbs.push({
          label,
          url,
          active: false,
        });
      }
    }

    return breadcrumbs.map((breadcrumb, index) => ({
      ...breadcrumb,
      active: index === breadcrumbs.length - 1,
    }));
  }
}
