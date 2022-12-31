import React, { useMemo } from 'react';
import Styles from './leftSideBar.module.sass';
import LogoSVG from '../../../../public/assets/svgs/globalIcons/logo.svg';
import RightArrowSVG from '../../../../public/assets/svgs/navigationIcons/right-arrow-long.svg';
import StepActiveSVG from '../../../../public/assets/svgs/navigationIcons/step-check.svg';
import StepOneSVG from '../../../../public/assets/svgs/navigationIcons/step-1.svg';
import StepTwoSVG from '../../../../public/assets/svgs/navigationIcons/step-2.svg';
import StepThreeSVG from '../../../../public/assets/svgs/navigationIcons/step-3.svg';
import StepFourSVG from '../../../../public/assets/svgs/navigationIcons/step-4.svg';
import StepTwoBlackSVG from '../../../../public/assets/svgs/navigationIcons/second-step-black.svg';
import StepThreeBlackSVG from '../../../../public/assets/svgs/navigationIcons/step-three-black.svg';
import StepFourBlackSVG from '../../../../public/assets/svgs/navigationIcons/fourth-step-black.svg';
import Image from 'next/image';
import { Desktop } from '../../../../utils/helpers';

const Spacer = () => <div className={Styles.OneRemSpace}></div>;

type SideBarProps = {
	element: { stepImage: string; title: string; textColor: string; active: boolean };
	children?: React.ReactNode;
};
const SideBarElem: React.FC<SideBarProps> = (props: SideBarProps) => {
	const element = props.element;

	return (
		<>
			<div className={Styles.sideBarItemWrapper}>
				<div className={Styles.sideBarItem}>
					<Image src={element.stepImage} alt="" width="32" height="32" sizes="100vw" />
					<span style={{ color: element.active ? element.textColor : '#84848A' }}>{element.title}</span>
				</div>
				{element.active && <Image src={RightArrowSVG} alt="" width="18" height="18" sizes="100vw" />}
			</div>
			<Spacer />
			<Spacer />
		</>
	);
};

function generateColorArray(i: number) {
	const colorsArray = ['#84848A', '#84848A', '#84848A', '#84848A'];
	colorsArray[i] = '#0D070B';
	return colorsArray;
}

type Props = {
	step: '1' | '2' | '3' | '4';
	which: 'SHOP' | 'PRODUCT' | 'SERVICE';
	children?: React.ReactNode;
};

const LeftSideBar: React.FC<Props> = (props: Props) => {

	const elements = useMemo(() => {
		if (props.which === 'SHOP') {
			return ['Nom de boutique', 'Image', 'Couleur', 'Police'];
		} else if (props.which === 'PRODUCT') {
			return ['Catégories', 'Description', 'Prix', 'Livraison'];
		} else {
			return ['Catégories', 'Description', 'Prix'];
		}
	}, [props.which]);

	const newIconArray = useMemo(() => {
		if (props.step === '1') {
			return [StepOneSVG, StepTwoSVG, StepThreeSVG, StepFourSVG];
		} else if (props.step === '2') {
			return [StepActiveSVG, StepTwoBlackSVG, StepThreeSVG, StepFourSVG];
		} else if (props.step === '3') {
			return [StepActiveSVG, StepActiveSVG, StepThreeBlackSVG, StepFourSVG];
		} else if (props.step === '4') {
			return [StepActiveSVG, StepActiveSVG, StepActiveSVG, StepFourBlackSVG];
		} else {
			return [];
		}
	}, [props.step]);

	return (
		<Desktop>
			<aside className={Styles.sideBar}>
				<div>
					<Image src={LogoSVG} alt="" width="152" height="40" sizes="100vw" />
				</div>
				<Spacer />
				<Spacer />
				<Spacer />
				{elements.map((elem: string, i: number) => (
					<SideBarElem
						key={i}
						element={{
							stepImage: newIconArray[i],
							title: elem,
							textColor: generateColorArray(i)[i],
							active: i == parseInt(props.step) - 1,
						}}
					/>
				))}
			</aside>
		</Desktop>
	);
};

export default LeftSideBar;
