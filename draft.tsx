import { Soapstone } from "./src";

interface MyStore {
  user: {
    name: string;
    age: number;
  };

  todos: string[];
}

const MyStore = new Soapstone<MyStore>(
  {
    user: {
      name: "John Doe",
      age: 22,
    },

    todos: [],
  },
  "my-store",
);

function MyComponent() {
  return (
    <button
      onClick={() => {
        MyStore.store();
      }}
    >
      Save
    </button>
  );
}
