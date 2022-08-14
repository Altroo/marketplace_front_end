import React from 'react';
import Styles from './mobileStepsBar.module.sass';

type StepBarProps = {
	active: boolean;
	children?: React.ReactNode;
};

const StepBar: React.FC<StepBarProps> = (props: StepBarProps) => {
	return <div className={`${Styles.step} ${props.active ? `${Styles.stepActive}` : ''}`}>&nbsp;</div>
}

type Props = {
	activeStep: '1' | '2' | '3' | '4';
	children?: React.ReactNode;
};

const MobileStepsBar: React.FC<Props> = (props: Props) => {
	let steps: Array<boolean> = [true, false, false, false];
	if (props.activeStep === '1') {
		steps = [true, false, false, false];
	}else if (props.activeStep === '2') {
		steps = [true, true, false, false];
	} else if (props.activeStep === '3') {
		steps = [true, true, true, false];
	} else if (props.activeStep === '4') {
		steps = [true, true, true, true];
	}
	return (
		<div className={Styles.steps}>
			{steps.map((active: boolean, i: number) => (
				<StepBar active={active} key={i}/>
			))}
		</div>
	);
};

export default MobileStepsBar;
