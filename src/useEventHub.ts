import { useContext } from "react";
import { EventHubContext } from "./EventHubContext";
import { EventHubContextValues, EventHubEvents } from "./types";

export const useEventHub = <
  E extends EventHubEvents
>(): EventHubContextValues<E> => {
  const context = useContext(
    EventHubContext as React.Context<EventHubContextValues<E>>
  );
  if (!context) {
    throw new Error("useEventHub must be used within a EventHubProvider");
  }
  return context;
};
