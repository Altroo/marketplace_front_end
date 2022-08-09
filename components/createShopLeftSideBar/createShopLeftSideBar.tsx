import React from 'react';
import Image from 'next/image';
import ShopStyles from '../../styles/shop/shop.module.sass';
import Logo from '../../public/assets/svgs/logo.svg';
import RightArrow from '../../public/assets/svgs/right-arrow-long.svg';
import FStep from '../../public/assets/svgs/step-1.svg';
import SecondStep from '../../public/assets/svgs/step-2.svg';
import ThirdStep from '../../public/assets/svgs/step-3.svg';
import FourthStep from '../../public/assets/svgs/step-4.svg';
import SecondStepBlack from '../../public/assets/svgs/second-step-black.svg';
import Check from '../../public/assets/svgs/step-check.svg';
import ThirdStepBlack from '../../public/assets/svgs/step-three-black.svg';
import FourthStepBlack from '../../public/assets/svgs/fourth-step-black.svg';
import Styles from './createShopLeftSideBar.module.sass';

const Spacer = () => <div className={ShopStyles.spacerOneRem}></div>;

type SideBarElemType = {
	imgSrc: string,
	text: string,
	textColor: string,
	pointedAt: boolean
}

const SideBarElem = ({ imgSrc, text, textColor, pointedAt }: SideBarElemType) => {
	return (
		<>
			<div className={Styles.sideBarItemWrapper}>
				<div className={Styles.sideBarItem}>
					<Image alt="" src={imgSrc} width={32} height={32} className={Styles.fillSvg} />
					<span style={{color: textColor}}>{text}</span>
				</div>
				{pointedAt && <Image alt="" src={RightArrow} width={18} height={18} />}
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
	stepOne?: boolean;
	stepTwo?: boolean;
	stepThree?: boolean;
	stepFour?: boolean;
	contentArray: Array<string>
	children?: React.ReactNode;
};

export const CreateShopLeftSideBar: React.FC<Props> = ({ stepOne, stepTwo, stepThree, stepFour, contentArray }: Props) => {
	const elements = contentArray ? contentArray : ['Catégories', 'Description', 'Prix', 'Livraison'];
	const fstepArray = [FStep, SecondStep, ThirdStep, FourthStep];
	const secondStepArray = [Check, SecondStepBlack, ThirdStep, FourthStep];
	const thirdStepArray = [Check, Check, ThirdStepBlack, FourthStep];
	const fourthStepArray = [Check, Check, Check, FourthStepBlack];

	let imgArray: Array<string> = [];
	let colorsArray: Array<string> = [];

	let currentStep = 0;

	const setImgArray = () => {
		imgArray = stepOne
			? fstepArray
			: stepTwo
			? secondStepArray
			: stepThree
			? thirdStepArray
			: stepFour
			? fourthStepArray
			: [];
		colorsArray = stepOne
			? generateColorArray(0)
			: stepTwo
			? generateColorArray(1)
			: stepThree
			? generateColorArray(2)
			: stepFour
			? generateColorArray(3)
			: [];
		currentStep = stepOne ? 0 : stepTwo ? 1 : stepThree ? 2 : stepFour ? 3 : 0;
	};

	setImgArray();

	return (
		<>
			<aside className={Styles.sideBar}>
				<div>
					<Image src={Logo} width={152} height={40} alt="" />
				</div>
				<Spacer />
				<Spacer />
				<Spacer />
				{elements.map((elem: string, i: number) => (
					<SideBarElem
						key={i}
						imgSrc={imgArray[i]}
						text={elem}
						textColor={colorsArray[i]}
						pointedAt={i == currentStep}
					/>
				))}
			</aside>
		</>
	);
};
