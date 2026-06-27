import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  DestroyRef,
  Injectable,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { BreadcrumbItem } from '../models/breadcrumb.model';

type ThemeMode = 'light' | 'dark';

const MOBILE_QUERY = '(max-width: 991.98px)';

@Injectable({ providedIn: 'root' })
export class LayoutStateService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private mediaQuery?: MediaQueryList;

  readonly sidebarCollapsed = signal(false);
  readonly mobileSidebarOpen = signal(false);
  readonly isMobile = signal(false);
  readonly theme = signal<ThemeMode>('light');
  readonly breadcrumbs = signal<readonly BreadcrumbItem[]>([]);
  readonly expandedMenuIds = signal<ReadonlySet<string>>(new Set<string>());

  readonly showMobileOverlay = computed(() => this.isMobile() && this.mobileSidebarOpen());
  readonly sidebarExpanded = computed(() =>
    this.isMobile() ? this.mobileSidebarOpen() : !this.sidebarCollapsed(),
  );

  constructor() {
    this.initializeViewportState();
    this.syncThemeAttribute();
  }

  toggleSidebar(): void {
    if (this.isMobile()) {
      this.mobileSidebarOpen.update((isOpen) => !isOpen);
      return;
    }

    this.sidebarCollapsed.update((isCollapsed) => !isCollapsed);
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen.set(false);
  }

  toggleTheme(): void {
    this.theme.update((theme) => (theme === 'light' ? 'dark' : 'light'));
  }

  toggleMenu(menuId: string): void {
    this.expandedMenuIds.update((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(menuId)) {
        nextIds.delete(menuId);
      } else {
        nextIds.add(menuId);
      }

      return nextIds;
    });
  }

  isMenuExpanded(menuId: string): boolean {
    return this.expandedMenuIds().has(menuId);
  }

  setBreadcrumbs(items: readonly BreadcrumbItem[]): void {
    this.breadcrumbs.set(items);
  }

  private initializeViewportState(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.mediaQuery = window.matchMedia(MOBILE_QUERY);
    const updateViewport = () => {
      this.isMobile.set(Boolean(this.mediaQuery?.matches));

      if (!this.isMobile()) {
        this.mobileSidebarOpen.set(false);
      }
    };

    updateViewport();
    this.mediaQuery.addEventListener('change', updateViewport);
    this.destroyRef.onDestroy(() => {
      this.mediaQuery?.removeEventListener('change', updateViewport);
    });
  }

  private syncThemeAttribute(): void {
    effect(() => {
      this.document.documentElement.dataset['bsTheme'] = this.theme();
    });
  }
}
