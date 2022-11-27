import Head from 'next/head';
import Button from '@mui/material/Button';

import withAuth from '../lib/withAuth';
import { styleLoginButton } from '../components/SharedStyles';

const Login = () => (
  <div style={{ textAlign: 'center', margin: '0 20px' }}>
    <Head>
      <title>Login to chat!</title>
      <meta name="description" content="Login page for Nicole's Final" />
    </Head>
    <br />
    <p style={{ margin: '45px auto', fontSize: '44px', fontWeight: '400' }}>Login to chat!</p>
    <p>
      You will automatically stay logged in for 14 days on this device unless you manually sign out.
    </p>
    <br />
    <Button variant="contained" style={styleLoginButton} href="/auth/google">
      <img
        src="https://storage.googleapis.com/builderbook/G.svg"
        alt="Log in with Google"
        style={{ marginRight: '10px' }}
      />
      Login with Google
    </Button>
  </div>
);

export default withAuth(Login, { logoutRequired: true });
