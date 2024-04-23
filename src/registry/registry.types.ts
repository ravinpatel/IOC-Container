export interface Constructor {
  new (...args: any[]): {}
}

export type Injection = { name: string; value: any } 