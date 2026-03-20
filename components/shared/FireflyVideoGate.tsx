"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

/** Primary: `public/assets/video/hero.mp4`. Fallback: `public/assets/videos/hero.mp4`. */
const VIDEO_SOURCES = ["/assets/video/hero.mp4", "/assets/videos/hero.mp4"] as const;

const STORAGE_KEY = "firefly-video-revealed";
const AGE_KEY = "firefly-age-verified";
const VERIFIED_EVENT = "firefly-age-verified";

/** `true` = show the video gate on every reload. Set `false` to skip after first reveal per tab (sessionStorage). */
const SHOW_VIDEO_GATE_EVERY_RELOAD = true;

const ease = [0.16, 1, 0.3, 1] as const;

export default function FireflyVideoGate() {
  const [ageOk, setAgeOk] = useState(false);
  const [skipDueToSession, setSkipDueToSession] = useState(false);
  const [phase, setPhase] = useState<"idle" | "playing" | "exiting" | "done">(
    "idle"
  );
  const [videoBroken, setVideoBroken] = useState(false);

  const progressMV = useMotionValue(0);
  const y = useTransform(progressMV, (v) => `${-Math.min(1, v) * 100}%`);
  const hintOpacity = useTransform(
    progressMV,
    [0, 0.25, 0.75, 1],
    [1, 0.85, 0.25, 0]
  );

  const phaseRef = useRef(phase);
  const accumRef = useRef(0);
  const touchYRef = useRef<number | null>(null);
  const completeOnceRef = useRef(false);
  const finalizedRef = useRef(false);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    try {
      if (localStorage.getItem(AGE_KEY)) {
        setAgeOk(true);
        return;
      }
    } catch {
      setAgeOk(true);
      return;
    }
    const onV = () => setAgeOk(true);
    window.addEventListener(VERIFIED_EVENT, onV);
    return () => window.removeEventListener(VERIFIED_EVENT, onV);
  }, []);

  useEffect(() => {
    if (!ageOk) return;
    if (!SHOW_VIDEO_GATE_EVERY_RELOAD) {
      try {
        if (sessionStorage.getItem(STORAGE_KEY)) {
          setSkipDueToSession(true);
          setPhase("done");
          return;
        }
      } catch {
        /* fall through */
      }
    }
    progressMV.set(0);
    accumRef.current = 0;
    completeOnceRef.current = false;
    finalizedRef.current = false;
    setPhase("playing");
  }, [ageOk]);

  const finalize = useCallback(() => {
    if (finalizedRef.current) return;
    finalizedRef.current = true;
    if (!SHOW_VIDEO_GATE_EVERY_RELOAD) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }
    setPhase("done");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  const complete = useCallback(() => {
    if (phaseRef.current !== "playing" || completeOnceRef.current) return;
    completeOnceRef.current = true;
    setPhase("exiting");

    const start = progressMV.get();
    const dur = start >= 0.995 ? 0 : Math.max(0.28, 0.52 * (1 - start));

    animate(progressMV, 1, { duration: dur, ease })
      .then(() => finalize())
      .catch(() => finalize());
  }, [finalize, progressMV]);

  useEffect(() => {
    const locked = ageOk && (phase === "playing" || phase === "exiting");
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [ageOk, phase]);

  useEffect(() => {
    if (!ageOk || skipDueToSession || phase !== "playing") return;

    const max = () => Math.max(480, window.innerHeight * 0.75);

    const applyDelta = (dy: number) => {
      if (phaseRef.current !== "playing") return;
      accumRef.current += dy;
      const p = Math.min(1, Math.max(0, accumRef.current / max()));
      progressMV.set(p);
      if (p >= 1) complete();
    };

    const onWheel = (e: WheelEvent) => {
      if (phaseRef.current !== "playing") return;
      e.preventDefault();
      const dy = e.deltaY * 0.85;
      if (dy > 0) applyDelta(dy);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (phaseRef.current !== "playing" || touchYRef.current == null) return;
      const y0 = e.touches[0]?.clientY;
      if (y0 == null) return;
      const dy = touchYRef.current - y0;
      touchYRef.current = y0;
      if (dy > 0) applyDelta(dy * 1.2);
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (phaseRef.current !== "playing") return;
      if (
        e.key === "ArrowDown" ||
        e.key === "PageDown" ||
        e.key === " " ||
        e.key === "Enter"
      ) {
        e.preventDefault();
        applyDelta(120);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [ageOk, skipDueToSession, phase, complete]);

  const skipIntro = useCallback(() => {
    accumRef.current = 1e9;
    progressMV.set(1);
    completeOnceRef.current = false;
    complete();
  }, [complete, progressMV]);

  useEffect(() => {
    if (!ageOk || skipDueToSession) return;
    if (phase !== "playing") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) return;
    if (!SHOW_VIDEO_GATE_EVERY_RELOAD) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    }
    finalizedRef.current = true;
    setPhase("done");
  }, [ageOk, skipDueToSession, phase]);

  if (!ageOk || phase === "done") return null;

  const letters = "Firefly".split("");

  return (
    <motion.div
      className="fixed inset-0 z-[160] flex flex-col bg-midnight"
      style={{
        y,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      {!videoBroken ? (
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover [transform:translateZ(0)]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/images/hero-featured.jpg"
          aria-hidden
          onError={() => setVideoBroken(true)}
        >
          {VIDEO_SOURCES.map((src) => (
            <source key={src} src={src} type="video/mp4" />
          ))}
        </video>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center [transform:translateZ(0)]"
          style={{
            backgroundImage: "url(/assets/images/hero-featured.jpg)",
            opacity: 0.55,
          }}
          aria-hidden
        />
      )}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-midnight/50 via-midnight/35 to-midnight/75"
        aria-hidden
      />

      <div className="relative z-[1] flex flex-1 flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-wrap justify-center gap-[0.03em] font-display text-4xl font-bold tracking-tight text-parchment sm:text-6xl md:text-7xl lg:text-8xl [text-shadow:0_2px_24px_rgba(0,0,0,0.55)]">
            {letters.map((ch, i) => (
              <motion.span
                key={`${ch}-${i}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.12 + i * 0.06,
                  duration: 0.5,
                  ease,
                }}
                className="inline-block will-change-[opacity,transform]"
              >
                {ch}
              </motion.span>
            ))}
          </div>
          <motion.p
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.42em] text-parchment/90 sm:text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.45, ease }}
          >
            Organics
          </motion.p>
        </div>

        <motion.p
          className="pointer-events-none absolute bottom-10 left-0 right-0 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-parchment/55"
          style={{ opacity: hintOpacity }}
        >
          Scroll to enter
        </motion.p>

        <button
          type="button"
          className="absolute right-5 top-5 z-10 font-mono text-[10px] uppercase tracking-[0.2em] text-parchment/50 underline-offset-4 transition-colors hover:text-parchment"
          onClick={skipIntro}
        >
          Skip
        </button>
      </div>
    </motion.div>
  );
}
