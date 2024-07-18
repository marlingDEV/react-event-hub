import React, { ReactNode, useEffect, useRef } from "react";
import { EventHubContext } from "./EventHubContext";
import { EventHubEvents, EventHubEventPayloads, EventHubContextValues } from "./types";

export const EventHubProvider = <E extends EventHubEvents>({ children }: { children: ReactNode }) => {
  const listenersRef = useRef<{ [key in E]?: ((payload: any) => void)[] }>({});

  const registerEvents: EventHubContextValues<E>["registerEvents"] = (names, callback) => {
    names.forEach(name => {
      if (!listenersRef.current[name]) {
        listenersRef.current[name] = [];
      }
      listenersRef.current[name]!.push(callback);
    });
  };

  const unregisterEvents: EventHubContextValues<E>["unregisterEvents"] = (names, callback) => {
    names.forEach(name => {
      const listeners = listenersRef.current[name];
      if (listeners) {
        listenersRef.current[name] = listeners.filter(cb => cb !== callback);
      }
    });
  };

  const triggerEvent: EventHubContextValues<E>["triggerEvent"] = (name, payload) => {
    const callbacks = listenersRef.current[name];
    if (callbacks) {
      for (const callback of callbacks) {
        callback(payload);
      }
    }
  };

  const registerOnceEvent: EventHubContextValues<E>["registerOnceEvent"] = (name, callback) => {
    const wrapper = (payload: any) => {
      callback(payload);
      unregisterEvents([name], wrapper);
    };
    registerEvents([name], wrapper);
  };

  useEffect(() => {
    return () => {
      listenersRef.current = {};
    };
  }, []);

  const contextValue: EventHubContextValues<E> = {
    registerEvents,
    unregisterEvents,
    triggerEvent,
    registerOnceEvent,
  };

  return (
    <EventHubContext.Provider value={contextValue}>
      {children}
    </EventHubContext.Provider>
  );
};
