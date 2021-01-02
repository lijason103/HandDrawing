import styled from "styled-components";

export const Page = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;

	.toolbar {
		background-color: #fff;
    border-bottom: 1px #bdbdbd solid;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .toolbar-left {
      span {
        font-weight: bold;
        margin-left: -12px;
      }
    }

    .toolbar-right {
      float: right;
    }
	}

	.wrapper {
		display: flex;
		flex-direction: row;
		height: 100%;
	}

	.output-container {
		display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #eeeeee;
    position: relative;
    
    .canvas-container {
      background-color: #fff;
      padding: 8px;
      canvas {
        width: 500px;
        height: 500px;
      }
    }
    
    .draw-controller {
      background-color: white;
      position: absolute;
      top: 0;
      display: flex;
      border: 1px #bdbdbd solid;
      border-top: none;
    }

	}
`;
