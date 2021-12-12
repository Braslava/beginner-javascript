const cardButtons = document.querySelectorAll('.card button');
const modalInner = document.querySelector('.modal-inner');
const modalOuter = document.querySelector('.modal-outer');

function handleCardButtonClick(event) {
  const button = event.currentTarget;
  const card = button.closest('.card');
  // grab the image source
  const imgSrc = card.querySelector('img').src;
  const { description } = card.dataset;
  const name = card.querySelector('h2').textcontent;
  // console.log(description);
  // populate modal with new info
  modalInner.innerHTML = `
    <img src="${imgSrc.replace('200', '600')}" alt="${name}"/>
    <p>${description}</p>
    `;
  // show the modal
  modalOuter.classList.add('open');
}

cardButtons.forEach((button) =>
  button.addEventListener('click', handleCardButtonClick)
);

function closeModal() {
  modalOuter.classList.remove('open');
}

modalOuter.addEventListener('click', (event) => {
  const isOutside = !event.target.closest('.modal-inner');
  if (isOutside) {
    closeModal();
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});
