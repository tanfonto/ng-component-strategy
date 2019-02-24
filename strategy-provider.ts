import { ChangeDetectorRef, NgZone, Type } from '@angular/core';
import { INITIALIZE, PATCH } from './common-types';
import { COMPONENT_STRATEGY, IComponentStrategy } from './interfaces';

export const strategyProvider = <T extends object>(
  type: Type<IComponentStrategy<T>>
) => ({
  provide: COMPONENT_STRATEGY,
  useClass: type,
  deps: [NgZone, ChangeDetectorRef, INITIALIZE, PATCH]
});
