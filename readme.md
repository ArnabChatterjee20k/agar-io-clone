### About
Just a normal 2d shooting game for exploring canvas and server driven events and real challenges of realtime(inspired by a video from youtube)

Using gsap for animation -> as it provides more granular control over the values and not dom focused like framer motion

# Modes

### From Canvas side(Single Player mode)
[x] Creating players

[x] Shoot Projectiles

[x] Creating enemies

[x] Detect Collsion on enemy/projectile hit
 
[x] Detect Collsion on enemy/player hit

[x] Adding colorizing to the objects

[x] Shrinking enemy size on hits

[x] Creating particle effects on hit

[x] Adding effect for projectile for shooting with projectile motion. The more we held the mouse the more distance or motion it gonna travel like archer games

[] Adding showing trajectory to see the shooting position

### Multiplayer
[] Creating multiple players

[] Lobby

[] Showing each player scores

### How fillRect is working and giving the fading effect
Does fillRect Apply to Previous Frames or the Whole Canvas?
fillRect(0, 0, width, height) applies to the whole canvas, not just the previous frames.

However, since it uses a semi-transparent color (rgba(255,255,255,0.1)), it affects the previous frames indirectly by gradually covering them instead of instantly erasing them.

How It Works in Each Frame?
Suppose we want to paint a whitish layer
Every time render() runs:
1. The canvas paints a semi-transparent white layer (fillRect).

2. This slightly brightens the entire canvas, including past drawings.

3. New objects are drawn on top.

4. Over time, older objects fade into the background because they get layered with more white overlays.

