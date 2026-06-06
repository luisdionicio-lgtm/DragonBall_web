import axios from "axios";

const dragonballApi = axios.create({
  baseURL: "https://dragonball-api.com/api",
});

export async function getCharacters() {
  const response = await dragonballApi.get("/characters?limit=100");
  return response.data.items;
}
