import axios from "axios";

export function makeApi() {
  return axios.create({
    baseURL: "https://rickandmortyapi.com/api",
  });
}

export function getCharacters(api = makeApi()) {
  return api.get("/character");
}

export function getCharacter(characterId, api = makeApi()) {
  return api.get(`/character/${characterId}`);
}

export function getLocations(api = makeApi()) {
  return api.get("/location");
}

export function getLocation(locationId, api = makeApi()) {
  return api.get(`/location/${locationId}`);
}

export function getEpisodes(page = 1, api = makeApi()) {
  return api.get(`/episode?page=${page}`);
}

export function getEpisode(episodeId, api = makeApi()) {
  return api.get(`/episode/${episodeId}`);
}

export function getUrl(url, api = makeApi()) {
  return api.get(url);
}
