import { useState, useEffect } from "react";
import ErrorAlert from "../components/error-alert/error-alert";

import EventsList from "../components/events/EventsList";
import { getFeaturedEvents } from "../data";

function HomePage() {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  // Get all feature events
  useEffect(() => {
    const events = getFeaturedEvents();
    setFeaturedEvents(events);
  }, []);

  return <div>{featuredEvents ? <EventsList events={featuredEvents} /> : <ErrorAlert>No data found</ErrorAlert>}</div>;
}

export default HomePage;
