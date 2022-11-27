import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Head from 'next/head';
import Button from '@mui/material/Button';
import { styleLoginButton, styleTextField } from '../components/SharedStyles';
import withAuth from '../lib/withAuth';

let socket;

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: null,
};

const date = new Date();

const formattedDate = date.toLocaleString('en-GB', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
});

function ChatPage() {
  const [username, setUsername] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');
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

    socket.on('newMessage', (msg) => {
      setAllMessages((currentMsg) => [
        ...currentMsg,
        { author: msg.author, MyMessage: msg.MyMessage },
      ]);
    });
  };

  const sendMessage = async () => {
    socket.emit('createdMessage', { author: selectedUsername, MyMessage });
    setAllMessages((currentMsg) => [...currentMsg, { author: selectedUsername, MyMessage }]);
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
    <div style={{ padding: '10px 45px 45px 45px' }}>
      <Head>
        <title>CHAT!</title>
        <meta name="description" content="TWEETER, a twitter alternative made for Full Stack." />
      </Head>
      <main>
        {!selectedUsername ? (
          <>
            <h2>WELCOME TO TWEETER!</h2>
            <h5> What do you want to display as your username?</h5>
            <input
              type="text"
              placeholder="Username"
              value={username}
              style={styleTextField}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Button
              variant="contained"
              style={styleLoginButton}
              onClick={() => {
                setSelectedUsername(username);
              }}
            >
              Chat now!
            </Button>
          </>
        ) : (
          <>
            <p style={styleTextField}>Your username: {username}</p>
            <div>
              <div>
                {AllMessages.map((msg, i) => {
                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={i}>
                      {msg.author} : {msg.MyMessage} - {formattedDate}
                    </div>
                  );
                })}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="What's on your mind..."
                  value={MyMessage}
                  onChange={(e) => setMyMessage(e.target.value)}
                  onKeyUp={handleEnterKeypress}
                />

                <Button
                  variant="contained"
                  type="button"
                  style={styleLoginButton}
                  onClick={() => {
                    sendMessage();
                  }}
                >
                  Send
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
ChatPage.propTypes = propTypes;
ChatPage.defaultProps = defaultProps;

export default withAuth(ChatPage);
