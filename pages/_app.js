import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>UnSpace: A NASA Apod Image Gallery</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
