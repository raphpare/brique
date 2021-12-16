import { Brique } from '../../lib/index.esm.js';

const refGrid = document.getElementById('grid');
const mediaQueryMobile = window.matchMedia('(max-width: 767px)');

const getOptions = () => {
    const isMobile = mediaQueryMobile.matches;
    const spacing = isMobile ? '8px' : '32px';
    return {
        columns: isMobile ? 2 : 3,
        columnGap: spacing,
        rowGap: spacing,
    };
}

const briqueGrid = new Brique(refGrid, getOptions());

mediaQueryMobile.addEventListener('change', () => {
    briqueGrid.updateOptions(getOptions());
});
