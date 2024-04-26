import { Registry } from "./registry"
import { Constructor } from "./registry.types"

// represents an injection with name and value
export class Injection<T> {
  constructor(public name: string, public value: T) {}
}

// Decorator function for registering injections
export function registry(injections: (Constructor | Registry)[] = []) {
  // Return a decorator function that accepts the constructor of the decorated class
  return function <T extends Constructor>(constructor: T): T {
    // Create a subclass that extends the original constructor
    class RegistryWrapper extends constructor {
      constructor(...args: any[]) {
        super(...args)
        // Register injections
        this.registerInjections(injections)
      }
      // Register injections into the Registry
      private registerInjections(injections: (Constructor | Injection<ClassFieldDecoratorContext> | Registry)[]): void {
        injections?.forEach((injection) => {
          if (injection instanceof Injection) {
            // If it's an Injection, extract name and value and register in the Registry
            const name = injection?.name?.toLowerCase()
            Registry.create(name, injection.value)
          } else if (injection instanceof Registry) {
             // If it's a Registry instance, register it directly
            const name = (injection.constructor as typeof Registry).name.toLocaleLowerCase()
            Registry.create(name, injection)
          } else {
            // If it's a Constructor, create an instance and register it in the Registry
            const name = injection?.name?.toLowerCase()
            const value = new injection()
            Registry.create(name, value)
          }
        });
      }
    }
    return RegistryWrapper
  }
}