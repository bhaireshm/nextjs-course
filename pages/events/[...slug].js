import { useRouter } from "next/router";
import { getFilteredEvents } from "../../data";
import EventsList from "../../components/events/EventsList";
import ResultsTitle from "../../components/results-title/results-title";
import ErrorAlert from "../../components/error-alert/error-alert";
import Button from "../../components/ui/button";

function FilteredEventsPage() {
  const router = useRouter();
  const { slug } = router.query;

  // console.log(slug);
  if (!slug) return <ErrorAlert>Loading...</ErrorAlert>;

  const year = +slug[0];
  const month = +slug[1];

  if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12)
    return (
      <>
        <ErrorAlert>Invalid filter, please adjust your values!</ErrorAlert>
        <div style={{ "text-align": "center" }}>
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );

  const payload = { year, month };
  // console.log(payload);

  const events = getFilteredEvents(payload);
  // console.log(events);

  const date = new Date(year, month - 1);
  // console.log(date)

  return (
    <>
      <ResultsTitle date={date} />
      <EventsList events={events} />
    </>
  );
}

export default FilteredEventsPage;
