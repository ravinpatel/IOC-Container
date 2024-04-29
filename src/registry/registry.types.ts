export interface Constructor<T = NonNullable<unknown>> {
  new (...args: any[]): T
}

export type Injection<T> = { name: string; value: T }