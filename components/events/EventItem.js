import classes from "./eventItem.module.css";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";

function EventItem(props) {
  const { id, image, title, date, description, location } = props;

  return (
    <li className={classes.item} key={id}>
      {/* <Image src={`/${image}`} alt={title} /> */}
      <img src={`/${image}`} alt={title} className={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h3>{title}</h3>
          <div className={classes.date}>
            <DateIcon />
            <time>{new Date(date).toLocaleDateString("en-US")}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{location.replace(/, /g, "\n")}</address>
          </div>
          <div className={classes.actions}>
            <Button link={`/events/${id}`}>
              <span>Explore Event</span>
              <span className={classes.icon}>
                <ArrowRightIcon />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
