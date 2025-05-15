function storeFunction() {
  let store = {};

  return {
    name: "Uttam Kumari",
    add: (key, details) => {
        if(store[key]){
            console.log("data present in store,let me update")
        }
      const data = { [key]: details };
      store = { ...store, ...data };
    },
    get: (key) => {
      if (store[key]) {
        return store[key];
      } else {
        return "no result found";
      }
    },

    delete : (key)=>{
        delete store[key];
    }
  };
}

const store = storeFunction();

export default store;
