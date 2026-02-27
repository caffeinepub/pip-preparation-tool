import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useHighContrastMode(): [boolean, () => void] {
    const [isHighContrast, setIsHighContrast] = useLocalStorage<boolean>('pip-high-contrast-mode', false);

    useEffect(() => {
        if (isHighContrast) {
            document.documentElement.classList.add('high-contrast');
        } else {
            document.documentElement.classList.remove('high-contrast');
        }
    }, [isHighContrast]);

    const toggle = () => setIsHighContrast((prev) => !prev);

    return [isHighContrast, toggle];
}
