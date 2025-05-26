import { motion } from 'motion/react';
import { Fragment } from 'react';
import { scale, vortex } from '@/utils/transition';
import ChoiceButton from './ChoiceButton';
import { useScreen } from '@/hooks/useScreen';

export default function PlayerBoard(props) {
    const {
        choiceList = [],
        onChange,
    } = props;

    const screen = useScreen();

    const radius = screen?.gt?.sm ? 200 : 100;

    if (!choiceList || !choiceList.length) return null;
    return (
        <>
            <div className="ratio ratio-1x1 mx-auto" style={{ maxWidth: 540 }}>

                <img src={`/images/bg-${choiceList.length > 3 ? 'pentagon' : 'triangle'}.svg`} alt="game-board" className="top-50 start-50 translate-middle z-index-n1" style={{ width: radius * 2, height: 'auto' }} />

                {choiceList.map((type, i) => {
                    const angle = (360 / choiceList.length) * i + (choiceList.length > 3 ? -90 : -150);
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180) + (choiceList.length > 3 ? 0 : screen?.gt?.sm ? -60 : -30);

                    return (
                        <Fragment key={type}>
                            <div
                                className="top-50 start-50 rounded-circle w-auto h-auto cursor-pointer hover-glow"
                                style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
                                onClick={() => { onChange(type) }}
                            >
                                <ChoiceButton choice={type} width={screen?.gt?.sm ? 125 : 75} />
                            </div>
                        </Fragment>
                    );
                })}
            </div>
        </>
    )
}