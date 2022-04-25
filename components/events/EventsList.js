import EventItem from "./EventItem";
import classes from "./eventList.module.css";

function EventsList(props) {
  if (props.events.length <= 0) return <div style={{ "text-align": "center" }}>No data found!!</div>;

  return (
    <ul className={classes.list}>
      {props.events.map((event) => {
        return <EventItem key={event.id} {...event} />;
      })}
    </ul>
  );
}

export default EventsList;
