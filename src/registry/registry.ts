export class Registry {
  static services: Map<string, any> = new Map<string, any>()

  static create<Type>(name: string, value: Type): void {
    if(this.services.has(name)){
      throw new Error(`${name} already exists in the registry`)
    }
    this.services.set(name, value)
  }

  static retrieve<Type>(name:string): Type | undefined {
    return this.services.get(name)
  }

  static has(name:string): boolean {
    return this.services.has(name)
  }

  static delete(name: string): void {
    if(!this.services.has(name)) {
      throw new Error(`${name} does not exist in the registry`)
    }
    this.services.delete(name)
  }
}