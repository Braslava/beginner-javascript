function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error('No slider passed in!');
  }
  this.slider = slider;
  // select the elements needed for the slider
  this.slides = slider.querySelector('.slides');
  // keep the buttons as regular variables because they are not used anywhere outside of the function
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  // when the slider is created, run the start slider function
  this.startSlider();
  this.applyClasses();

  // Event listeners
  prevButton.addEventListener('click', () => this.move('back'));
  // could also bind the function here because we don't need to remove it later, with this.move.bind(this)
  nextButton.addEventListener('click', () => this.move());
}

Slider.prototype.startSlider = function () {
  this.current =
    this.slider.querySelector('.current') || this.slides.firstElementChild;
  this.previous =
    this.current.previousElementSibling || this.slides.lastElementChild;
  this.next = this.current.nextElementSibling || this.slides.firstElementChild;
  // console.log(this.current, this.previous, this.next);
};

Slider.prototype.applyClasses = function () {
  this.current.classList.add('current');
  this.next.classList.add('next');
  this.previous.classList.add('prev');
};

Slider.prototype.move = function (direction) {
  // first strip all the classes off the current slides
  const classesToRemove = ['prev', 'current', 'next'];
  this.previous.classList.remove(...classesToRemove);
  this.current.classList.remove(...classesToRemove);
  this.next.classList.remove(...classesToRemove);
  if (direction === 'back') {
    // make a new array of the new values and use destructuring to assign them the values of the previous, current and next array
    [this.previous, this.current, this.next] = [
      // get the previous slide or wrap to the last slide if currently on the first
      this.previous.previousElementSibling || this.slides.lastElementChild,
      this.previous,
      this.current,
    ];
  } else {
    [this.previous, this.current, this.next] = [
      this.current,
      this.next,
      this.next.nextElementSibling || this.slides.firstElementChild,
    ];
  }
  // re-run the applyClasses function to assign classes to the new values
  this.applyClasses();
};

const mySlider = new Slider(document.querySelector('.slider'));
const dogSlider = new Slider(document.querySelector('.dog-slider'));

console.log(mySlider, dogSlider);
window.dogSlider = dogSlider;
window.mySlider = mySlider;

// try with document.activeElement ???

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight') {
    dogSlider.move();
  }
  if (e.key === 'ArrowLeft') {
    dogSlider.move('back');
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'ArrowRight') {
    mySlider.move();
  }
  if (e.key === 'ArrowLeft') {
    mySlider.move('back');
  }
});
