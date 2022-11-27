import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Button from '@mui/material/Button';
import { styleLoginButton } from '../components/SharedStyles';

import withAuth from '../lib/withAuth';

const propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
  }),
};

const defaultProps = {
  user: null,
};

// eslint-disable-next-line react/prefer-stateless-function
class Index extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div style={{ padding: '10px 45px' }}>
        <Head>
          <title>Settings</title>
          <meta name="description" content="Welcome." />
        </Head>
        <p>Welcome to my ACSG Full Stack Final. - Nicole Salow</p>
        <p>The email you are logged in with:&nbsp;{user.email}</p>

        <Button variant="contained" style={styleLoginButton} href="/chat">
          Chat now!
        </Button>
      </div>
    );
  }
}

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default withAuth(Index);
