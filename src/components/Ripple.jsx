import { motion } from 'motion/react';

export default function Ripple(props) {
    const {
        width = '100%',
        className = '',
    } = props;
    return (
        <motion.div
            className={`ratio ratio-1x1 position-absolute rounded-circle bg-outline ${className}`}
            style={{
                top: '50%',
                left: '50%',
                translateX: '-50%',
                translateY: '-50%',
                zIndex: -1,
                width: width,
            }}
            animate={{
                scale: [0, 2],
                opacity: [0, 1, 0],
            }}
            transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeOut',
            }}
        />
    )
}