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
