function Slider(slider) {
  if (!(slider instanceof Element)) {
    throw new Error('No slider passed in!');
  }
  // create some variables for working with the slider
  let current;
  let previous;
  let next;
  // select the elements needed for the slider
  const slides = slider.querySelector('.slides');
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  function startSlider() {
    current = slider.querySelector('.current') || slides.firstElementChild;
    previous = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    console.log({ current, previous, next });
  }

  function applyClasses() {
    current.classList.add('current');
    next.classList.add('next');
    previous.classList.add('prev');
  }

  function move(direction) {
    // first strip all the classes off the current slides
    const classesToRemove = ['prev', 'current', 'next'];
    previous.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove);
    if (direction === 'back') {
      // make a new array of the new values and use destructuring to assign them the values of the previous, current and next array
      [previous, current, next] = [
        // get the previous slide or wrap to the last slide if currently on the first
        previous.previousElementSibling || slides.lastElementChild,
        previous,
        current,
      ];
    } else {
      [previous, current, next] = [
        current,
        next,
        next.nextElementSibling || slides.firstElementChild,
      ];
    }
    // re-run the applyClasses function to assign classes to the new values
    applyClasses();
  }
  // when the slider is created, run the start slider function
  startSlider();
  applyClasses();

  // Event listeners
  prevButton.addEventListener('click', () => move('back'));
  nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));
const dogSlider = Slider(document.querySelector('.dog-slider'));
