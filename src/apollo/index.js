import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import Config from '../config/config'
import Auth from '../components/auth'

const auth = new Auth()

const AuthLink = (operation, next) => {
  const token = window.localStorage.getItem('accessToken')

  if (token) {
    operation.setContext(context => ({
      ...context,
      headers: {
        ...context.headers,
        Authorization: `Bearer ${token}`
      }
    }))
  }
  return next(operation)
}

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      let authError = false
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path, extensions }) => {
          console.log(`[GraphQL error]: Message: ${message}, Location: 
            ${locations}, Path: ${path}`)
          if (extensions.code === 'UNAUTHENTICATED') authError = true
        })
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`)
      }
      if (authError) {
        auth.logout()
      }
    }),
    AuthLink,
    new HttpLink({
      uri: Config.api_endpoint
    })
  ]),
  cache: new InMemoryCache()
})

export default client
