import { useEffect } from "react";
import { useEventHub } from "./useEventHub";
import { EventHubEvents, EventHubEventPayloads } from "./types";

export const useRegisterEvents = <E extends EventHubEvents, K extends E[]>(
  names: K,
  callback: (payload: EventHubEventPayloads<E>[K[number]]) => void
) => {
  const { registerEvents, unregisterEvents } = useEventHub<E>();

  useEffect(() => {
    registerEvents(names, callback);
    return () => {
      unregisterEvents(names, callback);
    };
  }, [names, callback, registerEvents, unregisterEvents]);
};
