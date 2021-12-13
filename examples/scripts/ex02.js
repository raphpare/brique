import { Brique } from '../../lib/index.esm.js';

const refGrid = document.getElementById('grid');
const options = {
    columns: 4,
    rowGap: '24px',
    columnGap: '16px',
};

new Brique(refGrid, options);
