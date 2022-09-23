import React from "react";
import Styles from "./customContainer.module.sass";
import { Container, Box } from "@mui/material";

type Props = {
	children?: React.ReactNode;
}

const CustomContainer: React.FC<Props> = (props: Props) => {

	return (
		<Box className={Styles.rootBox}>
			<Container fixed className={Styles.rootContainer}>
				{props.children}
			</Container>
		</Box>
	);
};

export default CustomContainer;
