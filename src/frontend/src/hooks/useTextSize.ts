import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export type TextSize = "normal" | "large" | "xl";

export function useTextSize(): [TextSize, (size: TextSize) => void] {
  const [textSize, setTextSize] = useLocalStorage<TextSize>(
    "pip-text-size",
    "normal",
  );

  useEffect(() => {
    document.documentElement.classList.remove(
      "text-size-large",
      "text-size-xl",
    );
    if (textSize === "large") {
      document.documentElement.classList.add("text-size-large");
    } else if (textSize === "xl") {
      document.documentElement.classList.add("text-size-xl");
    }
  }, [textSize]);

  return [textSize, setTextSize];
}
