"use client";

import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

varying vec2 v_uv;
uniform vec2 u_res;
uniform float u_time;

float saturate(float x){ return clamp(x, 0.0, 1.0); }
vec3  saturate(vec3 x){ return clamp(x, 0.0, 1.0); }

vec2 rot(vec2 p, float a){
  float s = sin(a), c = cos(a);
  return vec2(c*p.x - s*p.y, s*p.x + c*p.y);
}

void main() {
  // uv -> -1..1 with aspect correction
  vec2 p = v_uv * 2.0 - 1.0;
  p.x *= u_res.x / max(u_res.y, 1.0);

  float ttime = u_time * 0.18;

  // subtle domain warp (adds "more fractals" feel)
  p = rot(p, 0.10 * sin(ttime * 0.7));
  p += 0.045 * vec2(
    sin(p.y * 3.8 + ttime * 1.3),
    cos(p.x * 3.6 - ttime * 1.1)
  );

  // zoom
  float zoom = 1.18;
  vec2 z = p / zoom;

  // animated Julia parameter (stable / pretty region)
  vec2 c = vec2(
    -0.745 + 0.040*cos(ttime*0.9),
     0.120 + 0.050*sin(ttime*1.1)
  );

  float iter = 0.0;
  float trapR2 = 1e9; // radius trap -> white crystal highlights
  float trapXY = 1e9; // |x*y| trap -> gold filaments
  float trapL1 = 1e9; // |x|+|y| trap -> extra structure

  const int MAX_IT = 360;

  for (int i = 0; i < MAX_IT; i++) {
    // z = z^2 + c
    z = vec2(z.x*z.x - z.y*z.y, 2.0*z.x*z.y) + c;

    float r2 = dot(z, z);
    trapR2 = min(trapR2, r2);
    trapXY = min(trapXY, abs(z.x * z.y));
    trapL1 = min(trapL1, abs(z.x) + abs(z.y));

    if (r2 > 16.0) { iter = float(i); break; }
  }

  // smooth iteration count (nice gradients)
  float mu = iter;
  float r2 = dot(z, z);
  if (r2 > 0.0) {
    mu = mu - log2(log2(max(r2, 1.0001)));
  }
  float t = saturate(mu / float(MAX_IT));
  t = pow(t, 0.85); // bias toward blues/whites

  // --- Brand palette only: blue / white / gold (NO neon palette) ---
  vec3 DEEP_BLUE  = vec3(0.03, 0.10, 0.22);
  vec3 MID_BLUE   = vec3(0.08, 0.30, 0.55);
  vec3 LIGHT_BLUE = vec3(0.80, 0.92, 1.00);
  vec3 WHITE      = vec3(0.99, 0.995, 1.00);
  vec3 GOLD       = vec3(0.86, 0.73, 0.33);

  // base gradient: deep -> mid -> light -> white
  vec3 base = mix(DEEP_BLUE, MID_BLUE, smoothstep(0.05, 0.60, t));
  base = mix(base, LIGHT_BLUE, smoothstep(0.35, 0.95, t));
  base = mix(base, WHITE,      smoothstep(0.70, 1.00, t));

  // orbit trap glows (tuned to avoid giant solid-white blobs)
  float whiteGlow = exp(-2.2 * trapR2);   // smaller / sharper
  float goldGlow  = exp(-10.0 * trapXY);  // filament highlight
  float blueGlow  = exp(-2.2 * trapL1);   // secondary structure

  // add structure: deepen blues in the interior
  vec3 col = base;
  col = mix(col, DEEP_BLUE, 0.35 * (1.0 - t) + 0.20 * blueGlow);

  // gold accents (filaments + subtle banding from t)
  float goldMask = 0.25 * smoothstep(0.15, 0.95, t) + 0.65 * goldGlow;
  col = mix(col, GOLD, saturate(goldMask));

  // white crystalline highlights (cap so it doesn't wash out)
  col = mix(col, WHITE, 0.55 * whiteGlow);

  // tiny sparkle (kept small)
  col += (WHITE * 0.06 + GOLD * 0.06) * whiteGlow;
  col += GOLD * 0.10 * goldGlow;

  // final contrast curve
  col = pow(saturate(col), vec3(0.92));

  gl_FragColor = vec4(saturate(col), 1.0);
}
`;

export default function FractalBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
    });

    if (!gl) {
      console.warn("WebGL not available");
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) throw new Error("createShader failed");
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        const msg = gl.getShaderInfoLog(s);
        gl.deleteShader(s);
        throw new Error(msg || "shader compile failed");
      }
      return s;
    };

    let program: WebGLProgram | null = null;
    let buf: WebGLBuffer | null = null;
    let raf = 0;

    try {
      const vs = compile(gl.VERTEX_SHADER, VERT);
      const fs = compile(gl.FRAGMENT_SHADER, FRAG);

      program = gl.createProgram();
      if (!program) throw new Error("createProgram failed");

      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "program link failed");
      }

      gl.useProgram(program);

      // fullscreen quad
      buf = gl.createBuffer();
      if (!buf) throw new Error("createBuffer failed");
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const aPos = gl.getAttribLocation(program, "a_pos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const uRes = gl.getUniformLocation(program, "u_res");
      const uTime = gl.getUniformLocation(program, "u_time");

      const resize = () => {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const w = Math.max(1, Math.floor(window.innerWidth * dpr));
        const h = Math.max(1, Math.floor(window.innerHeight * dpr));
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        if (uRes) gl.uniform2f(uRes, w, h);
      };

      window.addEventListener("resize", resize);
      resize();

      const start = performance.now();
      const frame = () => {
        const now = performance.now();
        if (uTime) gl.uniform1f(uTime, (now - start) * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        raf = requestAnimationFrame(frame);
      };

      raf = requestAnimationFrame(frame);

      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(raf);
        if (buf) gl.deleteBuffer(buf);
        if (program) gl.deleteProgram(program);
      };
    } catch (e) {
      console.warn("FractalBackground failed:", e);
      if (raf) cancelAnimationFrame(raf);
      if (buf) gl.deleteBuffer(buf);
      if (program) gl.deleteProgram(program);
    }
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,

        // keep it clean while testing (avoid oversaturation)
        opacity: 1,
        filter: "contrast(1.05) saturate(1.05)",
      }}
    />
  );
}
