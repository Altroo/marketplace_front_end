import React, {useMemo} from 'react';
import Styles from './mobileStepsBar.module.sass';
import { TabletAndMobile } from "../../../../utils/helpers";

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
	const {activeStep} = props;

	const steps = useMemo(() => {
		if (activeStep === '1') {
			return [true, false, false, false];
		}else if (activeStep === '2') {
			return [true, true, false, false];
		} else if (activeStep === '3') {
			return [true, true, true, false];
		} else if (activeStep === '4') {
			return [true, true, true, true];
		} else {
			return [true, false, false, false]
		}
	}, [activeStep]);

	return (
		<TabletAndMobile>
			<div className={Styles.steps}>
			{steps.map((active: boolean, i: number) => (
					<StepBar active={active} key={i}/>
				))}
			</div>
		</TabletAndMobile>
	);
};

export default MobileStepsBar;
