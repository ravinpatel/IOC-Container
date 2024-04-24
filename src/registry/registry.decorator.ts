import { Registry } from "./registry"
import { Constructor } from "./registry.types"

export class Injection<T> {
  constructor(public name: string, public value: T) {}
}

export function registry(injections: (Constructor | Injection<any> | Registry)[] = []) {
  return function <T extends Constructor>(constructor: T): T {
    class RegistryWrapper extends constructor {
      constructor(...args: any[]) {
        super(...args)
        this.registerInjections(injections)
      }

      private registerInjections(injections: (Constructor | Injection<any> | Registry)[]): void {
        injections?.forEach((injection) => {
          if (injection instanceof Injection) {
            const name = injection?.name?.toLowerCase();
            Registry.create(name, injection.value)
          } else if (injection instanceof Registry) {
            const name = (injection.constructor as typeof Registry).name.toLocaleLowerCase()
            Registry.create(name, injection)
          } else {
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