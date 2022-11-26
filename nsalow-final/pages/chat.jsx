import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Head from 'next/head';
import Button from '@mui/material/Button';

import Header from '../components/Header';

let socket;

export default function Home() {
  const [username, setUsername] = useState('');
  const [chosenUsername, setChosenUsername] = useState('');
  const [MyMessage, setMyMessage] = useState('');
  const [AllMessages, setAllMessages] = useState([]);

  useEffect(() => {
    socketStarter();
    return () => {
      console.log('This will be logged on unmount');
    };
  }, []);

  const socketStarter = async () => {
    await fetch('/api/socket');
    socket = io();

    socket.on('connect', () => {
      console.log("you've connected");
    });

    socket.on('newIncomingMessage', (msg) => {
      setAllMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, MyMessage: msg.MyMessage },
      ]);
    });
  };

  const sendMessage = async () => {
    socket.emit('createdMessage', { author: chosenUsername, MyMessage });
    setAllMessages((currentMsg) => [...currentMsg, { author: chosenUsername, MyMessage }]);
    setMyMessage('');
  };

  const handleEnterKeypress = (e) => {
    // it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (MyMessage) {
        sendMessage();
      }
    }
  };

  return (
    <div className="flex items-center p-4 mx-auto min-h-screen justify-center bg-green-500">
      <Head>
        <title>Salow Final Home Page</title>
        <meta name="description" content="This is SEO description of Index page" />
      </Head>
      <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
        {!chosenUsername ? (
          <>
            <h3 className="font-bold text-orange text-xxl">
              What should people call you? Enter a username:
            </h3>
            <input
              type="text"
              placeholder="Username"
              value={username}
              className="p-3 rounded-md outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              onClick={() => {
                setChosenUsername(username);
              }}
              // className="bg-blue-500 hover:bg-blue-700 text-black rounded-md px-4 py-2 text-xl"
            >
              Start Chatting!
            </button>
          </>
        ) : (
          <>
            <p className="font-bold text-white text-xl">Your username: {username}</p>
            <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md ">
              <div className="h-full last:border-b-0 overflow-y-scroll">
                {AllMessages.map((msg, i) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div className="w-full py-1 px-2 border-b border-gray-200" key={i}>
                      {msg.author} : {msg.MyMessage}
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-purple-300 w-full flex rounded-bl-md">
                <input
                  type="text"
                  placeholder="Type A New message..."
                  value={MyMessage}
                  className="outline-none py-2 px-2 rounded-bl-md flex-1"
                  onChange={(e) => setMyMessage(e.target.value)}
                  onKeyUp={handleEnterKeypress}
                />
                <div className="border-l border-purple-300 flex justify-center items-center  rounded-br-md group hover:bg-purple-500 transition-all">
                  <button
                    type="button"
                    className="group-hover:text-white px-3 h-full"
                    onClick={() => {
                      sendMessage();
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

Index.getInitialProps = async (ctx) => ({ user: ctx.query.user });

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;
