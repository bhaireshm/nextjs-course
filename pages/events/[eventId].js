import { Fragment } from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../data";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/error-alert/error-alert";

function EventDetailsPage() {
  const router = useRouter();
  const event = getEventById(router.query.eventId);
  console.log(event);

  if (!event) return <ErrorAlert>No Events found!!</ErrorAlert>;

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

export default EventDetailsPage;
