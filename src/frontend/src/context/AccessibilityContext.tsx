import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext, useEffect } from "react";

interface AccessibilityContextValue {
  easyRead: boolean;
  setEasyRead: (val: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue>({
  easyRead: false,
  setEasyRead: () => {},
});

export function AccessibilityProvider({
  children,
}: { children: React.ReactNode }) {
  const [easyRead, setEasyRead] = useLocalStorage<boolean>(
    "pip-easy-read",
    false,
  );

  useEffect(() => {
    if (easyRead) {
      document.body.classList.add("easy-read");
    } else {
      document.body.classList.remove("easy-read");
    }
  }, [easyRead]);

  return (
    <AccessibilityContext.Provider value={{ easyRead, setEasyRead }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}
