import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useStore } from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore()

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
