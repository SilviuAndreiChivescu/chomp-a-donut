import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import "@testing-library/jest-dom";

export const server = setupServer(...handlers);
