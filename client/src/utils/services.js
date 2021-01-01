export async function getDrawingSteps(file, settings) {
	const { blurLevel } = settings || {}
	if (!file || !blurLevel) return null

	const formData = new FormData()
	formData.append("img", file)
	formData.append('blur_level', blurLevel)

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


export async function getPreview(file, settings) {
	const { blurLevel } = settings || {}
	if (!file || !blurLevel) return null

	const formData = new FormData()
	formData.append('img', file)
	formData.append('blur_level', blurLevel)

	let data
	try {
		const response = await fetch("/api/preview", {
			method: "POST",
			body: formData
		});
		const blob = await response.blob()
		data = URL.createObjectURL(blob)
	} catch (err) {
		console.error('Error', err)
	}
	return data
}