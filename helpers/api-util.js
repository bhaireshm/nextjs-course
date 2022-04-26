const apiUrl = "https://nextjs-course-ed07a-default-rtdb.firebaseio.com/events.json";

export async function getAllEvents(params = "") {
  return fetch(`${apiUrl}?${params}`)
    .then((response) => response.json())
    .then((data) => {
      // console.log("data", data);
      const out = [];
      for (const key in data) out.push(data[key]);
      // console.log("out", out);
      return out;
    })
    .catch((e) => console.log(e));
}

export async function getFeaturedEvents() {
  const all_events = await getAllEvents("isFeatured=true");
  return all_events.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const all_events = await getAllEvents();
  return all_events.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const all_events = await getAllEvents();

  let filteredEvents = all_events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}
