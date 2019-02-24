import { NgModule } from '@angular/core';
import { construct, combine } from './utils';
import { INITIALIZE, PATCH } from './common-types';

@NgModule({
  providers: [
    {
      provide: INITIALIZE,
      useValue: construct
    },
    {
      provide: PATCH,
      useValue: combine
    }
  ]
})
export class StrategyModule {}
