import { createContext } from "react";
import { EventHubEvents, EventHubContextValues } from "./types";

export const EventHubContext = createContext<
  EventHubContextValues<EventHubEvents>
>({
  registerEvents: () => {
    throw new Error("Function not implemented.");
  },
  unregisterEvents: () => {
    throw new Error("Function not implemented.");
  },
  triggerEvent: () => {
    throw new Error("Function not implemented.");
  },
  registerOnceEvent: () => {
    throw new Error("Function not implemented.");
  },
});
