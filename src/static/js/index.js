function onFileChosen(e) {
	const imgElement = document.getElementById("img")
	imgElement.src = URL.createObjectURL(e.target.files[0]);
}

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function draw(steps) {
	if (!steps) return
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath()
	let press = null;
	for (let i = 0; i < steps.length; i++) {
		const step = steps[i];
		await sleep(1);
		if (typeof step === "string") {
			if (step === "UP") {
				press = 0;
			} else if (step === "DOWN") {
				press = 1;
			}
		} else {
			if (press === 0) {
				ctx.moveTo(step[0], step[1]);
			} else if (press === 1) {
				ctx.lineTo(step[0], step[1]);
			}
			ctx.stroke();
		}
	}
}

async function getData(file) {
	const formData = new FormData()
	formData.append("img", file)

	const response = await fetch("/img", {
		method: "POST",
		body: formData
	});
	const data = await response.json();
	return data.data
}

async function onSubmitClick() {
	const inputImg = document.getElementById("inputImg");
	const file = inputImg.files[0]
	if (file) {
		const loaderEl = document.getElementById("loader")
		loaderEl.style.display = "block"
		const data = await getData(file)
		loaderEl.style.display = "none"
		draw(data)
	}
}
