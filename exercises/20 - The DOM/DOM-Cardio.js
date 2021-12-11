// Make a div
const wrapper = document.createElement('div');
// add a class of wrapper to it
wrapper.classList.add('wrapper');
// put it into the body
document.body.appendChild(wrapper);
// make an unordered list
const myList = document.createElement('ul');
// add three list items with the words "one, two, three" in them

const listItems = ['one', 'two', 'three'];

listItems.forEach((item) => {
  const listItem = document.createElement('li');
  listItem.innerText = item;
  myList.appendChild(listItem);
});

console.log(myList);

// put that list into the above wrapper
wrapper.appendChild(myList);
// create an image
const pic = document.createElement('img');
// set the source to an image
pic.src = 'https://picsum.photos/id/237/200/300';
// set the width to 250
pic.width = '250';
// add a class of cute
pic.className = 'cute';
// add an alt of Cute Puppy
pic.alt = 'Cute Puppy';
// Append that image to the wrapper
wrapper.appendChild(pic);
// with HTML string, make a div, with two paragraphs inside of it
const myDivHTML = `
    <div class="myDiv">
        <p>paragraph 1</p>
        <p>paragraph 2</p>
    </div>`;
// const myDiv = document.createRange().createContextualFragment(myDivText);
// put this div before the unordered list from above
myList.insertAdjacentHTML('beforebegin', myDivHTML);
const myDiv = document.querySelector('.myDiv');
wrapper.insertAdjacentElement('afterbegin', myDiv);

// add a class to the second paragraph called warning
const warningPara = document.querySelector('.wrapper p:last-child');
console.dir(warningPara);
warningPara.classList.add('warning');

// remove the first paragraph
const paraToRemove = document.querySelector('.wrapper p:first-child');
paraToRemove.remove();
// create a function called generatePlayerwrapper that takes in three arguments: name, age, and height
// have that function return html that looks like this:
// <div class="playerwrapper">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
// </div>

function generatePlayerwrapper(name, age, height, parentElement) {
  const playerWrapperText = `
    <div class="playerwrapper">
    <h2>${name} — ${age}</h2>
    <p>They are ${height} and ${age} years old. In Dog years this person would be ${age * 7}. That would be a tall dog!</p>
    <button class="delete" type="button">Delete</button> 
    </div>`;
  const playerWrapper = document
    .createRange()
    .createContextualFragment(playerWrapperText);
  parentElement.appendChild(playerWrapper);
}
// make a new div with a class of wrappers
const playerWrapperContainer = document.createElement('div');
// make 4 player wrappers using generatePlayerwrapper
const playerWrapper1 = generatePlayerwrapper('Joe', 32, 1.73, playerWrapperContainer);
const playerWrapper2 = generatePlayerwrapper('Suzanne', 35, 1.7, playerWrapperContainer);
const playerWrapper3 = generatePlayerwrapper('Jolene', 14, 1.8, playerWrapperContainer);
const playerWrapper4 = generatePlayerwrapper('Arno', 24, 1.86, playerWrapperContainer);

// append those wrappers to the div
// put the div into the DOM just before the wrapper element
wrapper.insertAdjacentElement('beforebegin', playerWrapperContainer);
// Bonus, put a delete Button on each wrapper so when you click it, the whole wrapper is removed
// select all the buttons!
const deleteButtons = playerWrapperContainer.querySelectorAll('.delete');
// make out delete function
function deleteParent(event) {
  const buttonThatGotClicked = event.currentTarget;
  buttonThatGotClicked.closest('.playerwrapper').remove();
  // element.parentElement.remove();
}
// loop over them and attach a listener
console.log(deleteButtons);
deleteButtons.forEach((btn) => btn.addEventListener('click', deleteParent));
