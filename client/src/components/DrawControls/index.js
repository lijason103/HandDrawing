import React from "react";
import { DrawControlButton } from "../DrawControlButton";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import LineStyle from "@material-ui/icons/LineStyle";

export const DrawControls = React.memo((props) => {
	const { drawSettings, onControlClick } = props;
	const { lineWidth, isLineDashOn } = drawSettings;

	return (
		<>
			{[1, 2, 3, 4, 5].map((val, index) => {
				return (
					<DrawControlButton
						key={index}
						Icon={FiberManualRecord}
						fontSize={`${4 * index + 4}px`}
						isSelected={lineWidth === val}
						onClick={() => onControlClick({ lineWidth: val })}
					/>
				);
			})}
			<DrawControlButton
				Icon={LineStyle}
				isSelected={isLineDashOn}
				onClick={() => onControlClick({ isLineDashOn: !isLineDashOn })}
			/>
		</>
	);
});
