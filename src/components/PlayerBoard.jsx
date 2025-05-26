import { motion } from 'motion/react';
import { Fragment } from 'react';
import { scale, vortex } from '@/utils/transition';
import { game } from '@/utils/helper';
import ChoiceButton from './ChoiceButton';

export default function PlayerBoard(props) {
    const {
        onChange,
    } = props;
    return (
        <>
            <div className="ratio ratio-1x1 mx-auto" style={{ maxWidth: 540 }}>

                {game.choiceList.map((type, i) => {
                    const angle = (360 / game.choiceList.length) * i - 90;
                    const radius = 200;
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);

                    return (
                        <Fragment key={type}>
                            <div
                                className="top-50 start-50 rounded-circle w-auto h-auto cursor-pointer hover-glow"
                                style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
                                onClick={() => { onChange(type) }}
                            >
                                <ChoiceButton choice={type} width={125} />
                            </div>

                            {i === 0 &&
                                <img src="/images/bg-pentagon.svg" alt="pentagon" className="top-50 start-50 translate-middle z-index-n1" style={{ width: radius * 2, height: 'auto' }} />
                            }
                        </Fragment>
                    );
                })}
            </div>
        </>
    )
}