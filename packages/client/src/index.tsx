import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { ThirdwebProvider } from 'thirdweb/react';
import {
  RouterProvider,
  Router,
  Route,
  createBrowserRouter,
} from 'react-router-dom';

import { APP_ROOT } from '~/config';
import { App } from '~/components/App';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import AppContextProvider from './AppContext';

const container = document.getElementById(APP_ROOT);
const root = createRoot(container!);

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
]);

function ReactApp(): JSX.Element {
  return (
    <Auth0Provider
      domain="dev-6r4mq7ueon8u2b7o.us.auth0.com"
      clientId="7pm6i1TjBDiXL68QddSDyDd2EdUgOjOY"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ThirdwebProvider>
        <AppContextProvider>
          <Suspense fallback={<div />}>
            <RouterProvider router={router} />
          </Suspense>
        </AppContextProvider>
      </ThirdwebProvider>
    </Auth0Provider>
  );
}

root.render(<ReactApp />);
