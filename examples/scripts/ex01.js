import { Brique } from '../../lib/index.esm.js';

const refGrid = document.getElementById('grid');
new Brique(refGrid).updateOptions({columns: 4});
