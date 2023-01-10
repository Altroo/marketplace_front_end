import React from 'react';
import Styles from './defaultSeoTextContent.module.sass';
import { Stack, ThemeProvider } from "@mui/material";
import Chip from "@mui/material/Chip";
import { ReadOnlyChipsTheme } from "../../../../utils/themes";

type Props = {
	h_one: string;
	tags: Array<string>;
	h_two: string;
	paragraphe: string;
	filterMargin?: boolean;
	children?: React.ReactNode;
};

const DefaultSeoTextContent: React.FC<Props> = (props: Props) => {
	const {h_one, tags, h_two, paragraphe, filterMargin} = props;

	return (
		<Stack direction="column" spacing="30px" className={`${Styles.rootStack} ${filterMargin && Styles.filterMargin}`} component="article">
			<Stack direction="column">
				<span className={Styles.pageType}>COLLECTIONS</span>
				<h1 className={Styles.pageTitle}>{h_one}</h1>
				<ThemeProvider theme={ReadOnlyChipsTheme()}>
					<Stack direction="row" flexWrap="wrap" className={Styles.rootChipStack}>
						{tags.map((tag, index) => {
							return <Chip key={index} label={tag} variant="filled" />;
						})}
					</Stack>
				</ThemeProvider>
			</Stack>
			<Stack direction="column">
				<h2 className={Styles.header}>{h_two}</h2>
				<p className={Styles.paragraphe}>{paragraphe}</p>
			</Stack>
		</Stack>
	);
};

export default DefaultSeoTextContent;
