import { useState, useEffect } from 'react';

export const useScreen = () => {
    const breakpoints = { sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 };
    const [screen, setScreen] = useState({});

    useEffect(() => {
        const query = (q) => window.matchMedia(q).matches;
        const update = () => {
            const w = window.innerWidth;
            setScreen({
                xs: w < breakpoints.sm,
                sm: w >= breakpoints.sm && w < breakpoints.md,
                md: w >= breakpoints.md && w < breakpoints.lg,
                lg: w >= breakpoints.lg && w < breakpoints.xl,
                xl: w >= breakpoints.xl,
                gt: {
                    xs: w >= breakpoints.sm,
                    sm: w >= breakpoints.md,
                    md: w >= breakpoints.lg,
                    lg: w >= breakpoints.xl,
                },
                lt: {
                    sm: w < breakpoints.sm,
                    md: w < breakpoints.md,
                    lg: w < breakpoints.lg,
                    xl: w < breakpoints.xl,
                },
            });
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return screen;
};
