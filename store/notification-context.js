import { createContext, useState, useEffect } from "react";

const NotificationContext = createContext({
  notification: { title: "", message: "", status: "" },
  showNotification: function () {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotifiction, setActiveNotifiction] = useState();

  useEffect(() => {
    if (activeNotifiction && (activeNotifiction.status === "success" || activeNotifiction.status === "error")) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotifiction]);

  function showNotificationHandler(notificationData) {
    setActiveNotifiction(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotifiction(null);
  }

  const context = {
    notification: activeNotifiction,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return <NotificationContext.Provider value={context}>{props.children}</NotificationContext.Provider>;
}

export default NotificationContext;
