import React from 'react';
import Styles from './contacterPhoneInput.module.sass';
import Image from 'next/image';
import IosSwitch from '../../../htmlElements/switches/iosSwitch';
import PhoneInputFields from '../../../htmlElements/inputs/phoneInputFields/phoneInputFields';


type Props = {
	checked: boolean;
	setStateHandler: (value: boolean) => void;
	icon: string;
	label: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
	backgroundColor?: string;
	children?: React.ReactNode;
};

const ContacterPhoneInput: React.FC<Props> = (props: Props) => {
	return (
		<>
			<div className={Styles.switchBoxWrapper}>
				<div className={Styles.iconTextWrapper}>
					<Image src={props.icon} width={40} height={40} alt="" />
					<span>{props.label}</span>
				</div>
				<IosSwitch
					checked={props.checked}
					onChange={props.setStateHandler}
					activeColor={props.backgroundColor}
					labelcssStyles={{ marginRight: '0px' }}
				/>
			</div>
			<PhoneInputFields
				open={props.checked}
				backgroundColor={props.backgroundColor}
				value={props.value}
				setValue={props.setValue}
				code={props.code}
				setCode={props.setCode}
			/>
		</>
	);
};

export default ContacterPhoneInput;
