export type Wrap<C> = {
  [K in keyof C]: { wrapped: C[K] }
}
