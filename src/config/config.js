const Config = {
  auth0: {
    domain: 'id.dstbtd.dev',
    clientID: '4Wn69nBphFrVu6Wk6ytOlxgfPo4NUGTO',
    redirectUri: 'http://localhost:3000/auth/callback',
    responseType: 'token id_token',
    scope: 'openid email profile',
    nonce: 'uXk6pjxsB1p_tu79'
  },
  api_endpoint: 'https://app-dev-api.dstbtd.dev/graphql'
}

export default Config
