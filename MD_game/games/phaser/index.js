import * as puzzles from './puzzles.js?v=player-1';
import {map,shift} from './navigation.js?v=player-1';
import {mount as platform} from './platform.js?v=player-1';
import {vignette,spot} from './action.js?v=player-1';
export function mount(c){const id=c.game.id;if(id==='platform')return platform(c);if(id==='first-shift')return shift(c);if(id==='mentor'||id==='locker-walk')return map(c,id==='mentor'?'mentor':'locker');if(id==='sharp-eyes')return spot(c);if(['report','comic','board'].includes(id))return vignette(c,id);return ({sequence:puzzles.sequence,memory:puzzles.memory,'response-cards':puzzles.deck,sort:puzzles.sort,tidy:puzzles.tidy,jigsaw:puzzles.jigsaw,missing:puzzles.missing,evidence:puzzles.evidence})[id](c);}
