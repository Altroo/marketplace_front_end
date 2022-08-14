import React from 'react';
import Styles from './textInput.module.sass';

type Props = {
	value: string;
	placeholder: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	children?: React.ReactNode;
};

const TextInput: React.FC<Props> = (props: Props) => {
	return (
		<input
			value={props.value}
			onChange={props.onChange}
			type="text"
			className={Styles.textInput}
			placeholder={props.placeholder}
		/>
	);
};

export default TextInput;
