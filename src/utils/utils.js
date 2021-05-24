import { getUrl } from "../api";

export function makePromises(elements = []) {
  return elements.map((element) => getUrl(element));
}

export function getDataFromResponse(responseArray = []) {
  return responseArray.map((res) => res.data);
}
