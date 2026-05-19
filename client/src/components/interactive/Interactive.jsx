import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/index';
import './Interactive.css';

/* ─── SNAKE GAME ─────────────────────────────────────── */
const GRID     = 20;
const CELL     = 20;
const SPEED_MS = 120;

const DIRS = {
  ArrowUp:    [0, -1], w: [0, -1],
  ArrowDown:  [0,  1], s: [0,  1],
  ArrowLeft:  [-1, 0], a: [-1, 0],
  ArrowRight: [1,  0], d: [1,  0],
};

const randFood = (snake) => {
  let food;
  do {
    food = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (snake.some(s => s.x === food.x && s.y === food.y));
  return food;
};

const INIT_SNAKE = [{ x:10,y:10 },{ x:9,y:10 },{ x:8,y:10 }];

export default function SnakeSection() {
  const ref = useScrollReveal();

  const [snake,   setSnake]   = useState(INIT_SNAKE);
  const [food,    setFood]    = useState({ x:14, y:7 });
  const [running, setRunning] = useState(false);
  const [dead,    setDead]    = useState(false);
  const [score,   setScore]   = useState(0);
  const [hiscore, setHiscore] = useState(0);
  const [speed,   setSpeed]   = useState(SPEED_MS);

  const dirRef   = useRef([1, 0]);
  const runRef   = useRef(false);
  const boardRef = useRef(null);

  const reset = () => {
    const initSnake = [{ x:10,y:10 },{ x:9,y:10 },{ x:8,y:10 }];
    setSnake(initSnake);
    setFood(randFood(initSnake));
    dirRef.current = [1, 0];
    setScore(0);
    setDead(false);
    setSpeed(SPEED_MS);
    setRunning(true);
    runRef.current = true;
    boardRef.current?.focus();
  };

  // Keyboard input
  useEffect(() => {
    const onKey = e => {
      // Do not intercept keys when user is typing in any input, textarea or contenteditable
      const tag = document.activeElement?.tagName?.toLowerCase();
      const editable = document.activeElement?.isContentEditable;
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || editable) return;
      if (DIRS[e.key]) {
        e.preventDefault();
        const [dx, dy] = DIRS[e.key];
        const [cx, cy] = dirRef.current;
        // Prevent 180° reversal
        if (dx !== -cx || dy !== -cy) dirRef.current = [dx, dy];
      }
      if (e.key === ' ' || e.key === 'Enter') {
        if (!runRef.current) reset();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Game loop
  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => {
      setSnake(prev => {
        const [dx, dy] = dirRef.current;
        const head = {
          x: (prev[0].x + dx + GRID) % GRID,
          y: (prev[0].y + dy + GRID) % GRID,
        };
        // Collision with self
        if (prev.some(s => s.x === head.x && s.y === head.y)) {
          setDead(true);
          setRunning(false);
          runRef.current = false;
          return prev;
        }
        setFood(prevFood => {
          if (head.x === prevFood.x && head.y === prevFood.y) {
            // Ate food
            setScore(s => {
              const next = s + 10;
              setHiscore(h => Math.max(h, next));
              // Speed up every 50 pts
              if (next % 50 === 0) setSpeed(sp => Math.max(60, sp - 10));
              return next;
            });
            const newSnake = [head, ...prev];
            return randFood(newSnake);
          }
          return prevFood;
        });
        return [head, ...prev.slice(0, -1)];
      });
    }, speed);
    return () => clearInterval(iv);
  }, [running, speed]);

  const pause = () => {
    setRunning(r => { runRef.current = !r; return !r; });
  };

  const pad = GRID * CELL; // 400px

  // D-pad direction handler
  const dpad = (dir) => {
    const [dx, dy] = DIRS[dir];
    const [cx, cy] = dirRef.current;
    if (dx !== -cx || dy !== -cy) dirRef.current = [dx, dy];
    if (!runRef.current && !dead) reset();
  };

  return (
    <section className="section snake-sec">
      <div className="container">
        <div className="section-header reveal" ref={ref}>
          <span className="section-label"><i className="fa-solid fa-gamepad"></i>Fun Corner</span>
          <h2 className="section-title">Take a <span>Break</span></h2>
          <p className="section-sub">We build serious software — but we also know when to have fun.</p>
        </div>

        <div className="snake-shell">
          {/* Left panel — info & controls */}
          <div className="snake-panel">
            <div className="snake-scores">
              <div className="snake-score-box">
                <span className="snake-score-label">Score</span>
                <span className="snake-score-val">{score}</span>
              </div>
              <div className="snake-score-box">
                <span className="snake-score-label">Best</span>
                <span className="snake-score-val hi">{hiscore}</span>
              </div>
            </div>

            <div className="snake-info-block">
              <div className="snake-info-row">
                <i className="fa-solid fa-keyboard"></i>
                <span>WASD or arrow keys</span>
              </div>
              <div className="snake-info-row">
                <i className="fa-solid fa-space-shuttle"></i>
                <span>Space to start / restart</span>
              </div>
              <div className="snake-info-row">
                <i className="fa-solid fa-bolt"></i>
                <span>Speeds up every 50 pts</span>
              </div>
            </div>

            <div className="snake-btn-row">
              {!running && !dead && (
                <button className="snake-action-btn primary" onClick={reset}>
                  <i className="fa-solid fa-play"></i> Start Game
                </button>
              )}
              {running && (
                <button className="snake-action-btn secondary" onClick={pause}>
                  <i className="fa-solid fa-pause"></i> Pause
                </button>
              )}
              {dead && (
                <button className="snake-action-btn primary" onClick={reset}>
                  <i className="fa-solid fa-rotate-right"></i> Play Again
                </button>
              )}
              {!running && !dead && score > 0 && (
                <button className="snake-action-btn secondary" onClick={reset}>
                  <i className="fa-solid fa-rotate-right"></i> Restart
                </button>
              )}
            </div>

            {/* D-pad */}
            <div className="dpad">
              <div></div>
              <button className="dpad-btn" onClick={() => dpad('ArrowUp')}>
                <i className="fa-solid fa-chevron-up"></i>
              </button>
              <div></div>
              <button className="dpad-btn" onClick={() => dpad('ArrowLeft')}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button className="dpad-btn dpad-center" onClick={() => !running ? reset() : pause()}>
                <i className={`fa-solid ${running ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
              <button className="dpad-btn" onClick={() => dpad('ArrowRight')}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
              <div></div>
              <button className="dpad-btn" onClick={() => dpad('ArrowDown')}>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div></div>
            </div>
          </div>

          {/* Game board */}
          <div className="snake-board-wrap">
            <div
              ref={boardRef}
              className="snake-board"
              style={{ width: pad, height: pad }}
              tabIndex={0}
              aria-label="Snake game board">

              {/* Grid lines */}
              <div className="snake-grid-overlay"></div>

              {/* Food */}
              <div className="snake-food"
                style={{ left: food.x * CELL, top: food.y * CELL, width: CELL, height: CELL }}>
                <div className="food-pulse"></div>
              </div>

              {/* Snake segments */}
              {snake.map((seg, i) => (
                <div
                  key={i}
                  className={`snake-seg ${i === 0 ? 'snake-head' : ''}`}
                  style={{
                    left: seg.x * CELL,
                    top:  seg.y * CELL,
                    width:  CELL - 1,
                    height: CELL - 1,
                    opacity: Math.max(0.4, 1 - i * 0.015),
                  }}
                />
              ))}

              {/* Overlay */}
              <AnimatePresence>
                {(!running) && (
                  <motion.div className="snake-overlay"
                    initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                    {dead ? (
                      <>
                        <div className="snake-ov-icon dead"><i className="fa-solid fa-skull-crossbones"></i></div>
                        <h3 className="snake-ov-title">Game Over</h3>
                        <p className="snake-ov-score">You scored <strong>{score}</strong></p>
                        {score === hiscore && score > 0 && (
                          <span className="snake-ov-record">New Record!</span>
                        )}
                        <p className="snake-ov-hint">Press Space or Play Again</p>
                      </>
                    ) : score > 0 ? (
                      <>
                        <div className="snake-ov-icon paused"><i className="fa-solid fa-pause"></i></div>
                        <h3 className="snake-ov-title">Paused</h3>
                        <p className="snake-ov-hint">Press Space to continue</p>
                      </>
                    ) : (
                      <>
                        <div className="snake-ov-icon start"><i className="fa-solid fa-gamepad"></i></div>
                        <h3 className="snake-ov-title">Snake</h3>
                        <p className="snake-ov-hint">Press Space or click Start</p>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Speed indicator */}
            <div className="snake-speed-bar">
              <span>Speed</span>
              <div className="speed-track">
                <div className="speed-fill" style={{ width: `${Math.min(100, ((SPEED_MS - speed) / (SPEED_MS - 60)) * 100)}%` }}></div>
              </div>
              <span>{score >= 50 ? `×${Math.floor((SPEED_MS - speed) / 10) + 1}` : '×1'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
