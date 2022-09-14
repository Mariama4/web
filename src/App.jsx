import GlobalStyle from './components/GlobalStyle.jsx';
import Pages from './pages';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// настраиваем API URI и кэш
const uri = import.meta.env.VITE_API_URI;
const cache = new InMemoryCache();

// настраиваем Apollo Client
const client = new ApolloClient({
  uri,
  cache,
  connectToDevTools: true,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
}

export default App;
