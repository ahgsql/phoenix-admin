import React, { useEffect, useState } from "react";
import "./chatArea.css";
import axios from "axios";
import Pusher from "pusher-js";
import { useParams } from "react-router-dom";
import getChatHistory from "../../hooks/getChatHistory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ChatList from "./ChatList";
import ScrollableFeed from "react-scrollable-feed";
export default function LiveChatSingle() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const { userName } = useParams();
  useEffect(() => {
    const pusher = new Pusher("cc9492824097dabab1e1", {
      cluster: "eu",
    });
    const channel = pusher.subscribe("liveChat");

    channel.bind("customer-message-from-" + userName, function (data) {
      setHistory((prevhistory) => [
        ...prevhistory,
        { from: "customer", message: data.message },
      ]);
    });
  }, [userName]);

  useEffect(() => {
    getChatHistory(userName).then(setHistory);
  }, [userName]);

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
      <div
        className="chatAndList"
        style={{ display: "flex", flexDirection: "row", gap: 50 }}
      >
        <div className="chat-area">
          <ScrollableFeed
            forceScroll={true}
            style={{ height: "75%", flexShrink: 2, overflow: "hidden" }}
          >
            {history.map((message, i) => {
              return (
                <div className={message.from + "-msg message"} key={i}>
                  <div className="messageLabel">
                    {message.from == "admin" ? "You" : userName}:
                  </div>
                  <div className="messageBody">{message.message}</div>
                </div>
              );
            })}
          </ScrollableFeed>
          <div
            className="chat-input"
            style={{
              display: "flex",
              flexDirection: "row",
              padding: "10px",
              alignContent: "baseline",
            }}
          >
            <input
              type="text"
              className="message-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="send-button" onClick={sendMessage}>
              <FontAwesomeIcon
                icon={faPaperPlane}
                size="xl"
                style={{ color: "#658fd7" }}
              />
            </button>
          </div>
        </div>

        <ChatList />
      </div>
    </>
  );
}
