export type EventHubEvents = string;

export type EventHubEventPayloads<E extends EventHubEvents> = {
  [K in E]: any;
};

export type EventHubContextValues<E extends EventHubEvents> = {
  registerEvents: <K extends E[]>(
    names: K,
    callback: (payload: EventHubEventPayloads<E>[K[number]]) => void
  ) => void;
  unregisterEvents: <K extends E[]>(
    names: K,
    callback: (payload: EventHubEventPayloads<E>[K[number]]) => void
  ) => void;
  triggerEvent: <K extends E>(
    name: K,
    payload: EventHubEventPayloads<E>[K]
  ) => void;
  registerOnceEvent: <K extends E>(
    name: K,
    callback: (payload: EventHubEventPayloads<E>[K]) => void
  ) => void;
};
