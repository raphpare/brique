import { Brique } from '../../lib/index.esm.js';

const refGrid = document.getElementById('grid');
const briqueGrid = new Brique(refGrid);

briqueGrid.watchResize();
