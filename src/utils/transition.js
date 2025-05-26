// Configs for motion

export const scale = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },

    transition: { type: "spring", duration: 0.3 },
};

export const vortex = {
    initial: { opacity: 0, scale: 0, rotate: 0 },
    animate: { opacity: 1, scale: 1, rotate: 360 },
    exit: { opacity: 0, scale: 0, rotate: 0 },

    transition: { type: "spring", duration: 0.5 },
};

export const fromRight = {
    initial: { opacity: 0, x: 25 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 25 },

    transition: { type: "spring", duration: 0.3 },
}