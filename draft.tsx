import { Soapstone } from "./src";

interface MyStore {
  name: string;
}

const MyStore = new Soapstone<MyStore>({
  name: localStorage.getItem("name")!,
});

function MyComponent() {
  const name = MyStore.useDeferred(
    (store) => store.name,
    "This will render on the server",
  );

  return <span>{name} says hello!</span>;
}
