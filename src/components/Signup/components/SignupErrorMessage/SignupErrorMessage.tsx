/*  eslint-disable max-len */
import React from 'react';
import {
  Link,
} from 'react-router-dom';
import './SignupErrorMessage.scss';
import {
  Box,
  Typography,
} from '@material-ui/core';

type SignupErrorMessageProps = {
  content: string
  active: boolean
  to: string
  linkContent: string
  activeLink: boolean
};

const SignupErrorMessage: React.FC<SignupErrorMessageProps> = ({ content, active, to, linkContent, activeLink }) => {
  let errorBoxName = 'signupError';

  if (active) {
    errorBoxName += '--active';
  }

  let linkName = 'activeLink';

  if (activeLink) {
    linkName += '--active';
  }

  return (
    <Box className={errorBoxName}>
      <Typography>{content}</Typography>
      <Link to={to} className={linkName}>
        <Typography>{linkContent}</Typography>
      </Link>
    </Box>
  );
};

export default SignupErrorMessage;
