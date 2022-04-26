import Head from "next//head";
import Layout from "../components/ui/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Head>
        <title>NextJS Events</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
