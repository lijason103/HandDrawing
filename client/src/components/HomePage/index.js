import React, { useState, useRef } from "react";
import "./styles.css";
import { getDrawingSteps } from '../../utils/services'
import { draw } from '../../utils/draw'

const canvasSize = {
  width: 500,
  height: 500
}

const HomePage = (props) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [fetchStatus, setFetchStatus ] = useState(null)
  const imgInputRef = useRef(null)
  const canvasRef = useRef(null)

  const handleOnInputChange = (event) => {
    if (event.target.files[0]) {
      setFileUrl(URL.createObjectURL(event.target.files[0]))
    }
  }

  const handleOnSubmit = async (event) => {
    const file = imgInputRef.current.files[0]
    if (!file) return
    setFetchStatus("Loading...")
    const data = await getDrawingSteps(file)
    const { steps, time } = data || {}
    setFetchStatus(data && time ? `${time} seconds` : "Fetch error")

    if (steps) {
      draw(canvasRef.current, steps)
    }
  }

	return (
		<div>
			<input
        ref={imgInputRef}
				type="file"
				accept="image/*"
				alt="No Image"
				onChange={handleOnInputChange}
			/>
			<input type="submit" onClick={handleOnSubmit} />
      {fetchStatus && <span>{fetchStatus}</span>}
			<div>
				<img id="img" src={fileUrl} alt=""/>
				<canvas ref={canvasRef} id="canvas" width={canvasSize.width} height={canvasSize.height}/>
			</div>
		</div>
	);
};

export default HomePage;