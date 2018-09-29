import ApolloClient from 'apollo-client';
import { IncomingHttpHeaders } from 'http';
import { NextContext } from 'next';
import { AppProps, NextAppContext } from 'next/app';
import { DefaultQuery } from 'next/router';

declare global {
  namespace NodeJS {
    interface Process {
      browser?: boolean;
    }
  }
}

export interface WithApolloOptions {
  getDataFromTree?: 'always' | 'never' | 'ssr';
}

export interface WithApolloState<TCache> {
  data?: TCache;
}

export interface WithApolloProps<TCache> extends AppProps {
  apollo: ApolloClient<TCache>;
  apolloState: WithApolloState<TCache>;
}

export interface InitApolloOptions<TCache> {
  headers?: IncomingHttpHeaders;
  initialState?: TCache;
}

export type InitApolloClient<TCache> = ((
  options: InitApolloOptions<TCache>
) => ApolloClient<TCache>);

export interface AppContext<Q extends DefaultQuery = DefaultQuery>
  extends NextContext<Q> {
  // Custom prop added by withApollo
  apolloClient: ApolloClient<any>;
}

export interface ApolloContext<Q extends DefaultQuery = DefaultQuery>
  extends NextAppContext<Q> {
  ctx: AppContext<Q>;
}

export type AppGetInitialProps = (
  ctx: ApolloContext
) => Promise<{
  pageProps: any;
  [key: string]: any;
}>;
