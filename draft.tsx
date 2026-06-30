import { Soapstone } from "./src";

interface MyStore {
  user: {
    name: string;
    age: number;
  };

  todos: string[];
}

const MyStore = new Soapstone<MyStore, [string, number]>((name, age) => {
  return {
    user: { name, age },
    todos: [],
  };
});

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
