# Soapstone <img src="https://i.imgur.com/558wF8f.png" width="90" height="90" align="right">

A bare bones React state manager.

## Why Another State Manager?

I am frustrated with Zustand which became the very thing it was made to replace: an over the top, complicated, bloated, and hard to use library, much like Redux.

So, I present Soapstone to you. Atomic? Hook-based? I have no idea, but it's got a great developer experience.

## Installation

```bash
npm install soapstone
```

## Creating a Store

Start by declaring the state of your store:

```ts
interface MyStore {
  user: {
    name: string;
    age: number;
  };

  todos: string[];
}
```

Then pass your type into an instance of the `Soapstone` class, while giving it a default state:

```ts
const MyStore = new Soapstone<MyStore>({
  user: {
    name: "John Doe",
    age: 22,
  },

  todos: [],
});
```

## Using the Store

In any React component, use the `use` method to reactively subscribe to the store:

```tsx
function MyComponent() {
  const store = MyStore.use();

  return (
    <span>
      {store.user.name} is {store.user.age} years old
    </span>
  );
}
```

However, using the `use` method without any arguments will subscribe you to the entire store, causing re-renders on every state change, anywhere in the tree. It's smarter to subscribe to a smaller, more relevant slice(s) of the store, causing re-renders on when the relevant values are changed:

```tsx
function MyComponent() {
  const name = MyStore.use((state) => state.user.name);
  const age = MyStore.use((state) => state.user.age);

  return (
    <span>
      {name} is {age} years old
    </span>
  );
}
```

## Mutating the Store

Use the `mutate` method to update the store's state:

```tsx
function MyComponent() {
  const name = MyStore.use((state) => state.user.name);
  const age = MyStore.use((state) => state.user.age);

  return (
    <div>
      <span>
        {name} is {age} years old
      </span>

      <button
        onClick={() => {
          MyStore.mutate((draft) => {
            draft.user.age++;
          });
        }}
      >
        Older!
      </button>
    </div>
  );
}
```

> [!NOTE]
> Soapstone uses Immer internally to manage state updates while preserving immutability.
>
> In the example above, changing `age` causes both the root object and `user` to be recreated. This means that updating `user.age` also creates a new `user` object reference, which triggers re-renders in any components subscribed to `use((state) => state.user)`.

## Feature: Persistence

If you would like your store to persist across page reloads, you can pass in a unique identifier which will be used to save your state to local storage:

```ts
const MyStore = new Soapstone<MyStore>(
  { ... },
  "my-store",
);
```

> [!WARNING]
> This hydration with local data may cause issues if you're using server-side rendering which expects both the server and client to agree on the same initially rendered content. Please see the deferred hook below.

## Uninitialized Stores

If you don't have enough data to create your initial state, you can pass a function that you can initialize later with the `useInitialization` hook:

```ts
const MyStore = new Soapstone<MyStore, [string, number]>((name, age) => {
  return {
    user: { name, age },
    todos: [],
  };
});
```

You must initialize the store before using any of its methods:

```tsx
function MyComponent() {
  MyStore.useInitialization(api.getName(), api.getAge());
  ...
}
```

> [!WARNING]
> This hydration with locally fetched data may cause issues if you're using server-side rendering which expects both the server and client to agree on the same initially rendered content. Please see the deferred hook below.

## Deferred Hook

Sometimes, you may desire the server and client to agree on the same initial state, just for the client to override it upon mount. You can achieve this with the `useDeferred` which returns a dummy value, consistent across the server and client, and overrides it when the component mounts, only on the client:

```tsx
interface MyStore {
  name: string;
}

const MyStore = new Soapstone<MyStore>({ ... }, "my-store");

function MyComponent() {
  const name = MyStore.useDeferred((state) => state.name, "Dummy Name");

  return <span>{name} says hello!</span>;
}
```

## Subscribing

If reactivity doesn't tickle your fancy and you need a more traditional subscription-based/event-style system, you can use the `on` method:

```ts
const unsubscribeName = MyStore.on(
  (state) => state.user.name,
  (name) => {
    console.log(`Name is now ${name}!`);
  },
);
```

You can unsubscribe whenever you please using the returned function from the `on` method:

```ts
unsubscribeName();
```

## Initial State

The initial state of a store is made accessible to you via the `initial` property:

```ts
console.log(MyStore.initial);
```
