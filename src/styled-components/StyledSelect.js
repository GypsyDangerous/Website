import React from "react";
import Select from "react-select";
import { colorStyles } from "../utils/constants";

const StyledSelect = props => {
	return (
		<Select
			{...props}
			styles={{
				...colorStyles,
				container: styles => ({
					...styles,
					...colorStyles.container,
				}),
			}}
		/>
	);
};

export default StyledSelect;
