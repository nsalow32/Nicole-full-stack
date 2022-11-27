import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

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
          <meta name="description" content="Nicole's Final." />
        </Head>
        <p>Welcome to my final for ACSG540 at SXU. - Nicole Salow</p>
        <p>The email you are logged in with: {user.email}</p>
        <Button component={Link} to="/chat">
          Chat!
        </Button>
      </div>
    );
  }
}

Index.propTypes = propTypes;
Index.defaultProps = defaultProps;

export default withAuth(Index);
