"use client";

import { useEffect, useRef } from "react";

export default function MandelbulbBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    // Always visible fallback so we never end up with "nothing"
    const drawFallback = (label: string) => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      canvas.width = w;
      canvas.height = h;

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, "rgba(16,44,78,0.14)");
      grad.addColorStop(1, "rgba(198,168,106,0.10)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // small diagnostic text (remove later)
      ctx.fillStyle = "rgba(16,44,78,0.35)";
      ctx.font = "12px system-ui, -apple-system, Segoe UI, Roboto, Arial";
      ctx.fillText(label, 12, 20);
    };

    // Ensure canvas has size
    const resize2d = () => drawFallback("Mandelbulb fallback (resized)");
    const ro = new ResizeObserver(resize2d);
    ro.observe(canvas);
    resize2d();

    try {
      // Try WebGL2
      const gl = canvas.getContext("webgl2", { alpha: true, antialias: false });
      if (!gl) {
        console.warn("WebGL2 not available -> using 2D fallback");
        drawFallback("No WebGL2 (fallback)");
        return () => ro.disconnect();
      }

      // If we got WebGL2, paint something obvious FIRST (to prove it works)
      gl.clearColor(1.0, 0.0, 0.0, 0.18); // faint red
      gl.clear(gl.COLOR_BUFFER_BIT);

      // If you see a faint red overlay now, WebGL2 is OK.
      // Next step: we’ll re-introduce the shader after confirming.
      console.log("WebGL2 OK: context created");

      return () => {
        ro.disconnect();
      };
    } catch (e) {
      console.warn("WebGL init failed -> fallback", e);
      drawFallback("WebGL init error (fallback)");
      return () => ro.disconnect();
    }
  }, []);

  return (
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
  );
}
