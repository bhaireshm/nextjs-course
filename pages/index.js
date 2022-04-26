import EventsList from "../components/events/EventsList";
import ErrorAlert from "../components/error-alert/error-alert";
import { getFeaturedEvents } from "../helpers/api-util";

function HomePage(props) {
  return <div>{props.events ? <EventsList events={props.events} /> : <ErrorAlert>No data found</ErrorAlert>}</div>;
}

export async function getStaticProps() {
  const events = await getFeaturedEvents();
  // console.log("home", events);
  return { props: { events }, revalidate: 1800 };
}

export default HomePage;
