import { Component, Inject } from '@angular/core';
import { strategyProvider } from './strategy-provider';
import { CommonStrategy } from './common-strategy';
import {
  COMPONENT_STRATEGY,
  IComponentStrategy,
  IStandardizedComponent
} from './interfaces';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [strategyProvider(CommonStrategy)]
})
export class StandardizedComponent<T extends object>
  implements IStandardizedComponent<T> {
  constructor(
    @Inject(COMPONENT_STRATEGY) readonly strategy: IComponentStrategy<T>
  ) {}
}
