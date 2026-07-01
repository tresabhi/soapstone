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

MyStore.set({
  user: { age: 99, name: "Dead Doe" },
  todos: [],
});
