# Brique.js
Creating cascading layout grids like [Pinterest](https://www.pinterest.com/).
Use the power of CSS Grid Layout.

## Getting Started
1. [Install](#install)
2. [Instantiate](#instantiate)
3. [HTML markup example](#HTML-markup-example)
4. [Parameter](#parameter)
5. [Methods](#methods)
6. [Responsive grid](#responsive-grid)

## Install
```
$ npm i brique --save
```

## Instantiate

### TypeScript
``` ts
import { Brique } from './node_modules/brique/lib';

const refGrid = document.getElementById('grid');
new Brique(refGrid);
```

### JavaScript ES6
HTML `script` tag requires the `type="module"` attribute.
``` html
<script type="module" src="scripts/main.js"></script>
```

Create the grid in the JavaScript file (`scripts/main.js`) and import the `esm` version of the library (`index.esm.js`).
``` js
import { Brique } from './node_modules/brique/lib/index.esm.js';

const refGrid = document.getElementById('grid');
new Brique(refGrid);
```

## HTML markup example
``` html
<div id="grid">
    <div>
        <h2>Box 1</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div>
        <h2>Box 2</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboret.</p>
    </div>
    <div>
        <h2>Box 3</h2>
    </div>
    <div>
        <h2>Box 4</h2>
        <p>Lorem ipsum dolor sit amet.</p>
    </div>
    <div>
        <h2>Box 5</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
    </div>
</div>
```
## Parameter
### Options (`BriqueOptions`)
| Property | Type | Required | Description |
| --- | --- | --- | --- |
| columns | number |  true |  Number of columns |
| columnGap | string | false | Spacing between columns |
| rowGap | string | false | Spacing between row |

#### Example
``` ts
const refGrid = document.getElementById('grid');
const options = {
    columns: 4,
    rowGap: '24px',
    columnGap: '16px',
};

new Brique(refGrid, options);
```

## Methods
### watchResize()
Resize the grid items when the window is resized.
``` ts
const refGrid = document.getElementById('grid');
const briqueGrid = new Brique(refGrid);

briqueGrid.watchResize();
```

### stopWatchResize()
Stop resize the grid items when the window is resized.

``` ts
briqueGrid.stopWatchResize();
```

### getOptions()
Get current options parameter.
``` ts
briqueGrid.getOptions(); // output: { columns: 3, rowGap: '32px', columnGap: '32px'}
```

### setOptions()
Change options parameter. 
``` ts
briqueGrid.setOptions({
    columns: 5
});
```
Allows you to create a [responsive grid](#responsive-grid).

### update()
Update rendering on demand
``` ts
briqueGrid.update();
```

## Responsive grid 
Update options parameter on media queries change
``` ts
const refGrid = document.getElementById('grid');
const briqueGrid = new Brique(refGrid);
const mediaQueryMobile = window.matchMedia('(max-width: 767px)');

function setOptionsBrique() {
    briqueGrid.setOptions({
        ...briqueGrid.getOptions(),
        columns: mediaQueryMobile.matches ? 2 : 3
    });
}

setOptionsBrique();
briqueGrid.watchResize();
mediaQueryMobile.addEventListener('change', setOptionsBrique);
```
