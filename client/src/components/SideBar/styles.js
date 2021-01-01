import styled from "styled-components";

export const Section = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #fff;
	border-right: 1px #bdbdbd solid;
	width: 400px;

	.upload-container {
		padding: 16px;
		text-align: center;

		img {
			margin-top: 16px;
			width: 200px;
		}
	}

	.settings-container {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-top: 1px #e0e0e0 solid;
		padding: 16px;

		.preview-container {
			position: relative;

			img {
				width: 200px;
				border: 1px #e0e0e0 dashed;
			}

			.progress-bar {
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
			}
		}

		.options {
			width: 100%;
			margin-top: 16px;
		}

		.slider {
			margin-top: 16px;
		}
	}
`;
