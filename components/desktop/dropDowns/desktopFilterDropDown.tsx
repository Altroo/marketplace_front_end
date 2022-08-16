import React from 'react';
import Styles from './desktopFilterDropDown.module.sass';
import { DropDownActionType } from '../../../types/ui/uiTypes';
import ArrowDownIconSVG from '../../../public/assets/svgs/arrow-down.svg';
import DropDownMenu from '../../htmlElements/buttons/dropDownMenu/dropDownMenu';

type Props = {
	menuID: string;
	buttonID: string;
	onClick: () => void;
	backgroundColor?: string;
	children?: React.ReactNode;
};

const DesktopFilterDropDown: React.FC<Props> = (props: Props) => {
	const dropDownActions: DropDownActionType = [
		{
			text: 'Prix décroissant',
			onClick: () => {return;},
		},
		{
			text: 'Prix croissant',
			onClick: () => {return;},
		},
	];

	return (
		<div className={Styles.navWrapper}>
			<DropDownMenu
				variant="selectedMenu"
				dropDownText="Trier"
				dropDownIcon={ArrowDownIconSVG}
				actions={dropDownActions}
				menuID={props.menuID}
				buttonID={props.buttonID}
			/>
		</div>
	);
};

export default DesktopFilterDropDown;
