const refGrid = document.querySelector('.grid');
const briqueGrid = new Brique(refGrid);
const mediaQueryMobile = window.matchMedia('(max-width: 767px)');

function setOptionsBrique() {
    const spacing = mediaQueryMobile.matches ? '8px' : '32px';
    briqueGrid.setOptions({
        ...briqueGrid.getOptions(),
        columns: mediaQueryMobile.matches ? 2 : 3,
        columnGap: spacing,
        rowGap: spacing,
    });
}

setOptionsBrique();
briqueGrid.watchResize();
mediaQueryMobile.addEventListener('change', setOptionsBrique);
