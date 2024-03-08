import React, { useEffect, useState } from "react";
import "./home.css";
import { Body } from "./Body";
import axios from "axios";
import { Loading } from "../../Loading";
export const Home = () => {
  const [data, setData] = useState({});
  const [load, setLoad] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await axios.get("https://quiz-backend-sigma-hazel.vercel.app/pre/gets");
      setData(res.data);
      setLoad(false);
    })();
  }, []);
  console.log(data);
  return (
<>
{
  load?(
    <>
    <Loading/>
    </>
  ):(
    <div className="home">
    <div className="logo-holder">
      <span className="logo">who know's me better</span>
    </div>
    <div
      style={{
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
      }}
    >
      {
        !load?(
          data.map((e,i)=>(
            <Body key={i} data={e}/>
          ))
        ):""
      }
    </div>
  </div>
  )
}
</>
  );
};
