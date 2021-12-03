import { Brique } from '../../lib/index.es.js';

const refGrid = document.querySelector('.grid');
const briqueGrid = new Brique(refGrid);

briqueGrid.watchResize();
