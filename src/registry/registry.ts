export class Registry {
  // Map to hold registered services
  static services = new Map()

  // Create a new entry in the registry
  static create<Type>(name: string, value: Type): void {
    if(this.services.has(name)){
      throw new Error(`${name} already exists in the registry`)
    }
    this.services.set(name, value)
  }

  // Retrieve a value from the registry by name
  static retrieve<Type>(name:string): Type | undefined {
    return this.services.get(name)
  }

  // Check if exists in the registry by name
  static has(name:string): boolean {
    return this.services.has(name)
  }
  
  // Delete a value from the registry by name
  static delete(name: string): void {
    if(!this.services.has(name)) {
      throw new Error(`${name} does not exist in the registry`)
    }
    this.services.delete(name)
  }
}