# Soapstone <img src="https://i.imgur.com/558wF8f.png" alt="Verne Logo" width="90" height="90" align="right">

A bare bones React state manager.

## Why Another State Manager?

I am frustrated with Zustand which became the very thing it was made to replace: an over the top, complicated, bloated, and hard to use library, much like Redux.

So, I present Soapstone to you. Atomic? Hook-based? I have no idea, but it's got a great developer experience.

## Installation

```bash
npm install soapstone
```

## Usage

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
    name: "TrèsAbhi",
    age: 21,
  },

  todos: [],
});
```

If you aren't sure what your initial state will be, you can pass a function that you can initialize with later (make sure you pass the types for the function arguments):

```ts
const MyStore = new Soapstone<MyStore, [string, number]>((name, age) => {
  return {
    user: { name, age },
    todos: [],
  };
});
```

### Subscribing

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
  const name = MyStore.use((store) => store.user.name);
  const age = MyStore.use((store) => store.user.age);

  return (
    <span>
      {name} is {age} years old
    </span>
  );
}
```

> [!NOTE]
> You must initialize the store before using it if you passed a function for the initial state.

Make sure you initialize the store before using any of its methods if you did not pass a fully resolved state on creation:

```tsx
function MyComponent() {
  MyStore.useInitialization("TrèsAbhi", 21);

  const name = MyStore.use((store) => store.user.name);
  const age = MyStore.use((store) => store.user.age);

  return (
    <span>
      {name} is {age} years old
    </span>
  );
}
```
