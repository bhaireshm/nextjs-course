import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/error-alert/error-alert";

function EventDetailsPage(props) {
  const event = props.selectedEvent;
  if (!event) return <ErrorAlert>Loading...</ErrorAlert>;

  return (
    <Fragment>
      <EventSummary {...event} />
      <EventLogistics {...event} imageAlt={event.title} />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const event = await getEventById(params.eventId);
  return { props: { selectedEvent: event } };
}

export async function getStaticPaths() {
  const all_events = await getFeaturedEvents();

  return {
    paths: all_events.map((event) => ({ params: { eventId: event.id } })),
    fallback: true, // "blocking"// will not load the content untill it gets the data.
  };
}

export default EventDetailsPage;
