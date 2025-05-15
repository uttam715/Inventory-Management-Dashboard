import { useEffect, useState } from "react";

function useApiHook(parm, method={}) {
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (attempt === 3) return;
    fetch(parm, method)
      .then((res) => res.json())
      .then((data) => {
        setResponse(data);
        setError(null);
      })
      .catch((error) => {
        setAttempt(attempt + 1);
        setError(error);
      });
  }, [attempt]);

  return [response, error];
}

export default useApiHook;
