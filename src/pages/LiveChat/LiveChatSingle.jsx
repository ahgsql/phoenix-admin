import React, { useEffect, useState } from "react";
import "./chatArea.css";
import axios from "axios";
import Pusher from "pusher-js";
import { useParams } from "react-router";
export default function LiveChatSingle() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const { userName } = useParams();

  let bind = false;
  useEffect(() => {
    const pusher = new Pusher("cc9492824097dabab1e1", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("liveChat");
    if (!bind) {
      channel.bind("customer-message-from-" + userName, function (data) {
        setHistory((prevhistory) => [
          ...prevhistory,
          { from: "customer", message: data.message },
        ]);
      });
      bind = true;
    }
  }, []);

  const sendMessage = async () => {
    if (message.trim().length > 0) {
      let response = await axios.post(
        import.meta.env.VITE_BASE_URL + "api/chat/message",
        { from: "admin", message, userName }
      );
      setHistory((prevhistory) => [...prevhistory, { from: "admin", message }]);
      setMessage("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <>
      <div className="chat-area">
        <div className="chat-history">
          {history.map((message, i) => {
            return (
              <div className={message.from + "-msg message"} key={i}>
                {" "}
                <div className="messageLabel">
                  {message.from == "admin" ? "You" : "Client"}:
                </div>
                <div className="messageBody">{message.message}</div>
              </div>
            );
          })}
        </div>
        <div className="chat-input">
          <input
            type="text"
            className="message-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={sendMessage}>send</button>
        </div>
      </div>
    </>
  );
}
