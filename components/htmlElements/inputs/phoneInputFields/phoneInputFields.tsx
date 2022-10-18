import React, { useEffect, useState } from 'react';
// import Styles from "./contactInput.module.sass";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Collapse, ThemeProvider } from '@mui/material';
import {CustomTheme} from '../../../../utils/themes';
import { Stack } from '@mui/material';
import { useAppSelector } from '../../../../utils/hooks';
import { SelectInputcontacterType } from '../../../../types/ui/uiTypes';

type inputProps = {
	open: boolean;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
	backgroundColor?: string;
	children?: React.ReactNode;
};

const PhoneInputFields: React.FC<inputProps> = (props: inputProps) => {
	const phoneCodes = useAppSelector((state) => state.shop.phoneCodes);
	const [phoneCodesObj, setPhoneCodesObj] = useState<Array<SelectInputcontacterType> | undefined>(undefined);

	type phoneOptions = {
		label: string;
		code: string;
	};
	const customTheme = CustomTheme(props.backgroundColor);

	const [value, setValue] = useState({ label: props.code, code: props.code });

	useEffect(() => {
		if (phoneCodes.length > 0) {
			const constructedPhoneCodes: Array<SelectInputcontacterType> | undefined = [];
			phoneCodes.map((phoneCode) => {
				constructedPhoneCodes.push({
					label: phoneCode,
					code: phoneCode,
				});
			});
			setPhoneCodesObj(constructedPhoneCodes);
		}
	}, [phoneCodes, value]);

	return (
		<Collapse in={props.open}>
			<ThemeProvider theme={customTheme}>
				<Stack direction="row" sx={{ marginTop: '1rem' }}>
					<Autocomplete
						value={value}
						onChange={(event, value) => {
							props.setCode(value.label);
							setValue({ label: value.label, code: value.code });
						}}
						/*inputValue={inputValue}
						onInputChange={(_, newInputValue) => {
							setInputValue(newInputValue);
						}}*/
						disablePortal
						disableClearable
						autoSelect
						noOptionsText="Invalide"
						// filterOptions={(x) => x}
						options={phoneCodesObj ? phoneCodesObj : [{ label: '+212', code: '+212' }]}
						sx={{ width: 205 }}
						isOptionEqualToValue={(option: phoneOptions | undefined, value: phoneOptions | undefined) =>
							option?.label === value?.label
						}
						renderInput={(params) => (
							<TextField
								{...params}
								sx={{ '& fieldset': { borderRadius: '16px 0px 0px 16px' } }}
								type="tel"
							/>
						)}
					/>
					<TextField
						value={props.value}
						type="tel"
						sx={{
							width: '100%',
							'& fieldset': {
								borderRadius: '0px 16px 16px 0px',
								borderLeft: '0px solid transparent',
							},
						}}
						placeholder="e.g : 610203040"
						onChange={(e) => {
							props.setValue(e.target.value);
						}}
					/>
				</Stack>
			</ThemeProvider>
		</Collapse>
	);
};

export default PhoneInputFields;
