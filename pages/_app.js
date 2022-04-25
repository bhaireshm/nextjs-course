import Layout from "../components/ui/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default MyApp;
