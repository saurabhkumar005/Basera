import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
const server = import.meta.env.VITE_SERVER_URL;




export default function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function checkServer() {
      let data1 = await axios.get(`${server}`);
      setData(data1.data);
    }
    checkServer();
  },[]);
  return (
    <>
      <h1>{data ? data.data : "Loading"}</h1>
    </>
  )
}