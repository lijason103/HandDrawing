import styled from "styled-components";

export const Section = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #fff;
	border-right: 1px #bdbdbd solid;
	width: 400px;

	img {
		margin-top: 8px;
		width: 200px;
	}

	.upload-container {
		padding: 16px;
		text-align: center;
	}

	.settings-container {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		border-top: 1px #E0E0E0 solid;
		padding: 16px;

		img {
			border: 1px #e0e0e0 dashed;
		}

		.options {
			width: 100%;
			margin-top: 16px;
		}
	}
`;
