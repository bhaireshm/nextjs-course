import EventsList from "../../components/events/EventsList";
import ResultsTitle from "../../components/results-title/results-title";
import ErrorAlert from "../../components/error-alert/error-alert";
import Button from "../../components/ui/button";
import { getFilteredEvents } from "../../helpers/api-util";

function FilteredEventsPage(props) {
  const events = props.events;

  if (props.isInvalidFilter) {
    return (
      <>
        <ErrorAlert>Invalid filter, please adjust your values!</ErrorAlert>
        <div style={{ "text-align": "center" }}>
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  if (!events) return <ErrorAlert>Loading...</ErrorAlert>;
  const date = new Date(props.year, props.month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventsList events={events} />
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const slug = params.slug;
  const year = +slug[0];
  const month = +slug[1];

  if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12)
    return { props: { isInvalidFilter: true } };

  const payload = { year, month };
  const events = await getFilteredEvents(payload);

  return { props: { events, isInvalidFilter: false, year, month } };
}

export default FilteredEventsPage;
