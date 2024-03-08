import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import "./play.css";
import axios from "axios";
export const Play = () => {
  let {id}=useParams();
  let location=useNavigate()
  let [quiz, setQuiz] = useState({});
  const [load, setLoad] = useState(true)
  const [form, setForm] = useState({});
  const [name, setName] = useState("")
  const [gotName, setGotName] = useState(false)
  const [score, setScore] = useState(0)
  useEffect(() => {
    (async() => {
      console.log("let's dooo")
      let {data}=await axios.get(`https://quiz-backend-sigma-hazel.vercel.app/${id}`);
       console.log(data)
     setQuiz(data)
     setForm(data.qustions[0])
     setLoad(false)
    })();
  }, []);
  useEffect(() => {
if(gotName==true && load==false){
  
}
  },[gotName,load]);
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);
  const [qus, setQus] = useState(true);
  let goNext = async(i) => {
    if(count<10){
     if(i==quiz.qustions[count].ans){
      setScore(score+1)
     }
      setCount((n) => n + 1);
      // alert(count)
    }
  };

  useEffect(() => {
if(count==10){
(async()=>{
let {data}=await axios.put("https://quiz-backend-sigma-hazel.vercel.app/",{name,score,id})
let local=localStorage.getItem("done")
if(local==null){
  let id=[data._id]
  localStorage.setItem("done",JSON.stringify(id))
}else{
  let local=localStorage.getItem("done")
  let id=JSON.parse(local)
  id.push(data._id)
  localStorage.setItem("done",JSON.stringify(id))
}
location(`/review/${id}`)
console.log(data)
})()
}
  },[count])
  return (
   <>
   {
    !gotName?(
      <div className="name">
        <span className="title">enter your name</span>
<input type="text" name="text" id="name"onChange={(e)=>{setName(e.target.value)}} 
placeholder="Full Name"/>
<button onClick={()=>{setGotName(true)}}>submit</button>
      </div>
    ):(
      <div className="create">
      {!load?<span className="q">{quiz.qustions[count]?.name}</span>:""}
      <span className="o">options</span>
      <div className="num">
        <span className="current">Step {count+1} </span>
        <span className="of"> of 10</span>
      </div>
      <progress id="file" min={1} max={10} value={count + 1} />
      <div className="oholder">
        {
          !load?(
            quiz.qustions[count]?.options.map((e, i) => {
              return (
               <div key={i}>
               <input type="text" name="text" id="text" value={e} readOnly className="option" onClick={()=>{goNext(i)}}/>
               </div>
              );
            })
          ):""
        }
      </div>

    
    </div>
    )
   }
   
   </>
  );
};
