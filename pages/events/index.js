import EventsSearch from "../../components/events/events-search";
import EventsList from "../../components/events/EventsList";
import { getAllEvents } from "../../data";
import { useRouter } from "next/router";

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  function searchHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <EventsSearch onSearch={searchHandler} />
      <EventsList events={events} />
    </>
  );
}

export default AllEventsPage;
