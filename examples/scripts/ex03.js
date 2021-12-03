import { Brique } from '../../lib/index.js';

const refGrid = document.querySelector('.grid');
const briqueGrid = new Brique(refGrid);

briqueGrid.watchResize();
