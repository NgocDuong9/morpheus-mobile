import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

import type { DashboardTabKey } from "./types";

type ScrollToTopFn = (animated: boolean) => void;

type DashboardScrollContextValue = {
  register: (tab: DashboardTabKey, fn: ScrollToTopFn) => () => void;
  scrollToTop: (tab: DashboardTabKey, animated?: boolean) => boolean;
};

const DashboardScrollContext =
  createContext<DashboardScrollContextValue | null>(null);

export function DashboardScrollProvider({ children }: { children: ReactNode }) {
  const registry = useRef(new Map<DashboardTabKey, ScrollToTopFn>());

  const register = useCallback(
    (tab: DashboardTabKey, fn: ScrollToTopFn) => {
      registry.current.set(tab, fn);
      return () => {
        if (registry.current.get(tab) === fn) {
          registry.current.delete(tab);
        }
      };
    },
    [],
  );

  const scrollToTop = useCallback(
    (tab: DashboardTabKey, animated = true) => {
      const fn = registry.current.get(tab);
      if (!fn) return false;
      fn(animated);
      return true;
    },
    [],
  );

  const value = useMemo(
    () => ({ register, scrollToTop }),
    [register, scrollToTop],
  );

  return (
    <DashboardScrollContext.Provider value={value}>
      {children}
    </DashboardScrollContext.Provider>
  );
}

export function useDashboardScroll() {
  return useContext(DashboardScrollContext);
}
