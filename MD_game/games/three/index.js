import * as puzzles from './puzzles.js?v=flat-2d-1';
import {vignette,spot} from './action.js?v=flat-2d-1';
import {map,shift} from './navigation.js?v=flat-2d-1';
import {mount as platform} from './platform.js?v=flat-2d-1';
export function mount(c){const id=c.game.id;if(id==='mentor'||id==='locker-walk')return map(c,id==='mentor'?'mentor':'locker');if(id==='first-shift')return shift(c);if(id==='sharp-eyes')return spot(c);if(id==='platform')return platform(c);if(['report','comic','board'].includes(id))return vignette(c,id);const modes={sequence:puzzles.sequence,memory:puzzles.memory,'response-cards':puzzles.deck,sort:puzzles.sort,tidy:puzzles.tidy,jigsaw:puzzles.jigsaw,missing:puzzles.missing,evidence:puzzles.evidence};return modes[id](c);}
