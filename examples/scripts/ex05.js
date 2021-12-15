import { Brique } from '../../lib/index.esm.js';

const refGrid = document.getElementById('grid');
const refAddBoxButton = document.getElementById('addBox');
let boxIndex = 6;

new Brique(refGrid);

refAddBoxButton.addEventListener('click', () => {
    const refDiv = document.createElement('div');
    refDiv.className = "brique__item";
    refDiv.innerHTML = `<h2>Box ${boxIndex}</h2>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Aliquid aut veritatis odio ex. Error quidem animi
            aperiam ratione nobis alias commodi fugiat itaque
            eveniet. Odit, minus vitae. Facere, fuga accusamus!
        </p>`;
    refGrid.append(refDiv);
    boxIndex++;
});