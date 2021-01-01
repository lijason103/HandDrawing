import React, { useState } from "react";
import { Dropzone } from "../Dropzone";
import { Section } from "./styles";
import { Button, Slider } from "@material-ui/core";

const BLUR_MARKS = [
	{ value: 1, label: 1 },
	{ value: 2, label: 2 },
	{ value: 3, label: 3 },
	{ value: 4, label: 4 },
];

export const SideBar = (props) => {
	const {
		onFileLoad,
		previewImg,
		onPreviewCommit,
		previewSettings,
		onPreviewSettingsChanged,
	} = props;
	const { blurLevel } = previewSettings;
	const [fileUrl, setFileUrl] = useState(null);

	const handleOnDrop = (acceptedFiles) => {
		const file = acceptedFiles[0];
		setFileUrl(URL.createObjectURL(file));
		onFileLoad(file, blurLevel);
	};

	return (
		<Section>
			<div className="upload-container">
				<Dropzone onDrop={handleOnDrop} />
				<img src={fileUrl} alt="" />
			</div>
			<div className="settings-container">
				{previewImg ? (
					<img src={previewImg} alt="preview" />
				) : (
					<Button onClick={onPreviewCommit} disabled={!fileUrl}>
						Preview
					</Button>
				)}
				<div className="options">
					<span>Blur level</span>
					<Slider
						aria-labelledby="discrete-slider-restrict"
						value={blurLevel}
						step={1}
						marks={BLUR_MARKS}
						min={1}
						max={4}
						disabled={!previewImg}
						onChange={(event, value) =>
							onPreviewSettingsChanged({ blurLevel: value })
						}
						onChangeCommitted={onPreviewCommit}
					/>
				</div>
			</div>
		</Section>
	);
};
