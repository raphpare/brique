import { Brique } from '../../lib/index.esm.js';

const refGrid = document.getElementById('grid');
let boxIndex = 6;

for (let i = 0; i < 400; i++) {
    const refDiv = document.createElement('div');
    refDiv.className = "brique__item";
    refDiv.innerHTML = `<h2>Box ${boxIndex}</h2>
        <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Aliquid aut veritatis odio ex. Error quidem animi
            aperiam ratione nobis alias commodi fugiat itaque
            eveniet. Odit, minus vitae. Facere, fuga accusamus!
        </p>`
    refGrid.append(refDiv);
    boxIndex++;
}

new Brique(refGrid);

