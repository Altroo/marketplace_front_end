import React from "react";
import Styles from "./ajouterMesInfosStack.module.sass";
import { Box, Button, Stack } from "@mui/material";

type Props = {
	title: string;
	added: 'FULL' | 'EMPTY';
	onClick: () => void;
	content?: React.ReactNode;
};

const AjouterMesInfosStack: React.FC<Props> = (props: Props) => {
	return (
		<Stack direction="column" spacing={1}>
			<Stack direction="row" justifyContent="space-between" alignItems="center">
				<Box component="span" className={Styles.stackTitle}>
					{props.title}
				</Box>
				<Button onClick={props.onClick} className={Styles.stackButton}>
					{props.added === 'FULL' ? "Modifier" : "Ajouter"}
				</Button>
			</Stack>
			{props.added === 'EMPTY' ? <Box component="p" className={Styles.stackEmptyContent}>
				{`Vous n'avez pas encore renseigné votre ${props.title.toLowerCase()}.`}
			</Box> : <Box className={Styles.stackFullContent}>{props.content}</Box>
			}
		</Stack>
	);
};

export default AjouterMesInfosStack;
