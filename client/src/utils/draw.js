import { sleep } from './utils'

export const draw = async (canvas, steps) => {
  if (!steps || !canvas) return
  
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