# IOC-Container
A simple Typescript inversion of control (IOC) container. TypeScript based lightweight annotation-based dependency injection container. 

## How to install
You can install this package using NPM:
```
npm i ioc-container-simple
```

## How to use (examples)

### Class injection

```typescript
import { Registry, registry, inject } from '@ravinpatel/ioc-container-simple';

class C {
  @inject() public readonly registry: Registry
}

class B {
  @inject() public readonly c: C
}

class A {
  @inject() public readonly b: B
}


@registry([A, B, C])

class App {
  @inject()
  public readonly a: A
}

```



