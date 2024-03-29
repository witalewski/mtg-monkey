import mtgGoldfishAdapter from "./mtg-goldfish-adapter";
import mtgTop8Adapter from "./mtg-top8-adapter";
import mtgaZoneAdapter from "./mtgazone-adapter";

const selectAdapter = () => {
  if (window.location.hostname.includes("mtggoldfish.com")) {
    return mtgGoldfishAdapter;
  }
  if (window.location.hostname.includes("mtgtop8.com")) {
    return mtgTop8Adapter;
  }
  if (window.location.hostname.includes("mtgazone.com")) {
    return mtgaZoneAdapter;
  }
  return null;
};

export default selectAdapter;
