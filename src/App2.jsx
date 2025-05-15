import useApiHook from "./utils/ApiHook";
import store from "./utils/store";

export default function App2() {
  // const requestOptions = {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ title: "React Hooks POST Request Example" }),
  // };
  // const [response, error] = useApiHook(
  //   "https://fakestoreapi.com/products",
  //   requestOptions
  // );
  //   console.log(error);
  // console.log(response);

  return (
    <div>
      {store.name}
      <button
        onClick={() => console.log( store.add("pen", { name: "parker", used: "unused" }))}
      >
        Add
      </button>
      <button onClick={()=> console.log(store.delete("pen"))}>
        Delete
      </button>
      <button onClick={()=>console.log(store.get("pen"))}>
        get
      </button>
    </div>
  );
}
