import { Brique } from '../../lib/index.esm.js';

const refGrid = document.querySelector('.grid');
const briqueGrid = new Brique(refGrid);

briqueGrid.watchResize();
