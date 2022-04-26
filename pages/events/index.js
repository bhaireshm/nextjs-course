import EventsSearch from "../../components/events/events-search";
import EventsList from "../../components/events/EventsList";
import { useRouter } from "next/router";
import Head from "next/head";

function AllEventsPage(props) {
  const router = useRouter();
  const events = props.events || [];

  function searchHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <Head>
        <title>All Events</title>
      </Head>
      <EventsSearch onSearch={searchHandler} />
      <EventsList events={events} />
    </>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return { props: { events }, revalidate: 1800 };
}

export default AllEventsPage;
