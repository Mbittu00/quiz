import React, { useEffect, useState } from "react";
import "./review.css";
import img from "../../assets/Winners-bro.png";
import { CiShare1 } from "react-icons/ci";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";
import axios from "axios";
let send = "whatsapp://send?text";
export const Review = () => {
  let { id } = useParams();
  let location = useNavigate();
  let [data, setData] = useState({ score: [] });
  const [my, setMy] = useState(true);
  const [create, setCreate] = useState(false);
  useEffect(() => {
    (async () => {
      let { data } = await axios.get(
        `https://quiz-backend-sigma-hazel.vercel.app/${id}`
      );
      setData(data);
      let local = JSON.parse(localStorage.getItem("my"));
      let done = JSON.parse(localStorage.getItem("done"));
      if (local != null) {
        if (local.includes(data._id)) {
          setMy(true);
        } else {
          setMy(false);
        }
      } else {
        setMy(false);
      }

      if (done != null) {
        if (done.includes(data._id)) {
          setCreate(true);
        } else {
          setCreate(false);
        }
      } else {
        setCreate(false);
      }
    })();
  }, []);

  let play = () => {
    location(`/play/${id}`);
  };
  let createQuiz = () => {
    location(`/create/${data.qustionsId}`);
  };
  return (
    <div className="review">
      <img src={img} alt="top" className="top" />
      {data.score.length == 0 ? (
        <div className="no">
          <span>no one gived answer</span>
        </div>
      ) : (
        <div className="us-holder">
          {data.score.map((e, i) => (
            <>
              <div className="us">
                <IoPersonCircleOutline size={35} />
                <div className="txt">
                  <span className="username">{e.name}</span>
                  <span className="sc">score:{e.score}</span>
                </div>
              </div>
            </>
          ))}
        </div>
      )}
      <div className="share">
        {!create ? (
          my ? (
            <a
              href={`whatsapp://send?text=http://192.168.31.77:3000/review/${id}`}
              data-action="share/whatsapp/share"
              className="a"
            >
              <CiShare1 size={25} color="white" />
            </a>
          ) : (
            <div onClick={play}>
              <CiPlay1 size={25} />
            </div>
          )
        ) : (
          <div className="cate" onClick={createQuiz}>
            <IoCreateOutline size={25} />
            <span className="der">create your own</span>
          </div>
        )}
      </div>
    </div>
  );
};
