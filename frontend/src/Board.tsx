import { useEffect, useRef, useState } from "react";
import { Circle, FocusBar, Particle, Projectile } from "./core";
import { checkCollision, getVelocity } from "./utils";
import { gsap } from "gsap";

const width = window.innerWidth;
const height = window.innerHeight;
const player = new Circle(width / 2, height / 2, 30, "white");
export default function Board() {
  const [projectiles, setProjectiles] = useState<Projectile[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [focus, setFocus] = useState(0);
  const focusBar = new FocusBar(0, 0, 100, 20, 20, focus);
  // should come from the server
  const [enemies, setEnemies] = useState<Projectile[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  function getContext() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    return context;
  }

  // players and projectiles rendering
  useEffect(() => {
    const context = getContext()!;
    let animationId: number;
    let intervalId: number;
    const render = () => {
      // context.clearRect(0, 0, width, height);
      // instead of clearing out the layers
      // apply a semi transparent
      context.fillStyle = "rgba(0,0,0,0.1)";
      context.fillRect(0, 0, width, height);
      player.draw(context);
      projectiles.forEach((projectile) => {
        projectile.update();
        projectile.draw(context);
      });
      enemies.forEach((enemy, enemyIndex) => {
        enemy.update();
        enemy.draw(context);
        if (checkCollision(player, enemy)) {
          cancelAnimationFrame(animationId);
          setEnemies([]);
          setProjectiles([]);
          setParticles([]);
        }
        // check collision
        projectiles.forEach((projectile, projectileIndex) => {
          if (checkCollision(projectile, enemy)) {
            setTimeout(() => {
              setProjectiles((prev) =>
                prev.filter((_, i) => i !== projectileIndex)
              );
              // enemy handling
              const newRadius = enemy.radius - 10;
              if (newRadius < 15) {
                // removing the enemy
                setEnemies((prev) => prev.filter((_, i) => i !== enemyIndex));
              } else {
                // Animate the radius reduction
                gsap.to(enemy, {
                  radius: newRadius,
                  duration: 0.3,
                  ease: "expo.out(1, 0.3)",
                });
              }

              setParticles((prev) => [
                ...prev.filter((particle) => particle.alpha > 0),
                ...Array.from({ length: enemy.radius }).map(() => {
                  const radius = Math.random() * 4;
                  return new Particle(enemy.x, enemy.y, radius, enemy.color, {
                    x: (Math.random() - 0.5) * radius * 2,
                    y: (Math.random() - 0.5) * radius * 2,
                  });
                }),
              ]);
            }, 0);
          }
        });
      });
      particles.forEach((particle) => {
        particle.update();
        particle.draw(context);
      });
      focusBar.draw(context);
      focusBar.update(focus);
      animationId = requestAnimationFrame(render);
    };
    const spawnEnemies = () => {
      const radius = Math.random() * 20 + 10; // Enemies will be between 10-30 radius

      // Spawn enemies just outside the screen
      const edge = Math.floor(Math.random() * 4);
      let x: number, y: number;

      if (edge === 0) {
        // Left
        x = -radius;
        y = Math.random() * height;
      } else if (edge === 1) {
        // Right
        x = width + radius;
        y = Math.random() * height;
      } else if (edge === 2) {
        // Top
        x = Math.random() * width;
        y = -radius;
      } else {
        // Bottom
        x = Math.random() * width;
        y = height + radius;
      }
      // randomising color using hsl which takes 0 to 360 in hue
      const hue = Math.random() * 360;
      const color = `hsl(${hue},50%,50%)`;
      const velocity = getVelocity(player.y - y, player.x - x);
      const enemy = new Projectile(x, y, radius, color, velocity);

      setEnemies((prev) => [...prev, enemy]);
    };

    intervalId = setInterval(spawnEnemies, 1000);

    render();
    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(intervalId);
    };
  }, [projectiles, enemies, particles]);

  useEffect(() => {
    function shoot(e: MouseEvent, prevFocus: number) {
      const { clientX, clientY } = e;
      const velocity = getVelocity(clientY - player.y, clientX - player.x, 4);
      const projectile = new Projectile(
        player.x,
        player.y,
        5,
        player.color,
        velocity,
        prevFocus,
        true
      );

      setProjectiles((prev) => {
        return [...prev, projectile];
      });
    }
    let focusIntervalId: number;
    function chargeFocus(e: MouseEvent) {
      if (focusIntervalId) clearInterval(focusIntervalId);
      focusIntervalId = setInterval(() => {
        setFocus((prev) => Math.min(prev + 0.5, 20));
      }, 100);
    }
    function releaseFocus(e: MouseEvent) {
      clearInterval(focusIntervalId);
      setFocus((prevFocus) => {
        shoot(e, prevFocus);
        return 0;
      });
    }
    // document.addEventListener("click", shoot);
    document.addEventListener("mousedown", chargeFocus);
    document.addEventListener("mouseup", releaseFocus);
    return () => {
      document.removeEventListener("mousedown", chargeFocus);
      document.removeEventListener("mouseup", releaseFocus);
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
}
