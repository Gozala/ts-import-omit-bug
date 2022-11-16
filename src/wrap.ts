export type Wrap<C> = {
  [K in keyof C]: K extends string ? { [key in K]: C } : never
}
