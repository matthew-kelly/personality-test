import { ApolloProvider } from '@apollo/client';
import { Router } from 'next/router';
import NProgress from 'nprogress';
import '../styles/globals.css';
import client from '../utils/apollo-client';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
