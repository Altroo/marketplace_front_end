import React from 'react';
import Styles from './creatorRadioCheckContent.module.sass';
import { getDefaultTheme, OfferChipTheme, offerForWhomDropdownTheme } from "../../../../../utils/themes";
import { ThemeProvider, Stack, Grid } from '@mui/material';
import RadioCheckElement from '../radioCheckElement';
import Chip from '@mui/material/Chip';
import { OfferSizesListType } from '../../../../../types/ui/uiTypes';
import CustomDropDownChoices from '../../../../formikElements/customDropDownChoices/customDropDownChoices';

type Props = {
	children?: React.ReactNode;
};

const CreatorRadioCheckContent: React.FC<Props> = (props: Props) => {
	const defaultTheme = getDefaultTheme();
	// const [yesState, setYesState] = useState<boolean>(false);
	// const [noState, setNoState] = useState<boolean>(false);
	// const availableSizesList: Array<OfferSizesListType> = [
	// 	{
	// 		value: 'Oui',
	// 		state: xsState,
	// 		setState: setXsState,
	// 	},
	// ];

	const chipTheme = OfferChipTheme();
	const madeInFieldTheme = offerForWhomDropdownTheme();
	return (
		<ThemeProvider theme={defaultTheme}>
			<RadioCheckElement title="Labels">
				<Stack direction="column" gap={2}>
					<span className={Styles.creatorLabel}>Produit original &quot;Creator&quot;</span>
					<ThemeProvider theme={chipTheme}>
						<Stack direction="row" flexWrap="wrap" gap={2} alignItems="center" sx={{ marginTop: '6px' }}>
							<Chip label="Oui" variant="outlined" disabled={true} />
							<Chip label="Non" variant="outlined" disabled={true} />
						</Stack>
					</ThemeProvider>
					{/* eslint-disable-next-line */}
					<CustomDropDownChoices onChange={() => {}}
						id="made_in"
						label="Made in"
						items={[""]}
						theme={madeInFieldTheme}
						value={[""]}
						disabled={true}
					/>
				</Stack>
			</RadioCheckElement>
		</ThemeProvider>
	);
};

export default CreatorRadioCheckContent;
