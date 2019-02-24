import { ChangeDetectorRef, Injectable, Inject, NgZone } from '@angular/core';
import { construct } from './utils';
import { INITIALIZE, PATCH, Initializer, Patch } from './common-types';
import { IComponentStrategy } from './interfaces';

@Injectable()
export class CommonStrategy<T extends object> implements IComponentStrategy<T> {
  readonly state: T;

  constructor(
    private readonly zone: NgZone,
    private readonly changeDetector: ChangeDetectorRef,
    @Inject(INITIALIZE) initialize: Initializer<T>,
    @Inject(PATCH) private readonly doPatch: Patch<T>
  ) {
    this.state = initialize();
    this.changeDetector.detach();
  }

  public render(async = true) {
    if (async) {
      this.changeDetector.markForCheck();
    } else {
      this.changeDetector.detectChanges();
    }
  }

  patch(changes: T, merge = this.doPatch) {
    merge(merge(construct(), this.state), changes);
    this.render();
  }

  public effect(fn: () => void) {
    this.zone.runOutsideAngular(() => setTimeout(fn));
  }
}
