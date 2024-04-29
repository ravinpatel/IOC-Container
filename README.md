# IOC-Container
A simple Typescript inversion of control (IOC) container. TypeScript based lightweight annotation-based dependency injection container. 

## How to install
You can install this package using NPM:
```
npm i ioc-container-simple
```

## How to use (examples)

### Class injection
#### You can use `inject` decorator to inject dependencies into properties and methods of a class

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

### Injecting Dependencies with Custom Names
#### Specify custom names for your dependencies

```typescript
import { inject } from './inject';

class MyClass {
  @inject({ name: 'CustomNameForDependencyA' })
  dependencyA!: DependencyA;

  @inject({ name: 'CustomNameForDependencyB' })
  dependencyB!: DependencyB;
}
```

### Injecting Dependencies with Optional Scopes
#### Specify optional scopes for your dependencies

```typescript
import { inject } from './inject';

class MyClass {
  @inject({ name: 'CustomNameForDependencyA' })
  dependencyA!: DependencyA;

  @inject({ name: 'CustomNameForDependencyB' })
  dependencyB!: DependencyB;
}
```


