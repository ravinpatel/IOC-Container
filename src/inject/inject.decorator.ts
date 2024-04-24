import { Registry } from "../registry/registry"

interface Options {
  name?: string
  scope?: string
}

export const inject = (options?: Options) => (target: any, propertyKey: string | symbol) => {
  const registryName = Registry.name.toLocaleLowerCase()
  if (!Registry.has(registryName)) {
    Registry.create(registryName, new Registry())
  }

  const get = () => Registry.retrieve(options?.name || propertyKey.toString())
  Object.defineProperty(target, propertyKey, { get })
};
