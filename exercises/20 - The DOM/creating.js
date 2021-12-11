const list = document.createElement('ul');
const itemOne = document.createElement('li');
itemOne.innerText = 'One';

list.appendChild(itemOne);
document.body.insertAdjacentElement('afterbegin', list);

const itemFive = document.createElement('li');
itemFive.innerText = 'Five';

list.append(itemFive);

const mara = document.querySelector('.mara');
console.log(mara);
console.log(mara.children);
console.log(mara.childNodes);
