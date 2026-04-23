import { useState } from 'react';
import QUESTIONS from './questions.json';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Shared primitives ───────────────────────────────────────────────────────

function Grain() {
  return <div className="grain" aria-hidden="true" />;
}

function Atmosphere() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Worship violet orb */}
      <div
        className="absolute rounded-full blur-3xl animate-drift"
        style={{
          width: '50vmax',
          height: '50vmax',
          top: '-18%',
          right: '-12%',
          background: 'radial-gradient(circle, oklch(52% 0.22 307 / 0.2) 0%, transparent 68%)',
          animationDuration: '15s',
        }}
      />
      {/* Love rose orb */}
      <div
        className="absolute rounded-full blur-3xl animate-drift"
        style={{
          width: '44vmax',
          height: '44vmax',
          bottom: '-14%',
          left: '-12%',
          background: 'radial-gradient(circle, oklch(50% 0.24 15 / 0.17) 0%, transparent 68%)',
          animationDuration: '19s',
          animationDelay: '-7s',
        }}
      />
      {/* Gold center whisper */}
      <div
        className="absolute rounded-full blur-3xl animate-float"
        style={{
          width: '28vmax',
          height: '28vmax',
          top: '38%',
          left: '28%',
          background: 'radial-gradient(circle, oklch(62% 0.12 82 / 0.06) 0%, transparent 70%)',
          animationDuration: '10s',
          animationDelay: '-4s',
        }}
      />
    </div>
  );
}

function Ornament({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="h-px flex-1"
        style={{ background: 'linear-gradient(to right, transparent, var(--c-gold-dim))' }}
      />
      <span className="font-display text-gold-dim" style={{ fontSize: '0.9rem' }} aria-hidden="true">
        ✦
      </span>
      <div
        className="h-px flex-1"
        style={{ background: 'linear-gradient(to left, transparent, var(--c-gold-dim))' }}
      />
    </div>
  );
}

// ─── StartScreen ─────────────────────────────────────────────────────────────

function StartScreen({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16 text-center">
      <div className="max-w-xs mx-auto w-full">
        {/* Eyebrow */}
        <p
          className="font-body text-ink-dim uppercase tracking-widest animate-fade-up delay-100"
          style={{ fontSize: '0.65rem', letterSpacing: '0.28em' }}
        >
          Can you tell the difference?
        </p>

        {/* Title block */}
        <div className="mt-6 space-y-0 animate-fade-up delay-200">
          <h1
            className="font-display font-light italic leading-none"
            style={{ fontSize: 'clamp(3.8rem, 14vw, 5.5rem)', color: 'var(--c-worship)' }}
          >
            Worship
          </h1>
          <p
            className="font-display font-light text-ink-dim"
            style={{ fontSize: 'clamp(1.1rem, 4.5vw, 1.6rem)', lineHeight: 1.2 }}
          >
            or
          </p>
          <h1
            className="font-display font-light italic leading-none"
            style={{ fontSize: 'clamp(3rem, 11vw, 4.8rem)', color: 'var(--c-love)' }}
          >
            Love Song?
          </h1>
        </div>

        <div className="mt-8 animate-fade-up delay-300">
          <Ornament />
        </div>

        {/* Description */}
        <p
          className="mt-6 font-body text-ink-dim leading-relaxed animate-fade-up delay-400"
          style={{ fontSize: '0.9rem' }}
        >
          Thirteen lyrics. Two categories.<br />
          One surprisingly tricky quiz.
        </p>

        {/* CTA */}
        <button
          onClick={onStart}
          className="relative mt-8 w-full overflow-hidden rounded font-body font-medium uppercase tracking-widest text-void transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] animate-fade-up delay-500"
          style={{
            padding: '1rem 2rem',
            fontSize: '0.72rem',
            letterSpacing: '0.22em',
            background: 'var(--c-gold)',
            boxShadow: '0 0 0 1px oklch(74% 0.13 82 / 0.25), 0 8px 32px oklch(74% 0.13 82 / 0.22)',
          }}
        >
          Start Playing
        </button>

        <p
          className="mt-8 font-body text-ink-dim animate-fade-up delay-500"
          style={{ fontSize: '0.65rem' }}
        >
          A quiz for Fear &amp; Wonder · NYC
        </p>
      </div>
    </div>
  );
}

