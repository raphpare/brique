import { Brique } from '../../lib/index.es.js';

const refGrid = document.querySelector('.grid');
const options = {
    columns: 4,
    rowGap: '24px',
    columnGap: '16px',
};

new Brique(refGrid, options);
