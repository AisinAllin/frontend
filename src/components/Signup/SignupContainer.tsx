import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SignupForm from './components/SignupForm/SignupForm';
import awLogo from './assets/awLogo.svg';
import './SignupContainer.scss';

const useStyles = makeStyles((theme: Theme) => createStyles({
  grid: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(3),
  },
  title: {
    marginTop: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
  },
}));

const SignupContainer = () => {
  const classes = useStyles();
  const titleName = 'Sign up to Async Working';
  return (
    <Container maxWidth="xs">
      <Grid container wrap="nowrap" direction="column" className={classes.grid}>
        <Grid container justify="center" alignItems="center" direction="column">
          <img src={awLogo} className="img" alt="logo" />
          <Typography variant="h5" color="primary" className={classes.title}>
            {titleName}
          </Typography>
        </Grid>
        <Paper className={classes.paper}>
          <SignupForm />
        </Paper>
      </Grid>
    </Container>
  );
};

export default SignupContainer;
