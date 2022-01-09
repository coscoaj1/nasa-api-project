import "../styles/globals.css";
import Head from "next/head";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <Head>
        <title>UnSpace: A NASA Apod Image Gallery</title>
      </Head>
      <div className="absolute top-0 right-0 mt-4 mr-4 md:mr-6 md:mt-6"></div>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
