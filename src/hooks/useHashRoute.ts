import { useCallback, useEffect, useState } from "react";
import { scrollToId, scrollToTop } from "./useLenis";

export type Route =
  | { view: "home"; section: string | null }
  | { view: "project"; slug: string };

function parseHash(hash: string): Route {
  const raw = hash.replace(/^#/, "");
  const project = raw.match(/^project\/([a-z0-9-]+)/i);
  if (project) return { view: "project", slug: project[1] };
  if (!raw || raw.startsWith("project")) return { view: "home", section: null };
  return { view: "home", section: raw };
}

export function useHashRoute() {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined" ? { view: "home", section: null } : parseHash(window.location.hash),
  );

  useEffect(() => {
    const onHash = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (route.view === "project") {
      scrollToTop();
      return;
    }
    if (route.section) {
      const t = window.setTimeout(() => scrollToId(route.section!), 60);
      return () => window.clearTimeout(t);
    }
  }, [route]);

  const openProject = useCallback((slug: string) => {
    window.location.hash = `project/${slug}`;
  }, []);

  const goHome = useCallback((section?: string) => {
    window.location.hash = section ?? "";
    if (!section) scrollToTop();
  }, []);

  const goSection = useCallback(
    (id: string) => {
      if (route.view === "project") {
        window.location.hash = id;
        return;
      }
      if (window.location.hash.replace("#", "") === id) {
        scrollToId(id);
        return;
      }
      window.location.hash = id;
      scrollToId(id);
    },
    [route.view],
  );

  return { route, openProject, goHome, goSection };
}
