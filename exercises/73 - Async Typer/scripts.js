function wait(ms = 0) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// third parameter makes the function testable (set to default to work in any case but it could be set to a certain number to test if ir returns consistent results)
function getRandomBetween(min, max, randomNumber = Math.random()) {
	return Math.floor(randomNumber * (max - min) + min);
}

// async for of loop
// async function draw(element) {
// 	const text = element.textContent;
// 	let soFar = '';
// 	for (const letter of text) {
// 		soFar += letter;
// 		element.textContent = soFar;
// 		// wait for random amount of time
// 		const { typeMin, typeMax } = element.dataset;
// 		console.log(element.dataset);
// 		const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
// 		await wait(10);
// 	}
// }

// recursion
function draw(el) {
	let index = 1;
	const text = el.textContent;
	const { typeMin, typeMax } = el.dataset;

	async function drawLetter() {
		el.textContent = text.slice(0, index);
		index += 1;
		const amountOfTimeToWait = getRandomBetween(typeMin, typeMax);
		await wait(amountOfTimeToWait);

		// exit condition
		if (index <= text.length) {
			drawLetter();
			// wait for some time
		}
	}
	// when the function draew() runs, call the drawLetter()
	drawLetter();
}

document.querySelectorAll('[data-type]').forEach(draw);
