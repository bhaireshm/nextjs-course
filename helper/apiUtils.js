const apiUrl = "https://nextjs-course-ed07a-default-rtdb.firebaseio.com/";

export function fetch(options = { url: apiUrl, method: "GET" }) {
  return fetch(`${options.url}${options.tableName || "feedback.json"}`, options);
}
