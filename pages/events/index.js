import EventsSearch from "../../components/events/events-search";
import EventsList from "../../components/events/EventsList";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-util";

async function AllEventsPage() {
  const router = useRouter();
  const events = await getAllEvents();

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
