/* eslint-disable prettier/prettier */
function wait(ms = 0) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function destroyPopup(popup) {
	popup.classList.remove('open');
	await wait(1000);
	// remove the popup entirely
	popup.remove();
	/* eslint-disable no-param-reassign */
	popup = null;
	/* eslint-enable no-param-reassign */
}

function ask(options) {
	return new Promise(async (resolve) => {
		// first create a popup with all the necessary fields
		const popup = document.createElement('form');
		popup.classList.add('popup');
		popup.insertAdjacentHTML(
			'afterbegin',
			`<fieldset>
                <label>${options.title}</label>
                <input type="text" name="input">
                <button type="submit">Submit</button>
            </fieldset>`
		);

		// check if user wants cancel button
		if (options.cancel) {
			const skipButton = document.createElement('button');
			skipButton.type = 'button';
			skipButton.textContent = 'Cancel';
			console.log(popup.firstChild);
			popup.firstElementChild.appendChild(skipButton);
			// TODO: listen for a click on the cancel button
			skipButton.addEventListener(
				'click',
				() => {
					resolve(null);
					destroyPopup(popup);
				},
				{ once: true }
			);
		}
		// listen for the submit event of the  inputs
		popup.addEventListener(
			'submit',
			(e) => {
				e.preventDefault();
				console.log('Submitted');
				resolve(e.target.input.value);
				// remove it from the DOM entirely
				destroyPopup(popup);
			},
			{ once: true }
		);
		// when someone does submit it, resolve the data that was in the input box

		// insert the popup in the DOM
		document.body.appendChild(popup);
		// put a very small timeout before adding the open class to stick it at the end of the callstack and leave time for animation
		await wait(50);
		popup.classList.add('open');
	});
}

// slect all the buttons that have a question
async function askQuestion(e) {
	const button = e.currentTarget;
	const shouldCancel = 'cancel' in button.dataset;
	// might also just use button.hasAttribute('data-cancel')
	const answer = await ask({
		title: button.dataset.question,
		cancel: shouldCancel,
	});
	console.log(answer);
}

const buttons = document.querySelectorAll('[data-question]');
buttons.forEach((button) => button.addEventListener('click', askQuestion));

const questions = [
	{ title: 'What is your name?' },
	{ title: 'What is your age?', cancel: true },
	{ title: 'What is your dogs name?' },
];

// general function to loop
async function asyncMap(array, callback) {
	const results = [];
	for (const item of array) {
		const result = await callback(item);
		results.push(result);
	}
	return results;
}

async function go() {
	const answers = await asyncMap(questions, ask);
	console.log(answers);
}

go();

// in contrast to map and forEach for...of loop allows pausing the loop to await sth inside of it
// async function askMany() {
// 	for (const question of questions) {
// 		const answer = await ask(question);
// 		console.log(answer);
// 	}
// }

// does not work because make them all run simultaneously
// Promise.all(questions.map(ask)).then((data) => {
// 	console.log(data);
// });

// setTimeout(() => {
//     popup.classList.add('open');
// }, 50);

// ask({ title: 'Does it work?', cancel: true });
