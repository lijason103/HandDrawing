import React from "react";
import { StyledButton } from "./styles";
import cx from "classnames";

export const DrawControlButton = React.memo((props) => {
	const { Icon, fontSize = "16px", isSelected, onClick } = props;

	return (
		<StyledButton className={cx(isSelected && "selected")} onClick={onClick}>
			{Icon && <Icon style={{ fontSize }} />}
		</StyledButton>
	);
});
