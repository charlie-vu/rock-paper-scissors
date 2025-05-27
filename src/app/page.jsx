'use client';
import { AnimatePresence, motion } from 'motion/react';
import { Fragment, useEffect, useRef, useState } from 'react';

import { fromRight, scale, vortex } from '@/utils/transition';
import PlayerBoard from '@/components/PlayerBoard';
import { game } from '@/utils/helper';
import ChoiceButton from '@/components/ChoiceButton';
import _ from 'lodash';
import { Modal } from 'react-bootstrap';
import { useScreen } from '@/hooks/useScreen';

const logo = '/images/logo.svg';
const logoBonus = '/images/logo-bonus.svg';

export default function Home() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [doneThinking, setDoneThinking] = useState(false);
  const [winner, setWinner] = useState(null);

  const [isBonus, setIsBonus] = useState(true);
  const [choiceList, setChoiceList] = useState([]);

  const [showRules, setShowRules] = useState(false);

  const [score, setScore] = useState(0);
  const mounted = useRef(null)

  const screen = useScreen();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    sessionStorage.setItem('score', score)
    console.log(sessionStorage.getItem('score'))
  }, [score])
  useEffect(() => {
    sessionStorage.getItem('score') && setScore(parseInt(sessionStorage.getItem('score')));
  }, [])

  const resultStrings = {
    user: 'YOU WIN',
    computer: 'YOU LOSE',
    tie: 'TIE',
  };

  const getRandomChoice = () => {
    setComputerChoice((prev) => {
      let newChoice;
      do {
        newChoice = _.sample(choiceList)
      } while (newChoice === prev);

      return newChoice;
    })

  };

  const getWinner = () => {
    if (playerChoice === computerChoice) {
      setWinner('tie')
    } else if (game.rules[playerChoice].includes(computerChoice)) {
      setWinner('user');
      setScore((prev) => parseInt(prev) + 1)
    } else {
      setWinner('computer')
      setScore((prev) => parseInt(prev) - 1)
    }
  }

  const reset = () => {
    setPlayerChoice(null)
    setComputerChoice(null)
    setDoneThinking(false)
  }

  useEffect(() => {
    if (!playerChoice) return;

    // setComputerChoice('paper');
    // setDoneThinking(true);

    const totalSteps = 20;
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

  useEffect(() => {
    if (!doneThinking) return;
    // console.log(playerChoice)
    // console.log(computerChoice)
    getWinner();
  }, [doneThinking])

  useEffect(() => {
    if (isBonus) {
      setChoiceList(game.choiceListBonus)
    } else {
      setChoiceList(game.choiceListOrigin)
    }
  }, [isBonus])

  if (!choiceList || !choiceList.length) return null;

  return (
    <>
      <div className="home d-stack py-5 min-vh-100">
        <div className="container flex-grow-1">
          <div className="card bg-transparent text-bg-dark p-3 border-3 border-outline rounded-4 mx-auto" style={{ maxWidth: 720 }}>
            <div className="d-flex gap-3 justify-content-between align-items-center">

              <AnimatePresence mode='wait'>
                <motion.img key={isBonus} {...fromRight} src={isBonus ? logoBonus : logo} alt="logo" />
              </AnimatePresence>

              <div className="card p-3 px-lg-5 py-3 text-center">
                <p className="text-score tracking-widest fs-5">SCORE</p>
                <p className="display-4 lh-1 fw-bold text-dark">{score}</p>
              </div>
            </div>
          </div>

          <div className="pt-5 overflow-hidden">
            <AnimatePresence mode='wait'>
              {
                !playerChoice ?
                  <motion.div key={`${playerChoice}`} {...vortex}>
                    <PlayerBoard choiceList={choiceList} isBonusMode={isBonus} onChange={(e) => { setPlayerChoice(e) }} onChangeMode={() => { setIsBonus((prev) => !prev) }} />
                  </motion.div> :

                  <motion.div key={playerChoice} {...scale}>

                    <div className="row text-center justify-content-center gx-0 mt-5">
                      <div className="col-6 col-lg">
                        <div className="d-stack align-items-center gap-3 gap-lg-5">
                          <ChoiceButton choice={playerChoice} width={'70%'} />
                          <p className="fw-bold fs-6 fs-lg-4 tracking-wider order-lg-first">YOU PICKED</p>
                        </div>
                      </div>
                      {
                        <div className="col-12 col-lg-auto order-last order-lg-0 mt-5" style={{ transition: 'all 1s', maxWidth: doneThinking ? '100%' : '0%' }}>
                          {
                            doneThinking &&
                            <motion.div {...scale} transition={{ type: "spring", duration: 0.3, delay: 0.5 }} className="d-stack justify-content-center text-center h-100">
                              <p className="fw-bold display-4 text-uppercase">{winner && resultStrings[winner]}</p>
                              <div>
                                <button className="btn btn-light fw-semibold fs-4 mt-3 px-5 text-uppercase" onClick={reset}>Play Again</button>
                              </div>
                            </motion.div>
                          }

                        </div>
                      }

                      <div className="col-6 col-lg">
                        <div className="d-stack align-items-center gap-3 gap-lg-5">
                          <ChoiceButton choice={computerChoice} width={'70%'} />
                          <p className="fw-bold fs-6 fs-lg-4 tracking-wider order-lg-first">THE HOUSE PICKED</p>
                        </div>
                      </div>
                    </div>


                  </motion.div>
              }

            </AnimatePresence>
          </div>

        </div>

        <div className="container">
          <div className="d-flex flex-column flex-lg-row gap-3 justify-content-end align-items-center">
            <button className="btn btn-outline-light text-uppercase" onClick={() => { setIsBonus((prev) => !prev) }} disabled={playerChoice}>Change Mode</button>
            <button className="btn btn-outline-light text-uppercase" onClick={() => { setShowRules(true) }}>Rules</button>
          </div>
        </div>

        <Modal show={showRules} onHide={() => { setShowRules(false) }} fullscreen="md-down" centered>
          <Modal.Body className="p-5 my-5 my-md-0">
            <div className="position-relative h-100 d-stack gap-5 justify-content-between align-items-center">
              <h2 className="fw-bold text-center text-md-start w-100">RULES</h2>
              <img src={`/images/image-rules${isBonus ? '-bonus' : ''}.svg`} alt="rules" className="w-100" />
              <img src="/images/icon-close.svg" alt="close" className={`mt-2 cursor-pointer ${screen?.gt?.md ? 'position-absolute top-0 end-0' : ''}`} onClick={() => { setShowRules(false) }} />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}
