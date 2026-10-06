import { createContext, useContext } from "react";

export type CursorState = "default" | "hover" | "view" | "drag" | "cta";

export type CursorApi = {
  setCursor: (state: CursorState, label?: string) => void;
};

export const CursorContext = createContext<CursorApi>({
  setCursor: () => {},
});

export function useCursor() {
  return useContext(CursorContext);
}
