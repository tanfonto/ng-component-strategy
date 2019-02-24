import { Patch } from './common-types';
import { InjectionToken } from '@angular/core';

export interface IComponentStrategy<T extends object = object> {
  readonly state: T;
  render(): void;
  patch(changes: T, merge?: Patch): void;
  effect(fn: () => void): void;
}

export interface IStandardizedComponent<T extends object> {
  strategy: IComponentStrategy<T>;
}

export const COMPONENT_STRATEGY = new InjectionToken<IComponentStrategy>(
  'COMPONENT-STRATEGY'
);
