# Phaser migration — top-down and platformer

The following 2D games use vendored **Phaser 3.90.0**:

- `first-shift`: Ca đầu tiên của tôi.
- `mentor`: Theo chân người kèm cặp.
- `locker-walk`: Một vòng khu sinh hoạt.
- `platform`: Bậc thang đầu ca.

The other twelve games retain their flat Three.js renderer. The shell imports only the selected engine entry point. Phaser pages do not load Three.js. This is a buildless static site and works under the GitHub Pages repository path without a CDN dependency at runtime.

## Implementation

- `games/phaser/world.js` manages the Phaser game, scene, responsive camera, native sprite/zone input, drag/drop, accessible focus targets and cleanup. It requires WebGL and fails closed on graphics errors; there is no text fallback.
- `games/phaser/navigation.js` preserves the existing source-based tasks, path finding, building obstacles, arrival checks and touch direction controls. Map coordinates are fictional and are not real mine routes.
- `games/phaser/platform.js` uses Phaser Arcade Physics for gravity, landing, collisions and jumping. Touch and keyboard controls share the same input state. The optional travel assist moves the player to a selected platform without revealing the correct answer or awarding progress.
- `games/shared/artwork.js` draws the shared flat illustrations into textures. Phaser caches each artwork variant for the life of the game rather than rebuilding its texture on each task redraw. Canvas is an asset-generation tool, not an alternate gameplay renderer.

The six levels per game, first-clear rewards, five-coin hints, timers, safety feedback and `md-campaign-v1` storage keys are unchanged. Existing progress remains available on the same Pages origin. Source facts and references come from the existing content/mission plans; the engine migration adds no safety procedure.

All graphics remain 2D. The project does not claim a measured performance improvement over Three.js: engine download size, frame stability, battery use and memory still depend on assets and device. Phaser is loaded only when one of these four games is played.

## Validation

```sh
node MD_game/tests/phaser.mjs
node MD_game/tests/three.mjs
node MD_game/tests/campaign.mjs
node MD_game/tests/arcade.mjs
node MD_game/tests/catalog.mjs
node MD_game/tests/browser-arcade.mjs http://127.0.0.1:8083 390,1440 9225 first-shift,mentor,locker-walk,platform
```

Browser checks use actual pointer/touch events into the engine canvas, not answer buttons or calls to completion functions. They check engine routing, WebGL, rewards and completion. Vendor version and MIT license are stored in `vendor/`.
