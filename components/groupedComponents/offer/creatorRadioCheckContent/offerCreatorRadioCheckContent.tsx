import React, {useCallback} from 'react';
import Styles from './offerCreatorRadioCheckContent.module.sass';
import { getDefaultTheme, OfferChipTheme, offerForWhomDropdownTheme } from '../../../../utils/themes';
import { ThemeProvider, Stack } from '@mui/material';
import RadioCheckElement from '../../temp-offer/radioCheckElement/radioCheckElement';
import Chip from '@mui/material/Chip';
import { useAppSelector } from '../../../../utils/hooks';
import { getAvailableCountries, getCheckUserIsCreator } from '../../../../store/selectors';
import { SelectChangeEvent } from '@mui/material/Select';
import CustomSingleCountrySelect from '../../offer/customSingleCountrySelect/customSingleCountrySelect';

type Props = {
	pickedCreator: boolean;
	togglePickedCreator: React.Dispatch<React.SetStateAction<boolean>>;
	pickedCountry: string;
	setPickedCountry: React.Dispatch<React.SetStateAction<string>>;
	switchOpen: boolean;
	children?: React.ReactNode;
};

const defaultTheme = getDefaultTheme();
const chipTheme = OfferChipTheme();
const madeInFieldTheme = offerForWhomDropdownTheme();

const OfferCreatorRadioCheckContent: React.FC<Props> = (props: Props) => {
	const {togglePickedCreator} = props;
	const availableCountries = useAppSelector(getAvailableCountries);
	const isCreator = useAppSelector(getCheckUserIsCreator);

	const toggleCreatorState = useCallback(() => {
		togglePickedCreator((prevState) => {
			return !prevState;
		});
	}, [togglePickedCreator]);


	return (
		<ThemeProvider theme={defaultTheme}>
			<RadioCheckElement title="Labels" defaultValue={props.switchOpen}>
				<Stack direction="column" spacing={2}>
					{isCreator && (
						<>
							<span className={Styles.creatorLabel}>Produit original &quot;Creator&quot;</span>
							<ThemeProvider theme={chipTheme}>
								<Stack direction="row" flexWrap="wrap" gap={2} alignItems="center" sx={{ marginTop: '6px' }}>
									<Chip
										label="Oui"
										variant={props.pickedCreator ? 'filled' : 'outlined'}
										onClick={() => {
											toggleCreatorState();
										}}
									/>
									<Chip
										label="Non"
										variant={!props.pickedCreator ? 'filled' : 'outlined'}
										onClick={() => {
											toggleCreatorState();
										}}
									/>
								</Stack>
							</ThemeProvider>
						</>
					)}
					<CustomSingleCountrySelect
						onChange={(e: SelectChangeEvent) => {
							props.setPickedCountry(e.target.value);
						}}
						value={props.pickedCountry}
						id="made_in"
						label="Made in"
						items={availableCountries}
						theme={madeInFieldTheme}
						disabled={false}
						cssClass={Styles.inputFieldWidth}
					/>
				</Stack>
			</RadioCheckElement>
		</ThemeProvider>
	);
};

export default OfferCreatorRadioCheckContent;
