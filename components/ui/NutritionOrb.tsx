"use client";

import { useEffect, useRef } from "react";

export default function NutritionOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = 400);
    let height = (canvas.height = 400);

    // Responsive scaling
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.clientWidth;
        height = canvas.height = parent.clientHeight || parent.clientWidth;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      mouseRef.current.targetX = x * 0.05;
      mouseRef.current.targetY = y * 0.05;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Particle class representing dots on a 3D sphere surface
    class Particle {
      theta: number; // angle around Z axis
      phi: number;   // angle from Z axis
      r: number;     // sphere radius
      size: number;
      color: string;

      constructor() {
        this.theta = Math.random() * Math.PI * 2;
        this.phi = Math.acos(Math.random() * 2 - 1);
        this.r = 120 + Math.random() * 10;
        this.size = Math.random() * 2 + 1;
        // Subtle gold-wheat particle colors
        this.color = Math.random() > 0.5 ? "rgba(201,162,75,0.7)" : "rgba(221,185,106,0.5)";
      }

      draw(rotationX: number, rotationY: number) {
        // Spherical to 3D Cartesian coordinates
        const x3d = this.r * Math.sin(this.phi) * Math.cos(this.theta);
        const y3d = this.r * Math.sin(this.phi) * Math.sin(this.theta);
        const z3d = this.r * Math.cos(this.phi);

        // Apply 3D Rotations (around X and Y axes)
        // Rotate around Y axis
        let x1 = x3d * Math.cos(rotationY) - z3d * Math.sin(rotationY);
        let z1 = x3d * Math.sin(rotationY) + z3d * Math.cos(rotationY);

        // Rotate around X axis
        let y2 = y3d * Math.cos(rotationX) - z1 * Math.sin(rotationX);
        let z2 = y3d * Math.sin(rotationX) + z1 * Math.cos(rotationX);

        // Perspective projection parameters
        const fov = 400;
        const scale = fov / (fov + z2);
        const x2d = width / 2 + x1 * scale;
        const y2d = height / 2 + y2 * scale;

        // Render point if it projects onto canvas
        if (z2 > -fov) {
          ctx!.beginPath();
          ctx!.arc(x2d, y2d, this.size * scale, 0, Math.PI * 2);
          ctx!.fillStyle = this.color;
          ctx!.shadowColor = "rgba(201,162,75,0.4)";
          ctx!.shadowBlur = 10;
          ctx!.fill();
        }
      }

      update() {
        // Slow particle movement/orbit
        this.theta += 0.001;
      }
    }

    const particles: Particle[] = Array.from({ length: 280 }, () => new Particle());
    let rotX = 0;
    let rotY = 0;

    // Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Damp mouse tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Base auto rotation + mouse offset
      rotX += 0.002 + mouse.y * 0.001;
      rotY += 0.003 + mouse.x * 0.001;

      // Render glowing center orb radial gradient (VisionOS glass look)
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        140
      );
      grad.addColorStop(0, "rgba(240,234,224,0.15)"); // warm cream
      grad.addColorStop(0.5, "rgba(201,162,75,0.06)"); // gold glow
      grad.addColorStop(1, "rgba(43,33,24,0.02)"); // shadow edge
      
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 130, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.shadowBlur = 0;
      ctx.fill();

      // Render outer thin glass ring
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 130, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(201,162,75,0.15)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw all sphere particles
      particles.forEach((p) => {
        p.update();
        p.draw(rotX, rotY);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <canvas ref={canvasRef} className="max-w-full max-h-full pointer-events-none" />
      {/* Background glowing halo */}
      <div className="absolute w-[260px] h-[260px] rounded-full bg-gold/5 blur-[40px] pointer-events-none -z-10" />
    </div>
  );
}
