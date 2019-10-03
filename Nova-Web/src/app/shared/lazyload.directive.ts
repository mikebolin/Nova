import {
  AfterViewInit,
  Directive,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[loadOnDemand]'
})
export class TabContentLoadOnDemandDirective
  implements OnInit, AfterViewInit, OnDestroy {
  protected s: Subscription;
  protected wasLoaded: boolean;

  constructor(
    @Optional() private tabStripComponent: any,
    @Optional() private tabStripTabComponent: any,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {
    if (!this.tabStripComponent || !tabStripTabComponent) {
      return;
    }
    this.tabStripComponent.keepTabContent = true;
  }

  public ngOnInit(): void {
    this.s = new Subscription().add(
      this.tabStripComponent.tabSelect.subscribe(this.tabSelectEx.bind(this))
    );
  }

  public ngAfterViewInit(): void {
    if (this.tabStripTabComponent.active) {
      this.loadMe();
    }
  }

  public ngOnDestroy(): void {
    this.s.unsubscribe();
  }

  protected loadMe(): void {
    if (!this.wasLoaded) {
      this.wasLoaded = true;
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  protected unloadMe(): void {
    if (this.wasLoaded) {
      this.wasLoaded = false;
      this.viewContainer.clear();
    }
  }

  protected tabSelectEx(e: any): void {
    if (e.title === this.tabStripTabComponent.title) {
      this.loadMe();
    }
  }
}
