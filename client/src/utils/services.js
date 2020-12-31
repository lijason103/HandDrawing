export async function getDrawingSteps(file) {
	const formData = new FormData()
	formData.append("img", file)
	let data
	try {
		const response = await fetch("/api/img", {
			method: "POST",
			body: formData
		});
		data = await response.json();
	} catch (err) {
		console.error('Error', err)
	}
	return data
}
