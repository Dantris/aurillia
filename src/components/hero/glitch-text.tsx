"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

type GlitchTextProps = {
  text?: string;
  delay?: number;
  className?: string;
};

export default function GlitchText({
  text = "",
  delay = 0,
  className,
}: GlitchTextProps) {
  const [displayed, setDisplayed] = useState(text);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterRef = useRef(0);

  const clearRunningInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const scramble = useCallback(() => {
    iterRef.current = 0;
    clearRunningInterval();

    intervalRef.current = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iterRef.current) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iterRef.current += 0.35;

      if (iterRef.current >= text.length) {
        clearRunningInterval();
        setDisplayed(text);
      }
    }, 30);
  }, [text]);

  useEffect(() => {
    setDisplayed(text);

    const timeout = setTimeout(() => {
      scramble();
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearRunningInterval();
    };
  }, [text, delay, scramble]);

  return (
    <span
      onMouseEnter={scramble}
      className={className}
      style={{ cursor: "default", display: "inline-block" }}
    >
      {displayed}
    </span>
  );
}