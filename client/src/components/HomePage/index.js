import React, { useState, useRef } from "react";
import { getDrawingSteps, getPreview } from "../../utils/services";
import { draw } from "../../utils/draw";
import { Page } from "./styles";
import { SideBar } from "../SideBar";
import { DrawControls } from "../DrawControls";
import { Button, CircularProgress } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./util";

// Need to match with the server
const canvasSize = {
	width: 500,
	height: 500,
};

const defaultBlurLevel = 3;
const defaultCannyThresholdLevel = 1;

const HomePage = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [fetchStatus, setFetchStatus] = useState(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [file, setFile] = useState(null);

	const [previewImg, setPreviewImg] = useState(null);
	const [previewSettings, setPreviewSettings] = useState({
		blurLevel: defaultBlurLevel,
		cannyThresholdLevel: defaultCannyThresholdLevel,
	});
	const [isPreviewLoading, setIsPreviewLoading] = useState(false);

	const [drawSettings, setDrawSettings] = useState({ lineWidth: 1, isLineDashOn: false });

	const canvasRef = useRef(null);

	const handleOnDraw = async (event) => {
		if (!file) return;
		setIsLoading(true);
		const data = await getDrawingSteps(file, previewSettings);
		const { steps, time } = data || {};
		setFetchStatus(
			data && time ? `Took ${time.toFixed(1)} seconds` : "Fetch error"
		);
		setIsLoading(false);

		if (steps) {
			setIsDrawing(true);
			await draw(canvasRef.current, steps, drawSettings);
			setIsDrawing(false);
		}
	};

	const handleOnPreviewCommit = async () => {
		setIsPreviewLoading(true);
		const blobURL = await getPreview(file, previewSettings);
		setPreviewImg(blobURL);
		setIsPreviewLoading(false);
	};

	const handleOnPreviewSettingsChange = (newSettings) => {
		setPreviewSettings({ ...previewSettings, ...newSettings });
	};

	const handleOnFileLoad = (file) => {
		setFile(file);
		setPreviewImg(null);
	};

	return (
		<ThemeProvider theme={theme}>
			<Page>
				<section className="toolbar">
					<div className="toolbar-left">
						<img src="logo128.png" width="24px" height="24px" alt="" />
						<span>H.D</span>
					</div>
					<div>
						{!isLoading && fetchStatus && <span>{fetchStatus}</span>}
						{isLoading && <CircularProgress size={24} />}
					</div>
					<div className="toolbar-right">
						<Button
							variant="contained"
							color="primary"
							onClick={handleOnDraw}
							disabled={!file || isLoading || isDrawing}
						>
							Draw
						</Button>
					</div>
				</section>
				<div className="wrapper">
					<SideBar
						onFileLoad={handleOnFileLoad}
						previewImg={previewImg}
						onPreviewCommit={handleOnPreviewCommit}
						previewSettings={previewSettings}
						onPreviewSettingsChanged={handleOnPreviewSettingsChange}
						isPreviewLoading={isPreviewLoading}
					/>
					<section className="output-container">
						<div className="draw-controller">
							<DrawControls
								drawSettings={drawSettings}
								onControlClick={(newSettings) =>
									setDrawSettings({ ...drawSettings, ...newSettings })
								}
							/>
						</div>
						<div className="canvas-container">
							<canvas
								ref={canvasRef}
								width={canvasSize.width}
								height={canvasSize.height}
							/>
						</div>
					</section>
				</div>
			</Page>
		</ThemeProvider>
	);
};

export default HomePage;
