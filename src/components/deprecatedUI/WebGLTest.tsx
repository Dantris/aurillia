"use client";

import { useEffect, useRef, useState } from "react";

export default function WebGLPureTest() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [status, setStatus] = useState("initializing…");

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: false });

    console.log("PURE WebGL context:", gl);

    if (!gl) {
      setStatus("❌ webgl context null");
      return;
    }

    setStatus("✅ webgl context OK");

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Paint a very obvious color
    gl.clearColor(0.0, 0.4, 1.0, 0.35);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return () => ro.disconnect();
  }, []);

  return (
    <>
      <canvas
        ref={ref}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 12,
          top: 12,
          zIndex: 2,
          fontSize: 12,
          padding: "6px 10px",
          borderRadius: 10,
          background: "rgba(255,255,255,0.75)",
          border: "1px solid rgba(0,0,0,0.08)",
          color: "#102C4E",
          pointerEvents: "none",
        }}
      >
        {status}
      </div>
    </>
  );
}
