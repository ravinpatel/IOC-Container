import { Registry } from "../registry/registry"

interface Options {
  name?: string
  scope?: string
}

// Decorator function for injecting dependencies
// target represents either constructor func of the class or the prototype of the class
export const inject = (options?: Options) => (target: any, propertyKey: string | symbol) => {
  const registryName = Registry.name.toLocaleLowerCase()
  // If the Registry doesn't have an entry for the class, create one
  if (!Registry.has(registryName)) {
    Registry.create(registryName, new Registry())
  }
  // Define a getter function to retrieve the injected value from the Registry
  const get = () => Registry.retrieve(options?.name || propertyKey.toString())
  // Define the property with the getter function
  Object.defineProperty(target, propertyKey, { get })
};
