import { gql, useMutation } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Page from '../components/Page';
import { AUTHENTICATE_USER_QUERY, useUser } from '../hooks/User';

const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($data: UserCreateInput!) {
    createUser(data: $data) {
      name
      email
      password {
        isSet
      }
    }
  }
`;

const AUTHENTICATE_USER_MUTATION = gql`
  mutation AUTHENTICATE_USER_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          name
        }
        sessionToken
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;

const Home = () => {
  const [foundErrors, setFoundErrors] = useState(false);
  const [submittingForm, setSubmittingForm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useUser();
  const router = useRouter();

  // check to see if the user has an existing session and has already been authenticated
  // adding this here instead of onCompletion so that if the user is already signed in, they can get where they want to go
  useEffect(() => {
    if (user) {
      // redirect the user to the Directions page
      router.push('/instructions');
    }
  }, [user]);

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [checkUsernameAndPassword] = useMutation(AUTHENTICATE_USER_MUTATION);

  // if the user was successfully created, authenticate them using the credentials they provided
  const authenticateUser = async (data) => {
    try {
      const loggedInUser = await checkUsernameAndPassword({
        variables: {
          email: data.email,
          password: data.password,
        },
        refetchQueries: [{ query: AUTHENTICATE_USER_QUERY }],
      });
      // if successful, send user to the instructions page
      const token = loggedInUser.data.authenticateUserWithPassword.sessionToken;
      if (token) {
        // create item in local storage with their session information
        localStorage.setItem('ENNEAGRAM_SESSION', token);
        router.push('/instructions');
      } else {
        setFoundErrors(true);
      }
    } catch {
      setFoundErrors(true);
    }
  };

  // create the user
  const signupUser = async (data) => {
    try {
      await createUser({
        variables: {
          data: {
            name: data.name,
            email: data.email,
            password: data.password,
          },
        },
      });

      await authenticateUser(data);
    } catch {
      // error handling
      setFoundErrors(true);
    }
  };

  const onSubmit = async (data) => {
    setSubmittingForm(true);
    await signupUser(data);
    setSubmittingForm(false);
  };

  return (
    <Page>
      {/* box */}
      <div className="box">
        {/* heading */}
        <h1 className="page-title -mt-32">
          <span className="font-handwriting text-7xl block">free</span>{' '}
          Enneagram Assessment
        </h1>
        <h2 className="font-sans uppercase tracking-wide text-primary text-lg mb-4">
          Create an Account
        </h2>

        {foundErrors && (
          <div className="error">Whoops! There was an error.</div>
        )}

        {/* form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative pb-12 lg:pb-0"
        >
          <fieldset
            disabled={submittingForm}
            className="lg:grid grid-cols-3 gap-4"
          >
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                {...register('name', { required: true })}
              />
              {errors.name && (
                <div className="error">This field is required</div>
              )}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                {...register('email', { required: true })}
              />
              {errors.email && (
                <div className="error">This field is required</div>
              )}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                {...register('password', { required: true })}
              />
              {errors.password && (
                <div className="error">This field is required</div>
              )}
            </div>

            <div className="col-span-3">
              <input
                type="checkbox"
                name="terms"
                id="terms"
                {...register('terms', { required: true })}
              />
              <label htmlFor="terms">
                I agree to the{' '}
                <Link href="/terms-and-conditions">terms and conditions</Link>.
              </label>
              {errors.terms && (
                <div className="error">This field is required</div>
              )}
            </div>
          </fieldset>
          <button
            type="submit"
            className="button z-10 absolute -bottom-12 left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-0 w-44"
          >
            <span className="button-text">Submit</span>
          </button>
        </form>
      </div>
      <div className="absolute md:relative bottom-2 md:bottom-0 left-0 w-full text-center md:text-left md:pt-4 uppercase">
        <Link href="/what-is">What is the Enneagram?</Link>
      </div>
    </Page>
  );
};

export default Home;
