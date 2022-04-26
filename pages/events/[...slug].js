import useSWR from "swr";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EventsList from "../../components/events/EventsList";
import ResultsTitle from "../../components/results-title/results-title";
import ErrorAlert from "../../components/error-alert/error-alert";
import Button from "../../components/ui/button";
import { apiUrl } from "../../helpers/api-util";

function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState([]);
  const router = useRouter();
  const slug = router.query.slug;
  // console.log(slug);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isValidating } = useSWR(apiUrl, fetcher);
  // console.log(data, error, isValidating);

  useEffect(() => {
    if (data) {
      const out = [];
      for (const key in data) out.push(data[key]);
      setLoadedEvents(out);
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data || !loadedEvents) return <ErrorAlert>Loading...</ErrorAlert>;

  const year = +slug[0];
  const month = +slug[1];
  // console.log(year, month);

  if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12 || error) {
    // return { props: { isInvalidFilter: true } };
    // if (props.isInvalidFilter)
    return (
      <>
        <ErrorAlert>Invalid filter, please adjust your values!</ErrorAlert>
        <div style={{ textAlign: "center" }}>
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  console.log(JSON.stringify(loadedEvents));
  const events = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  // const date = new Date(props.year, props.month - 1);
  const date = new Date(year, month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventsList events={events} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const slug = params.slug;
//   const year = +slug[0];
//   const month = +slug[1];
//   if (isNaN(year) || isNaN(month) || year > 2030 || year < 2021 || month < 1 || month > 12)
//     return { props: { isInvalidFilter: true } };
//   const payload = { year, month };
//   const events = await getFilteredEvents(payload);
//   return { props: { events, isInvalidFilter: false, year, month } };
// }

export default FilteredEventsPage;
