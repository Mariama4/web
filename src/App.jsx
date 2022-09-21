import GlobalStyle from './components/GlobalStyle.jsx';
import Pages from './pages';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  gql,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

// настраиваем API URI и кэш
const uri = import.meta.env.VITE_API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// проверяем наличие токена и возвращаем заголовки в контекст
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || '',
    },
  };
});

// настраиваем Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {},
  connectToDevTools: true,
});

// записываем данные кэша при начальной загрузке
const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

cache.writeQuery({
  query: IS_LOGGED_IN,
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

client.onResetStore(() =>
  client.writeQuery({
    query: IS_LOGGED_IN,
    data: {
      isLoggedIn: true,
    },
  })
);

function App() {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Pages />
    </ApolloProvider>
  );
}

export default App;
