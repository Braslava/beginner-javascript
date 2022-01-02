function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No Gallery Found!');
  }
  // select the elements we need
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;

  function openModal() {
    console.info('opening modal...');
    // check if the modal is already open
    if (modal.matches('.open')) {
      console.info('Modal already open');
      // stop the function from running
    }
    modal.classList.add('open');
    // event listeners that are bound when we open the modal
    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPreviousImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPreviousImage);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'Escape') {
      return closeModal(); // return to stop the function from checking for other keys if esc was pressed
    }
    if (event.key === 'ArrowRight') {
      return showNextImage();
    }
    if (event.key === 'ArrowLeft') {
      return showPreviousImage();
    }
  }

  function showImage(el) {
    if (!el) {
      console.info('no image to show');
      return;
    }
    // update the modal with this info
    console.log(el);
    modal.querySelector('img').src = el.src;
    modal.querySelector('h2').src = el.title;
    modal.querySelector('figure p').textContent = el.dataset.description;
    currentImage = el;
    openModal();
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPreviousImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }
  // These are our Event Listeners!
  images.forEach((image) =>
    image.addEventListener('click', (e) => showImage(e.currentTarget))
  );

  // open modal when tabbing through images and pressing 'enter'
  images.forEach((image) =>
    image.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        showImage(e.currentTarget);
      }
    })
  );

  modal.addEventListener('click', handleClickOutside);
}

// Use it on the page

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
