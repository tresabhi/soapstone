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
