import React, { useState } from "react";
import { Dropzone } from "../Dropzone";
import { Section } from "./styles";
import { Button, Slider, CircularProgress } from "@material-ui/core";

const MARKS = [
	{ value: 0, label: 1 },
	{ value: 1, label: 2 },
	{ value: 2, label: 3 },
	{ value: 3, label: 4 },
];

export const SideBar = (props) => {
	const {
		onFileLoad,
		previewImg,
		onPreviewCommit,
		previewSettings,
		onPreviewSettingsChanged,
		isPreviewLoading,
	} = props;
	const { blurLevel, cannyThresholdLevel } = previewSettings;
	const [fileUrl, setFileUrl] = useState(null);

	const handleOnDrop = (acceptedFiles) => {
		const file = acceptedFiles[0];
		setFileUrl(URL.createObjectURL(file));
		onFileLoad(file, blurLevel);
	};

	const isSettingDisabled = !previewImg || isPreviewLoading;

	return (
		<Section>
			<div className="upload-container">
				<Dropzone onDrop={handleOnDrop} />
				<img src={fileUrl} alt="" />
			</div>
			<div className="settings-container">
				<div className="preview-container">
					{previewImg && <img src={previewImg} alt="preview" />}
					{isPreviewLoading && (
						<CircularProgress className="progress-bar" size={24} />
					)}
					{!previewImg && (
						<Button
							variant="outlined"
							onClick={onPreviewCommit}
							disabled={!fileUrl || isPreviewLoading}
						>
							Preview
						</Button>
					)}
				</div>
				<div className="options">
					<div className="slider">
						<span>Blur Level</span>
						<Slider
							value={blurLevel}
							step={1}
							marks={MARKS}
							min={0}
							max={3}
							disabled={isSettingDisabled}
							onChange={(event, value) =>
								onPreviewSettingsChanged({ blurLevel: value })
							}
							onChangeCommitted={onPreviewCommit}
						/>
					</div>
					<div className="slider">
						<span className="slider-name">Canny Threshold Level</span>
						<Slider
							value={cannyThresholdLevel}
							step={1}
							marks={MARKS}
							min={0}
							max={3}
							disabled={isSettingDisabled}
							onChange={(event, value) =>
								onPreviewSettingsChanged({ cannyThresholdLevel: value })
							}
							onChangeCommitted={onPreviewCommit}
						/>
					</div>
				</div>
			</div>
		</Section>
	);
};
