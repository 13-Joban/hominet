import Head from 'next/head'
import { Open_Sans } from 'next/font/google'

import Login from '../components/Login'

const openSans = Open_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Hominet</title>
        <meta name="description" content="This is a web portal for minor and honours engineering degree students" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </>
  )
}
