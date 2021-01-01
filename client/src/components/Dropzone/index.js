import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const getColor = (props) => {
	if (props.isDragAccept) {
		return "#00e676";
	}
	if (props.isDragReject) {
		return "#ff1744";
	}
	if (props.isDragActive) {
		return "#2196f3";
	}
	return "#eeeeee";
};

const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-width: 2px;
	border-radius: 2px;
	border-color: ${(props) => getColor(props)};
	border-style: dashed;
	background-color: #fafafa;
	color: #bdbdbd;
	outline: none;
	transition: border 0.24s ease-in-out;
`;

export const Dropzone = React.memo((props) => {
	const { onDrop } = props;
	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
	} = useDropzone({ accept: "image/*", onDrop, multiple: false });

	return (
		<div className="container">
			<Container
				{...getRootProps({ isDragActive, isDragAccept, isDragReject })}
			>
				<input {...getInputProps()} id="dropzone"/>
				<p>Drag 'n' drop image here, or click to select image</p>
			</Container>
		</div>
	);
});
