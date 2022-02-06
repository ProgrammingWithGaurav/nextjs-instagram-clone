import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Instagram 2.0</title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/128/174/174855.png" />
      </Head>
      <Header />
    </div>
  )
}
