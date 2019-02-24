Despite rumors [Angular](https://github.com/angular/angular) is extremely flexible. In a certain sense it's actually more flexible than the current foty, as it allows a customization of its very core areas, high degree of metaprogramming and exposes serious amount of extensibility points.

This can certainly be used to one's advantage but it may also bring confusion and havoc where various state management, component interaction and code composition techniques clash.

Architecting some Angular-based systems I had a chance to experiment and verify how certain approaches i.e.

- Metaprogramming with decorators;
- OO-like inheritance;
- Functional composition;

fit into real world scenarios and found all of them lacking.

Metaprogramming is great but it can become a hell to implement if you want to do it right (read: corner cases) plus the typing support it offers is very limited if you're not willing to produce additional boilerplate. Inheritance is known to be kind of a 'last resort' technique for a reason and fp-like composition has a very limited (yet time-consuming) application in Angular because of classes, decorators and
OO ideology in general.

This repo is an example of what I currently perceive a 'golden path' for common component design.

Simply put, I shift the common component responsibilities to a parametrised strategy that implements _at least_ the following interface:

```javascript
interface IComponentStrategy<T extends object = object> {
  readonly state: T;
  render(): void;
  patch(changes: T, merge?: Patch): void;
  effect(fn: () => void): void;
}
```

ensure [the service that implements it](./common-strategy.ts) consumes whatever component-level dependencies it may need by scoping it to component level providers section (see how [strategyProvider](./strategy-provider.ts) is used by the [standardizedComponent](./standardized-component.ts)) and inject it into the actual component.

What do I gain:

- Code reuse;
- Boilerplate reduction;
- Standardized -> predictable behaviours;
- Improved testability (service > component);
- Improved composition, I can easily scale the concept with interface segregation;

What do I lose:

- Explicit component signature (this is where [marker interface](./interfaces.ts) is supposed to jump in);
