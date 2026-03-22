import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function useDyslexiaFont(): [boolean, () => void] {
  const [enabled, setEnabled] = useLocalStorage<boolean>(
    "pip-dyslexia-font",
    false,
  );

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("dyslexia-font");
    } else {
      document.documentElement.classList.remove("dyslexia-font");
    }
  }, [enabled]);

  return [enabled, () => setEnabled((p) => !p)];
}
