import posthog from "posthog-js";

let isInitialized = false;

export const initAnalytics = () => {
  if (typeof window !== "undefined" && !isInitialized) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "identified_only",
      capture_pageview: false,
      capture_pageleave: true,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") {
          posthog.debug();
          console.log("PostHog initialized");
        }
      },
    });
    isInitialized = true;
  }
};

export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== "undefined" && isInitialized) {
    posthog.capture(eventName, properties);
  }
};

export const trackPageView = () => {
  if (typeof window !== "undefined" && isInitialized) {
    posthog.capture("$pageview");
  }
};

export const identifyUser = (userId, traits = {}) => {
  if (typeof window !== "undefined" && isInitialized) {
    posthog.identify(userId, traits);
  }
};
