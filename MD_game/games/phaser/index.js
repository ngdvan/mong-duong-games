import {map,shift} from './navigation.js?v=phaser-1';
import {mount as platform} from './platform.js?v=phaser-1';
export function mount(c){if(c.game.id==='platform')return platform(c);if(c.game.id==='first-shift')return shift(c);return map(c,c.game.id==='mentor'?'mentor':'locker');}
