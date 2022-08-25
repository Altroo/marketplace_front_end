import React from 'react';
import Styles from './leftSideBar.module.sass';
import Image from 'next/image';
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
					<Image alt="" src={element.stepImage} width={32} height={32} />
					<span style={{ color: element.textColor }}>{element.title}</span>
				</div>
				{element.active && <Image alt="" src={RightArrowSVG} width={18} height={18} />}
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
	let elements: Array<string>;

	if (props.which === 'SHOP') {
		elements = ['Nom de boutique', 'Image', 'Couleur', 'Police'];
	}else if (props.which === 'PRODUCT') {
		elements = ['Catégories', 'Description', 'Prix', 'Livraison'];
	} else {
		elements = ['Catégories', 'Description', 'Prix', 'Localisation'];
	}

	let newIconArray: Array<string> = [];

	if (props.step === '1') {
		newIconArray = [StepOneSVG, StepTwoSVG, StepThreeSVG, StepFourSVG];
	} else if (props.step === '2') {
		newIconArray = [StepActiveSVG, StepTwoBlackSVG, StepThreeSVG, StepFourSVG];
	} else if (props.step === '3') {
		newIconArray = [StepActiveSVG, StepActiveSVG, StepThreeBlackSVG, StepFourSVG];
	} else if (props.step === '4') {
		newIconArray = [StepActiveSVG, StepActiveSVG, StepActiveSVG, StepFourBlackSVG];
	}

	return (
		<aside className={Styles.sideBar}>
			<div>
				<Image src={LogoSVG} width={152} height={40} alt="" />
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
	);
};

export default LeftSideBar;
