# 2D artwork sources and adaptations

The art release uses 32 PNGs selected from three **Kenney CC0** packs, plus seven project-authored SVG equipment illustrations. Original archives stay outside the public repository. Only used files are shipped locally; there are no image CDN requests at runtime.

| Pack | Publisher page | Download used | Use |
| --- | --- | --- | --- |
| Toon Characters 1 | https://kenney.nl/assets/toon-characters | https://opengameart.org/sites/default/files/kenney_toonCharacters1.zip | Male person idle, eight walk poses and jump; helmet/color overlays |
| Platformer Pack Industrial | https://kenney.nl/assets/platformer-pack-industrial | https://opengameart.org/sites/default/files/kenney_platformerPack_industrial.zip | Steel plates, doors, windows, crates, environment and platform details |
| RPG pack: base set | https://opengameart.org/content/rpg-pack-base-set | https://opengameart.org/sites/default/files/KenneyRPGpack.zip | Grass, paving, walls, shrubs and trees |

Kenney's direct download host returned 403 in this environment, so the original author uploads on OpenGameArt were used. Each archive includes its own CC0 license, retained under `assets/kenney/`. `manifest.json` records the original filename, author/source, archive checksum and checksum of every copied PNG. No Kenney logos, combat poses or unused archive content are included.

`assets/safety-icons/` contains project-authored vector illustrations. `games/shared/artwork.js` composes loaded artwork into flat textures. These are learning illustrations, not validated equipment specifications or official safety signage. Buildings and courtyard layouts are fictional.

Phaser uses a cached worker pose atlas and native walking animations; the collision box remains the same size. Three.js uses the same illustrations as camera-facing sprites. All surfaces remain planar, with no 3D/isometric projection, 3D lighting or cast shadows. Offscreen Canvas creates textures only; the playable scenes still use the engine's WebGL renderer.

Images load before a scene mounts; failures stop the level without an answer-list fallback or coin award. Levels, missions, source references and storage keys are unchanged. The credits page is accessible from the library and game footers.

Verification: `node MD_game/tests/assets.mjs`, the existing campaign/engine tests, and browser tests on phone/desktop sizes. The checked-in PNG subset and source records occupy about 83 KB before the custom SVGs. No measured frame-rate improvement is claimed.
