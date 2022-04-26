import Head from "next/head";
import ErrorAlert from "../components/error-alert/error-alert";
import EventsList from "../components/events/EventsList";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Featured Events</title>
      </Head>
      {featuredEvents ? <EventsList events={featuredEvents} /> : <ErrorAlert>No data found</ErrorAlert>}
    </div>
  );
}

export default HomePage;
