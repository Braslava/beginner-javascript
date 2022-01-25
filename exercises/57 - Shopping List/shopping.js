const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// array to hold our state
let items = [];
function handleSubmit(e) {
  e.preventDefault();
  console.log('Submitted!');
  const name = e.currentTarget.item.value;
  if (!name) return;
  const item = {
    name,
    // return the number of ms since 1.01.1970 that is here used as an id
    id: Date.now(),
    complete: false,
  };
  // push the items into our state
  items.push(item);
  console.log(`There are now ${items.length} in your state.`);
  // clear the form
  e.target.reset();
  // displayItems();
  // instead of calling displayItems fire off a custom event that will tell anyone else who cares that these items have been updates
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  const html = items
    .map(
      (item) => `<li class="shopping-item">
    <input type="checkbox" value="${item.id}" ${item.complete && 'checked'}>
    <span class="item-name">${item.name}</span>
    <button value="${item.id}" aria-label="Remove ${item.name}">&times;</button>
    </li>`
    )
    .join('');
  list.innerHTML = html;
}

function mirrorToLocalStorage() {
  console.info('Saivng items to localstorage');
  // localstorage only stores strubg, use JSON.stringify to convert the object into a string
  localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
  console.info('Restorign from localstorage');
  const localStorageItems = JSON.parse(localStorage.getItem('items'));
  if (localStorageItems.length) {
    // spread the items from localstorage array into the items array (might as well just write items = localStorageItems)
    items.push(...localStorageItems);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
  }
}

function deleteItem(id) {
  console.log('deleting', id);
  // update items array and remove the one with this id
  items = items.filter((item) => item.id !== id);
  console.log(items);
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
  console.log('marking as complete', id);
  const itemRef = items.find((item) => item.id === id);
  // set it to the opposite of iteself, so it works for both checking and unchecking
  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
// Event delegation
list.addEventListener('click', (e) => {
  const id = parseInt(e.target.value);
  if (e.target.matches('button')) {
    deleteItem(id);
  }
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

restoreFromLocalStorage();
