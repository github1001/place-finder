import { useEffect, useState } from "react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

interface UseGoogleMapsResult {
  isLoaded: boolean;
  error: string | null;
}

let loaderConfigured = false;
let loadingPromise: Promise<void> | null = null;

function configureLoader(): void {
  if (loaderConfigured) {
    return;
  }

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing VITE_GOOGLE_MAPS_API_KEY in the .env file.",
    );
  }

  setOptions({
    key: apiKey,
    v: "weekly",
  });

  loaderConfigured = true;
}

async function loadGoogleMapsLibraries(): Promise<void> {
  configureLoader();

  await Promise.all([
    importLibrary("maps"),
    importLibrary("places"),
    importLibrary("marker"),
  ]);
}

export function useGoogleMaps(): UseGoogleMapsResult {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    if (!loadingPromise) {
      loadingPromise = loadGoogleMapsLibraries();
    }

    loadingPromise
      .then(() => {
        if (active) {
          setIsLoaded(true);
        }
      })
      .catch((reason: unknown) => {
        if (!active) {
          return;
        }

        const message =
          reason instanceof Error
            ? reason.message
            : "Google Maps could not be loaded.";

        setError(message);
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    isLoaded,
    error,
  };
}