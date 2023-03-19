import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';


// GraphQL APIへの接続を確立
const httpLink = new HttpLink({
  uri: 'https://beta.pokeapi.co/graphql/v1beta'
});

// ApolloClientインスタンス生成
export const apolloClient = new ApolloClient({
  // データが正しいAPIからポーリングされるように設定
  link: httpLink,
  // キャッシュを渡す。InMemoryCacheはApolloClientのデフォルトのキャッシュ実装であるのでこれを使用
  cache: new InMemoryCache(),
  // Apollo Client Devtoolsを、Webブラウザのインスペクタに「Apollo」タブとして表示する
  connectToDevTools: true
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});


// VueApolloをvueで使用する
app.use(apolloProvider);
app.mount('#app');
