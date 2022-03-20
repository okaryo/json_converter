import type { AppProps } from 'next/app'
import { Provider, useStore } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore()

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
