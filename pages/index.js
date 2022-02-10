import Head from 'next/head';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Modal from '../components/Modal';

export default function Home() {
  return (
    <div className='bg-gray-50 h-screen overflow-y-scroll scrollbar-hide'>
      <Head>
        <title>Instagram 2.0</title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/128/174/174855.png" />
      </Head>
      <Header />
      <Modal />
      <Feed />
    </div>
  )
}