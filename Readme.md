# TS Bug report

TS seems to generate invalid typedefs (there is no `B` in the scope) on incremental builds

```ts
export const bug: W.Wrap<{
  n: B.Box<number>
}>
import * as W from "./wrap.js"
```

From the following source module (with `checkJs` enabled):

```js
import * as B from "./box.js"
import * as W from "./wrap.js"

/**
 * @template C
 * @param {C} source
 * @returns {W.Wrap<C>}
 */
const wrap = source => {
  throw source
}

/**
 * @returns {B.Box<number>}
 */
const box = (n = 0) => ({ unbox: () => n })

export const bug = wrap({ n: box(1) })
```

When imported `Wrap` is a [Mapped Types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) that TS does not unpack:

```ts
export type Wrap<C> = {
  [K in keyof C]: { wrapped: C[K] }
}
```

Even with a pretty simple `Box` type:

```ts
export interface Box<T> {
  unbox(): T
}
```
