import { Fragment, useContext } from "react";
import NotificationContext from "../../store/notification-context";
import Notification from "../notification/notification";

import MainHeader from "./main-header";

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && <Notification {...activeNotification} />}
    </Fragment>
  );
}

export default Layout;
