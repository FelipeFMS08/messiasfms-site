'use client';

import React, { useState, useEffect, useRef } from 'react';

const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// High-performance pseudorandom noise generator
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// 2D Noise based on bilinear filtering
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

// Fractional Brownian Motion (fbm) for premium smoke/liquid turbulence details 
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  vec2 shift = vec2(100.0);
  // Rotate to reduce axial bias in the noise
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; ++i) {
    v += a * noise(p);
    p = rot * p * 2.1 + shift;
    a *= 0.48;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  float time = u_time * 0.15;

  // 1. FLUTED GLASS LAYER normal mapping (Refraction & Highlights)
  // Angle is 45 degrees, frequency 14.5, refraction factor
  float angleRad = 45.0 * 3.14159265 / 180.0;
  vec2 fluteDir = vec2(cos(angleRad), sin(angleRad));
  
  // High-frequency sinusoidal wave for the fluted glass tubes
  float fluteCoord = dot(uv, fluteDir) * 28.0;
  float fluteProfile = sin(fluteCoord);
  float fluteDerivative = cos(fluteCoord);

  // Normal of the fluted glass surface
  vec3 glassNormal = normalize(vec3(fluteDerivative * 0.45 * fluteDir, 1.0));
  
  // Specular Highlight based on Light Angle -45 degrees
  vec3 lightDir = normalize(vec3(cos(-45.0 * 3.14159 / 180.0), sin(-45.0 * 3.14159 / 180.0), 0.6));
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  vec3 halfDir = normalize(lightDir + viewDir);
  float spec = pow(max(dot(glassNormal, halfDir), 0.0), 45.0) * 0.12;

  // Refract UV coordinates using the glass surface normal
  vec2 refractedUV = p + glassNormal.xy * 0.18;

  // 2. SWIRL & TURBULENT LIQUID FLOW (ChromaFlow)
  // Swirl factor
  float r = length(refractedUV);
  float theta = atan(refractedUV.y, refractedUV.x);
  
  // Swirling displacement calculation
  float swirlAmount = 1.35;
  float swirlFactor = swirlAmount * (1.0 / (r + 0.45));
  theta += sin(r * 2.5 - time) * swirlFactor;
  
  // Convert back to cartesian for swirling coordinate lookup
  vec2 swirlUV = vec2(cos(theta), sin(theta)) * r;
  
  // Turbulent noise coordinates
  vec2 noiseUV = swirlUV * 1.3 - vec2(time * 0.4, time * 0.25);
  
  // Layer multiple turbulences to form ChromaFlow gradient paths
  float t1 = fbm(noiseUV);
  float t2 = fbm(noiseUV + vec2(1.8, 3.2) + sin(time * 0.6) * 0.25);
  float t3 = fbm(noiseUV - vec2(4.1, 2.7) + cos(time * 0.4) * 0.2);

  // 3. CHROMATIC PALETTE MAPPING
  // Color palette matching: Crimson luxury, scarlet vivid, burgundy dark, slate core, and background off-black
  vec3 baseColor = vec3(0.035, 0.035, 0.043);    // #09090b (Off-Black background base)
  vec3 deepCrimson = vec3(0.38, 0.05, 0.05);     // #991b1b
  vec3 vividScarlet = vec3(0.86, 0.11, 0.11);    // #dc2626
  vec3 darkBurgundy = vec3(0.18, 0.02, 0.02);    // #450a0a
  vec3 slateCore    = vec3(0.18, 0.21, 0.27);    // #334155

  // Mix and blend liquid paths dynamically
  vec3 fluidCol = baseColor;
  fluidCol = mix(fluidCol, deepCrimson, t1 * 1.3);
  fluidCol = mix(fluidCol, vividScarlet, t2 * 0.85);
  fluidCol = mix(fluidCol, darkBurgundy, t3 * 0.95);
  fluidCol = mix(fluidCol, slateCore, clamp(t1 * t2 * 2.1 - 0.1, 0.0, 1.0));

  // Add a very subtle dark vignette in fluid space
  fluidCol *= (1.0 - r * 0.18);

  // 4. COMBINE SHADERS + FLUTED REFRACTION HIGHLIGHTS
  vec3 finalColor = fluidCol + vec3(spec);

  // 5. CINEMATIC FILM GRAIN LAYER (Strength 0.04)
  float grainRandom = hash(uv + vec2(u_time * 12.33, u_time * 84.19));
  finalColor += (vec3(grainRandom) - 0.5) * 0.045;

  // Secure deep dynamic range contrast curve
  finalColor = pow(finalColor, vec3(0.92));

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

export default function HeroBackground() {
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMount = () => {
      setMounted(true);
    };
    requestAnimationFrame(handleMount);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', { 
      alpha: false, 
      depth: false, 
      antialias: true, 
      premultipliedAlpha: false 
    });
    if (!gl) {
      console.warn('WebGL is not supported in this browser, using fallback layer.');
      return;
    }

    // Compile Helper
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compiler error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Linker error:', gl.getProgramInfoLog(program));
      return;
    }

    // Set up viewport positioning buffer
    const vertices = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(program);

    // Uniform locations lookup
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');

    let currentMouse = [0.0, 0.0];
    const handleMouseMove = (e: MouseEvent) => {
      currentMouse = [e.clientX / window.innerWidth, 1.0 - (e.clientY / window.innerHeight)];
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Dynamic resize handler using standard API
    const resize = () => {
      const width = canvas.parentElement?.clientWidth || window.innerWidth;
      const height = canvas.parentElement?.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolutionLoc, width, height);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    let animationFrameId: number;
    let startTime = performance.now();

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000.0;

      gl.useProgram(program);
      gl.uniform1f(timeLoc, elapsed);
      gl.uniform2f(mouseLoc, currentMouse[0], currentMouse[1]);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      gl.deleteBuffer(vertexBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [mounted]);

  // Return elegant fallback container under Server rendering
  if (!mounted) {
    return <div className="absolute inset-0 bg-[#09090b] z-0" />;
  }

  return (
    <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" id="hero-shader-bg">
      <div className="absolute inset-0 bg-[#09090b] z-0" />
      <div className="absolute inset-0 z-5">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full block"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      {/* Exquisite layered smooth dark vignette on top of the shader */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/10 to-[#09090b] z-10" />
    </div>
  );
}
