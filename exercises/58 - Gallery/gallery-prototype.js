function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No Gallery Found!');
  }
  // select the elements we need
  this.images = Array.from(gallery.querySelectorAll('img'));
  this.modal = document.querySelector('.modal');
  this.prevButton = this.modal.querySelector('.prev');
  this.nextButton = this.modal.querySelector('.next');

  // bind the methods to the instance when we need them (otherwise they will not work with callbacks because 'this' then referes to the next element in the hierarchy)
  this.showNextImage = this.showNextImage.bind(this);
  this.showPreviousImage = this.showPreviousImage.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);
  this.handleClickOutside = this.handleClickOutside.bind(this);

  // These are our Event Listeners!
  this.images.forEach((image) =>
    image.addEventListener('click', (e) => this.showImage(e.currentTarget))
  );

  // open modal when tabbing through images and pressing 'enter'
  this.images.forEach((image) =>
    image.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        this.showImage(e.currentTarget);
      }
    })
  );

  this.modal.addEventListener('click', this.handleClickOutside);
}

// functions

Gallery.prototype.openModal = function () {
  console.info('opening modal...');
  // check if the modal is already open
  if (this.modal.matches('.open')) {
    console.info('Modal already open');
    // stop the function from running
  }
  this.modal.classList.add('open');
  // event listeners that are bound when we open the modal
  window.addEventListener('keyup', this.handleKeyUp);
  this.nextButton.addEventListener('click', this.showNextImage);
  this.prevButton.addEventListener('click', this.showPreviousImage);
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');
  window.removeEventListener('keyup', this.handleKeyUp);
  this.nextButton.removeEventListener('click', this.showNextImage);
  this.prevButton.removeEventListener('click', this.showPreviousImage);
};

Gallery.prototype.handleClickOutside = function (e) {
  if (e.target === e.currentTarget) {
    this.closeModal();
  }
};

Gallery.prototype.handleKeyUp = function (event) {
  if (event.key === 'Escape') {
    return this.closeModal(); // return to stop the function from checking for other keys if esc was pressed
  }
  if (event.key === 'ArrowRight') {
    return this.showNextImage();
  }
  if (event.key === 'ArrowLeft') {
    return this.showPreviousImage();
  }
};

Gallery.prototype.showImage = function (el) {
  if (!el) {
    console.info('no image to show');
    return;
  }
  // update the modal with this info
  console.log(el);
  this.modal.querySelector('img').src = el.src;
  this.modal.querySelector('h2').src = el.title;
  this.modal.querySelector('figure p').textContent = el.dataset.description;
  this.currentImage = el;
  this.openModal();
};

Gallery.prototype.showNextImage = function () {
  this.showImage(
    this.currentImage.nextElementSibling || this.gallery.firstElementChild
  );
};

Gallery.prototype.showPreviousImage = function () {
  this.showImage(
    this.currentImage.previousElementSibling || this.gallery.lastElementChild
  );
};

// Use it on the page

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
console.log(gallery1, gallery2);
