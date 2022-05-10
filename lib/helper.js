export async function GenericFetch(url, options) {
  const r = await fetch(url, options);
  return r.json();
}

export function responseFormat(data, message, status = true) {
  return { data, message, status };
}
