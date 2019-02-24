import { InjectionToken } from '@angular/core';

export type Initializer<T extends object = object> = () => T;
export type Patch<T extends object = object> = (state: T, patch: T) => T;

export const INITIALIZE = new InjectionToken<Initializer>('STATE-INITIALIZER');
export const PATCH = new InjectionToken<Patch>('STATE-PATCHER');
