"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// --- SHADER DEFINITIONS ---

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform float uScrollProgress;
uniform vec3 uColorCream;
uniform vec3 uColorGold;
uniform vec2 uResolution;

varying vec2 vUv;

// --- Simplex Noise 3D ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - 0.5;

  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 105.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

// --- FBM for organic "Cloud/Ink" texture ---
float fbm(vec3 x) {
  float v = 0.0;
  float a = 0.5;
  vec3 shift = vec3(100.0);
  for (int i = 0; i < 5; ++i) { 
    v += a * snoise(x);
    x = x * 2.0 + shift;
    a *= 0.5;
  }
  return v;
}

void main() {
  if (uScrollProgress < 0.001) discard;

  vec2 uv = vUv;
  vec2 aspectUv = uv;
  aspectUv.x *= uResolution.x / uResolution.y;
  vec2 center = vec2(0.5 * (uResolution.x / uResolution.y), 0.5);

  // --- Displacement / Domain Warping ---
  // We distort the UVs used for the distance check to create "fingers"
  float warp = fbm(vec3(aspectUv * 3.0, uTime * 0.2));
  vec2 distortedUv = aspectUv + warp * 0.1;

  // --- SDF Logic ---
  float dist = distance(distortedUv, center);
  
  // Noise mask that feels like Luma Matte
  // High contrast noise
  float noiseMap = fbm(vec3(aspectUv * 6.0, uTime * 0.1));
  
  // Combine Distance + Noise
  // Expansion Logic: 
  // We want the 'blob' to grow. 
  // 'Threshold' increases with Scroll.
  // Pixels with (Dist + Noise) < Threshold become visible.
  
  // Map Scroll (0-1) to Threshold (0-2.0 to cover corners)
  float threshold = uScrollProgress * 2.5;
  
  // Calculate value for this pixel
  // 'dist' helps keep it centered. 'noiseMap' adds the ink texture.
  float pixelValue = dist + (noiseMap * 0.3); // Adjust strength of distortion
  
  // Edge sharpness
  // Reveal: 1.0 (Cream) when pixelValue < threshold
  // smoothstep for anti-aliasing but relatively sharp for Ink look
  float alpha = 1.0 - smoothstep(threshold - 0.1, threshold, pixelValue);
  
  // --- Edge Coloring (Gold Accents) ---
  // The 'rim' of the expansion can be Gold.
  // Rim is where pixelValue is close to threshold.
  float rim = smoothstep(threshold - 0.2, threshold - 0.05, pixelValue) * alpha;
  
  // Base Color = Cream
  vec3 color = uColorCream;
  
  // Mix Gold on the rim
  // Add some sparkly noise to the gold rim
  float sparkle = snoise(vec3(uv * 20.0, uTime * 1.0));
  if (sparkle > 0.5) rim *= 1.2; // shimmer
  
  color = mix(color, uColorGold, rim * 0.8);

  // Output
  vec4 finalColor = vec4(color, alpha);
  
  if (alpha < 0.01) discard;
  
  gl_FragColor = finalColor;
}
`;

// --- COMPONENT LOGIC ---

function TransitionPlane() {
    const { viewport } = useThree();
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();

            // Native Scroll Sync
            // Hero Section is pinned for 300vh (approx).
            // We want the liquid to start appearing only towards the end of the Hero scroll.
            // Let's start the transition around 2.5vh and finish by 3.5vh.
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            const startThreshold = windowHeight * 1.0;
            const endThreshold = windowHeight * 1.5;

            // Progress = 0 until 1.5vh, then interpolates to 1 at 2.0vh
            const progress = Math.min(Math.max((scrollY - startThreshold) / (endThreshold - startThreshold), 0), 1);

            materialRef.current.uniforms.uScrollProgress.value = progress;
        }
    });

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uScrollProgress: { value: 0 },
            uColorCream: { value: new THREE.Color("#F9F8F4") }, // Cream
            uColorGold: { value: new THREE.Color("#C5A368") },  // Gold
            uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
        }),
        [viewport]
    );

    return (
        <mesh>
            <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthTest={false}
                depthWrite={false}
            />
        </mesh>
    );
}

// --- MAIN LAYOUT ---

export default function LiquidTransition() {
    return (
        // Fixed Overlay - Z-Index 30: Above Hero background/canvas (z-0/z-20), Hidden by About (z-40)
        <div className="hidden md:block fixed inset-0 w-full h-screen z-30 pointer-events-none">
            <Canvas className="w-full h-full bg-transparent">
                <TransitionPlane />
            </Canvas>
        </div>
    );
}
