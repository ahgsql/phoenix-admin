import React, { useEffect, useState } from "react";
import "./chatArea.css";
import axios from "axios";
import Pusher from "pusher-js";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import getChats from "../../hooks/getChats";
import { Skeleton } from "antd";
export default function LiveChat() {
  const [list, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  let bind = false;
  useEffect(() => {
    (async () => {
      setChatList([]);
      setLoading(true);
      let chat = await getChats();
      if (!chat) return setLoading(false);
      console.log(chat);
      setLoading(false);
      setChatList(chat);
    })();
  }, []);
  if (loading) return <h1>Loading</h1>;
  return (
    <>
      <div className="chat-list">
        {list.map((chat) => {
          return (
     <Link to={"/chat/" + chat.userName}>
              <div className="singleChat">
                <span style={{ fontWeight: "bold" }}>{chat.userName}</span>
                <p>Total message count: {chat.messageCount}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