// ─── GameScreen ───────────────────────────────────────────────────────────────

function GameScreen({ question, index, total, score, onAnswer, showAnswer, selectedAnswer, onNext }) {
  const isCorrect = selectedAnswer !== null && selectedAnswer === question.category;
  const isLast = index === total - 1;
  const progressPct = (index / total) * 100;

  return (
    <div className="flex flex-col min-h-screen px-5 py-8">
      {/* ── Header ── */}
      <header className="flex items-center justify-between mb-6 max-w-lg mx-auto w-full animate-fade-in delay-100">
        <span className="font-body text-ink-dim" style={{ fontSize: '0.76rem' }}>
          <span className="text-ink font-medium">{index + 1}</span>
          <span className="text-ink-dim"> / {total}</span>
        </span>

        {/* Progress bar */}
        <div
          className="flex-1 mx-4 rounded-full overflow-hidden"
          style={{ height: '2px', background: 'var(--c-surface-hi)' }}
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
        >
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%`, background: 'var(--c-gold)' }}
          />
        </div>

        <span className="font-body text-ink-dim" style={{ fontSize: '0.76rem' }}>
          Score{' '}
          <span className="text-gold font-medium">{score}</span>
        </span>
      </header>

      {/* ── Lyric card ── */}
      <div className="flex-1 flex items-center justify-center max-w-lg mx-auto w-full py-4">
        <div
          className="w-full rounded-xl p-8 sm:p-10 text-center relative animate-fade-up delay-200"
          style={{
            background: 'var(--c-surface)',
            border: '1px solid var(--c-rim)',
            boxShadow: '0 4px 6px -1px oklch(0% 0 0 / 0.2), 0 20px 60px oklch(0% 0 0 / 0.35)',
          }}
        >
          {/* Decorative opening quote */}
          <span
            className="absolute font-display italic select-none pointer-events-none"
            style={{
              fontSize: '9rem',
              lineHeight: 1,
              top: '-2.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'oklch(42% 0.06 290)',
            }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <p
            className="font-display italic text-ink leading-relaxed relative z-10"
            style={{ fontSize: 'clamp(1.2rem, 4.5vw, 1.6rem)', lineHeight: 1.7 }}
          >
            {question.lyric}
          </p>

          <div
            className="mt-7 mx-auto w-10"
            style={{ height: '1px', background: 'var(--c-rim)' }}
          />
        </div>
      </div>

      {/* ── Answer buttons or Feedback ── */}
      <div className="max-w-lg mx-auto w-full mt-6 space-y-3 pb-8 animate-fade-up delay-300">
        {!showAnswer && (
          <>
            <AnswerButton
              label="Worship"
              icon="✞"
              accentVar="--c-worship"
              bgBase="oklch(12% 0.04 307)"
              borderBase="oklch(38% 0.12 307 / 0.45)"
              glowBase="oklch(55% 0.22 307 / 0.1)"
              onClick={() => onAnswer('Worship')}
            />
            <AnswerButton
              label="Love Song"
              icon="♥"
              accentVar="--c-love"
              bgBase="oklch(12% 0.04 15)"
              borderBase="oklch(38% 0.14 15 / 0.45)"
              glowBase="oklch(52% 0.24 15 / 0.1)"
              onClick={() => onAnswer('Love Song')}
            />
          </>
        )}

        {showAnswer && (
          <div className="space-y-3 animate-slide-up">
            <FeedbackBanner
              isCorrect={isCorrect}
              question={question}
              selectedAnswer={selectedAnswer}
            />
            <button
              onClick={onNext}
              className="w-full rounded-lg font-body font-medium uppercase tracking-widest text-void transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97]"
              style={{
                padding: '1rem',
                fontSize: '0.72rem',
                letterSpacing: '0.2em',
                background: 'var(--c-gold)',
                boxShadow: '0 0 0 1px oklch(74% 0.13 82 / 0.25), 0 6px 20px oklch(74% 0.13 82 / 0.18)',
              }}
            >
              {isLast ? 'See Results' : 'Next →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AnswerButton({ label, icon, accentVar, bgBase, borderBase, glowBase, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg font-body font-medium tracking-wide transition-all duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.97]"
      style={{
        padding: '1rem 1.5rem',
        fontSize: '1rem',
        color: `var(${accentVar})`,
        background: bgBase,
        border: `1px solid ${borderBase}`,
        boxShadow: `0 4px 20px ${glowBase}`,
        textAlign: 'left',
      }}
    >
      <span style={{ opacity: 0.65, marginRight: '0.6rem' }}>{icon}</span>
      {label}
    </button>
  );
}

function FeedbackBanner({ isCorrect, question }) {
  const bgColor    = isCorrect ? 'oklch(16% 0.04 145)' : 'oklch(14% 0.04 22)';
  const rimColor   = isCorrect ? 'oklch(42% 0.14 145 / 0.5)' : 'oklch(42% 0.18 22 / 0.5)';
  const labelColor = isCorrect ? 'var(--c-right)' : 'var(--c-wrong)';

  const embedSrc = `https://www.youtube-nocookie.com/embed/${question.youtubeId}?start=${question.timestamp}&autoplay=1&rel=0&modestbranding=1`;

  return (
    <div
      className="rounded-lg overflow-hidden text-center"
      style={{ background: bgColor, border: `1px solid ${rimColor}` }}
      role="alert"
    >
      {/* Text feedback */}
      <div className="px-5 pt-4 pb-3">
        <p
          className="font-display italic font-semibold"
          style={{ fontSize: '1.35rem', color: labelColor }}
        >
          {isCorrect ? '✓ Correct!' : '✗ Not quite'}
        </p>

        <p className="mt-1 font-body text-ink-dim" style={{ fontSize: '0.83rem', lineHeight: 1.55 }}>
          <span className="italic text-ink font-medium">"{question.song}"</span>
          {' '}by{' '}
          <span className="text-ink font-medium">{question.artist}</span>
          {' '}({question.year})
        </p>

        {!isCorrect && (
          <p className="mt-1 font-body text-ink-dim" style={{ fontSize: '0.76rem' }}>
            Category:{' '}
            <span
              className="font-medium"
              style={{ color: question.category === 'Worship' ? 'var(--c-worship)' : 'var(--c-love)' }}
            >
              {question.category}
            </span>
          </p>
        )}
      </div>

      {/* YouTube embed — 16:9, starts at the lyric's timestamp */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          key={question.youtubeId}
          src={embedSrc}
          title={`${question.song} by ${question.artist}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    </div>
  );
}

// ─── EndScreen ───────────────────────────────────────────────────────────────

function EndScreen({ score, total, onRestart }) {
  const pct = Math.round((score / total) * 100);

  const message =
    pct === 100 ? "Perfect score. You're uncanny." :
    pct >= 80   ? "Sharp ears. Well done." :
    pct >= 60   ? "Not bad — the lines blur for a reason." :
    pct >= 40   ? "The ambiguity got you. As intended." :
                  "Perhaps that's the whole point.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-16 text-center">
      <div className="max-w-xs mx-auto w-full">
        {/* Spinning ornament */}
        <div
          className="inline-block font-display text-gold-dim animate-spin-slow animate-fade-in"
          style={{ fontSize: '2.2rem' }}
          aria-hidden="true"
        >
          ✦
        </div>

        {/* Score */}
        <div className="mt-6 animate-fade-up delay-100">
          <p
            className="font-body text-ink-dim uppercase tracking-widest"
            style={{ fontSize: '0.65rem', letterSpacing: '0.28em' }}
          >
            Final Score
          </p>
          <div className="mt-2 font-display font-light leading-none">
            <span style={{ fontSize: 'clamp(5.5rem, 22vw, 8.5rem)', color: 'var(--c-gold)' }}>
              {score}
            </span>
            <span
              className="text-ink-dim"
              style={{ fontSize: 'clamp(1.8rem, 7vw, 2.8rem)' }}
            >
              /{total}
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="mt-8 animate-fade-up delay-200">
          <Ornament />
          <p
            className="mt-6 font-display italic text-ink leading-relaxed"
            style={{ fontSize: 'clamp(1.1rem, 4vw, 1.3rem)' }}
          >
            {message}
          </p>
        </div>

        {/* CTA block */}
        <div className="mt-10 space-y-3 animate-fade-up delay-300">
          <a
            href="#"
            className="flex items-center justify-center gap-2 w-full rounded-xl font-body font-semibold text-ink transition-all duration-250 hover:scale-[1.02] hover:brightness-110 active:scale-[0.97]"
            style={{
              padding: '1.25rem 1.5rem',
              fontSize: '0.92rem',
              lineHeight: 1.3,
              background: 'linear-gradient(135deg, oklch(20% 0.05 307) 0%, oklch(18% 0.05 15) 100%)',
              border: '1px solid oklch(38% 0.07 295 / 0.4)',
              boxShadow: '0 8px 32px oklch(0% 0 0 / 0.3), inset 0 1px 0 oklch(100% 0 0 / 0.04)',
            }}
          >
            <span>Get Tickets to</span>
            <span
              className="font-display italic font-semibold"
              style={{ fontSize: '1.05rem', color: 'var(--c-gold)' }}
            >
              Fear &amp; Wonder
            </span>
            <span>in NYC</span>
            <span className="text-gold opacity-60" aria-hidden="true">→</span>
          </a>

          <button
            onClick={onRestart}
            className="w-full font-body text-ink-dim transition-colors duration-200 hover:text-ink"
            style={{ padding: '0.75rem', fontSize: '0.78rem' }}
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Root App ────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen]               = useState('start');
  const [questions, setQuestions]         = useState(QUESTIONS);
  const [currentIndex, setCurrentIndex]   = useState(0);
  const [score, setScore]                 = useState(0);
  const [showAnswer, setShowAnswer]       = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const question = questions[currentIndex];

  function handleStart() {
    setQuestions(shuffle(QUESTIONS).slice(0, 10));
    setScreen('game');
  }

  function handleAnswer(category) {
    setSelectedAnswer(category);
    setShowAnswer(true);
    if (category === question.category) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentIndex === questions.length - 1) {
      setScreen('end');
    } else {
      setCurrentIndex((i) => i + 1);
      setShowAnswer(false);
      setSelectedAnswer(null);
    }
  }

  function handleRestart() {
    setScreen('start');
    setQuestions(QUESTIONS);
    setCurrentIndex(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
  }

  return (
    <div
      className="relative font-body"
      style={{ minHeight: '100svh', background: 'var(--c-void)', color: 'var(--c-ink)' }}
    >
      <Atmosphere />
      <Grain />

      <div className="relative z-10">
        {screen === 'start' && (
          <StartScreen onStart={handleStart} />
        )}

        {screen === 'game' && (
          <GameScreen
            key={currentIndex}
            question={question}
            index={currentIndex}
            total={questions.length}
            score={score}
            onAnswer={handleAnswer}
            showAnswer={showAnswer}
            selectedAnswer={selectedAnswer}
            onNext={handleNext}
          />
        )}

        {screen === 'end' && (
          <EndScreen
            score={score}
            total={questions.length}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}
