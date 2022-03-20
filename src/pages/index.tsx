import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../components/Footer'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>JsonConverter</title>
        <meta name="description" content="Format JSON as you like" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p>hoge</p>
      </main>

      <Footer />
    </div>
  )
}

export default Home
