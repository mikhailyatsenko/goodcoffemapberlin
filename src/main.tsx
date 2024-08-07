import './index.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import { HashRouter as BrowserRouter } from 'react-router-dom';
import { ApolloProviderWrapper } from 'app/providers/ApolloProviderWrapper';
import { AuthProvider } from 'app/providers/AuthProvider';
import { DetailedCardProvider } from 'app/providers/DetailedCardProvider';
import { LocationProvider } from 'app/providers/LocationProvider';
import App from './app/App';

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error(`Missing required environment variable: GOOGLE_CLIENT_ID`);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProviderWrapper>
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <DetailedCardProvider>
            <LocationProvider>
              <App />
            </LocationProvider>
          </DetailedCardProvider>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  </ApolloProviderWrapper>,
);
