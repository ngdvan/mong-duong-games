import * as puzzles from './puzzles.js?v=flat-2d-1';
import {vignette,spot} from './action.js?v=flat-2d-1';
export function mount(c){const id=c.game.id;if(id==='sharp-eyes')return spot(c);if(['report','comic','board'].includes(id))return vignette(c,id);const modes={sequence:puzzles.sequence,memory:puzzles.memory,'response-cards':puzzles.deck,sort:puzzles.sort,tidy:puzzles.tidy,jigsaw:puzzles.jigsaw,missing:puzzles.missing,evidence:puzzles.evidence};return modes[id](c);}
