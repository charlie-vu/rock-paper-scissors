'use client';
import { motion } from 'motion/react';
import { Fragment } from 'react';

const choices = ['scissors', 'paper', 'rock', 'lizard', 'spock'];
const icons = {
  rock: '/images/icon-rock.svg',
  paper: '/images/icon-paper.svg',
  scissors: '/images/icon-scissors.svg',
  lizard: '/images/icon-lizard.svg',
  spock: '/images/icon-spock.svg',
}

const rules = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock'],
};

const getRandomChoice = (excludeIndex = null) => {
  let newIndex;
  do {
    newIndex = _.random(0, choices.length - 1);
  } while (newIndex === excludeIndex);
  return { choice: choices[newIndex], index: newIndex };
}

export default function Home() {
  return (
    <>
      <div className="home py-5 min-vh-100">
        <div className="container">
          <div className="card bg-transparent text-bg-dark px-4 py-3 border-3 border-outline rounded-4 mx-auto" style={{maxWidth: 720 }}>
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
                <p className="display-4 lh-1 fw-bold text-dark">99</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="ratio ratio-1x1 mx-auto" style={{ maxWidth: 540 }}>

              {choices.map((type, i) => {
                const angle = (360 / choices.length) * i - 90;
                const radius = 200;
                const x = radius * Math.cos((angle * Math.PI) / 180);
                const y = radius * Math.sin((angle * Math.PI) / 180);

                return (
                  <Fragment key={type}>
                    <div
                      className="top-50 start-50 rounded-circle overflow-hidden w-auto h-auto cursor-pointer hover-glow"
                      style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
                    >
                      <div className={`ratio ratio-1x1 bg-choice-${type}`} style={{ width: 125 }}>
                        <div className="bg-light rounded-circle overflow-hidden ratio ratio-1x1 top-50 start-50 translate-middle" style={{ width: "80%", height: "80%" }}>
                          <div className="d-flex justify-content-center align-items-center" >
                            <img src={icons[type]} alt={type} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {i === 0 &&
                      <img src="/images/bg-pentagon.svg" alt="pentagon" className="top-50 start-50 translate-middle z-index-n1" style={{ width: radius * 2, height: 'auto' }} />
                    }
                  </Fragment>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </>
  )
}