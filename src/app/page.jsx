'use client';
import { AnimatePresence, motion } from 'motion/react';
import { Fragment, useEffect, useState } from 'react';

import { scale, vortex } from '@/utils/transition';
import PlayerBoard from '@/components/PlayerBoard';
import { game } from '@/utils/helper';
import ChoiceButton from '@/components/ChoiceButton';
import _ from 'lodash';

export default function Home() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [doneThinking, setDoneThinking] = useState(false);

  const getRandomChoice = () => {
    setComputerChoice((prev) => {
      let newChoice;
      do {
        newChoice = _.sample(game.choiceList)
      } while (newChoice === prev);

      return newChoice;
    })

  };

  const reset = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
  }

  useEffect(() => {
    if (!playerChoice) return;

    const totalSteps = 30;
    const timeouts = [];
    setDoneThinking(false);

    const startThinking = () => {
      let time = 0;

      for (let i = 0; i < totalSteps; i++) {
        let delay;

        if (i >= totalSteps - 6) delay = 200;
        else delay = 100;

        time += delay;

        const timeoutId = setTimeout(() => {
          getRandomChoice();
          setTimeout(() => {
            if (i === totalSteps - 1) setDoneThinking(true)
          }, 1000);
        }, time);

        timeouts.push(timeoutId);
      }
    };

    // Wait 1 second before beginning animation
    const initTimeout = setTimeout(startThinking, 1500);
    timeouts.push(initTimeout);

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [playerChoice])

  return (
    <>
      <div className="home py-5 min-vh-100">
        <div className="container">
          <div className="card bg-transparent text-bg-dark px-4 py-3 border-3 border-outline rounded-4 mx-auto" style={{ maxWidth: 720 }}>
            <div className="d-flex gap-3 justify-content-between align-items-center">
              <div className="fs-4" style={{ lineHeight: 0.8 }}>
                <p>ROCK</p>
                <p>PAPER</p>
                <p>SCISSORS</p>
                <p>LIZARD</p>
                <p>SPOCK</p>
              </div>

              <div className="card px-5 py-3 text-center">
                <p className="text-score tracking-widest fs-5">SCORE</p>
                <p className="display-4 lh-1 fw-bold text-dark">999</p>
              </div>
            </div>
          </div>

          <div className="py-5 overflow-hidden">
            <AnimatePresence mode='wait'>
              {
                !playerChoice ?
                  <motion.div key={playerChoice} {...vortex}>
                    <PlayerBoard onChange={(e) => { setPlayerChoice(e) }} />
                  </motion.div> :
                  <motion.div key={playerChoice} {...scale}>

                    <div className="row text-center justify-content-center gx-0">
                      <div className="col-6 col-lg">
                        <div className="d-stack align-items-center">
                          <p className="fw-bold fs-4 tracking-wider">YOU PICKED</p>
                          <ChoiceButton choice={playerChoice} width={'70%'} className="mt-5" />
                        </div>
                      </div>
                      {
                        <div className="col-12 col-lg-auto order-last order-lg-0 mt-5" style={{ transition: 'all 1s', maxWidth: doneThinking ? '100%' : '0%' }}>
                          {
                            doneThinking &&
                            <motion.div {...scale} transition={{ type: "spring", duration: 0.3, delay: 0.5 }} className="d-stack justify-content-center text-center h-100">
                              <p className="fw-bold display-4">YOU WIN</p>
                              <div>
                                <button className="btn btn-light text-dark fw-semibold fs-4 mt-3 px-5" onClick={reset}>Play Again</button>
                              </div>
                            </motion.div>
                          }

                        </div>
                      }

                      <div className="col-6 col-lg">
                        <div className="d-stack align-items-center">
                          <p className="fw-bold fs-4 tracking-wider">THE HOUSE PICKED</p>
                          <ChoiceButton choice={computerChoice} width={'70%'} className="mt-5" />

                        </div>
                      </div>
                    </div>


                  </motion.div>
              }

            </AnimatePresence>
          </div>

        </div>
      </div >
    </>
  )
}