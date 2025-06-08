import donutsData from "../assets/donuts.json";
import { http, HttpResponse } from "msw";
import { apiRoot } from "../config";

export const handlers = [
  http.get(`${apiRoot}/donuts`, () => {
    return HttpResponse.json(donutsData, {
      status: 202,
      statusText: "Mocked status",
    });
  }),
];
