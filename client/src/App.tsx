import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000")
      .then((res) => setMessage(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>React + Express + TypeScript</h1>
      <p>{message}</p>
    </div>
  );
}
