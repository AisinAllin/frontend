/*  eslint-disable no-nested-ternary */
/*  eslint-disable react/jsx-props-no-spreading */
/*  eslint-disable react/jsx-wrap-multilines */
/*  eslint-disable max-len */
/*  eslint-disable object-shorthand */
/*  eslint-disable no-unsafe-finally */
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import {
  Field,
  Formik,
  Form,
  ErrorMessage,
  FormikConfig,
  FormikValues,
  FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import SignupErrorMessage from '../SignupErrorMessage/SignupErrorMessage';

const sleep = (time: any) => new Promise((acc) => setTimeout(acc, time));

const useStyles = makeStyles((theme: Theme) => createStyles({
  buttonContainer: {
    padding: theme.spacing(1),
  },
}));

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const classes = useStyles();
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  function isLastStep() {
    return step === childrenArray.length - 1;
  }
  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
        } else {
          setStep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          {currentChild}
          <Grid container spacing={3} justify="space-around" alignItems="center" className={classes.buttonContainer}>
            {step > 0 ? (
              <Grid item xs={4}>
                <Button
                  disabled={isSubmitting}
                  color="primary"
                  fullWidth
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              </Grid>
            ) : null}
            <Grid item xs={8}>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                fullWidth
                color="primary"
              >
                {isSubmitting ? 'Creating' : isLastStep() ? 'Create Account' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default function SignupForm() {
  const [signupError, setSignupError] = useState({
    have: false,
    message: '',
    showLink: false,
  });
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const validationNameAndEmailSchema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string()
      .required('Please enter your email')
      .email('Invalid email address')
      .test(
        'email-backend-validation',
        '',
        async (email) => {
          try {
            const { status } = await axios({
              method: 'get',
              url: process.env.REACT_APP_ASYNC_WORK_SIGNUP_API,
              params: {
                email: email,
              },
            });
            return status === 200;
          } catch (error) {
            if (error.response.status >= 500) {
              setSignupError({
                have: true,
                message: 'Internal server problem, please try again!',
                showLink: false,
              });
            }
            if (error.response.status === 409) {
              setSignupError({
                have: true,
                message: 'Account already exist',
                showLink: true,
              });
            }
            return false;
          }
        },
      ),
  });
  const validationPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=\S*[a-zA-Z])(?=\S*[0-9#!"$%&'()*+,-./:;<=>?@[\]^_`{|}~])\S{8,}$/,
        'Invalid password.Your password must be at least 8 character long and contains at least one non-letter character',
      ).max(128, 'Too long!')
      .required('Please enter your password'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Please confirm your password'),
  });
  const onCreateAccountSubmit = async ({ name, email, password }: FormikValues, actions: FormikHelpers<FormikValues>) => {
    await sleep(3000);
    axios({
      method: 'post',
      url: process.env.REACT_APP_ASYNC_WORK_SIGNUP_API,
      data: {
        name,
        email,
        password,
      },
    }).catch((error) => {
      if (error.response.status >= 500) {
        setSignupError({
          have: true,
          message: 'Internal server problem, please try again!',
          showLink: false,
        });
      }
    }).finally(() => {
      actions.setSubmitting(false);
    });
  };
  return (
    <FormikStepper
      validateOnChange={false}
      initialValues={initialValues}
      onSubmit={onCreateAccountSubmit}
    >
      <FormikStep
        label="setNameAndEmail"
        validationSchema={validationNameAndEmailSchema}
      >
        <SignupErrorMessage content={signupError.message} active={signupError.have} to="/login" linkContent="Sign in here" activeLink={signupError.showLink} />
        <Box paddingTop={1} paddingBottom={2}>
          <Field as={TextField} fullWidth name="name" label="Your name" placeholder="Your name" helperText={<ErrorMessage name="name" />} />
        </Box>
        <Box paddingBottom={1}>
          <Field as={TextField} fullWidth name="email" label="Your email" placeholder="Your email (e.g.abc@abc.abc)" helperText={(<ErrorMessage name="email" />)} />
        </Box>
      </FormikStep>
      <FormikStep
        label="setPassword"
        validationSchema={validationPasswordSchema}
      >
        <Box paddingBottom={2}>
          <Field as={TextField} fullWidth name="password" type="password" label="Password" placeholder="Enter your password" helperText={<ErrorMessage name="password" />} />
        </Box>
        <Box paddingBottom={1}>
          <Field as={TextField} fullWidth name="confirmPassword" type="password" label="Confirm password" placeholder="Confirm your password" helperText={<ErrorMessage name="confirmPassword" />} />
        </Box>
      </FormikStep>
    </FormikStepper>
  );
}
