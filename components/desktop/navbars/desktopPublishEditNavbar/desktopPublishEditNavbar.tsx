import React from 'react';
import Styles from './desktopPublishEditNavbar.module.sass';
import PrimaryButton from '../../../htmlElements/buttons/primaryButton/primaryButton';
import EditIconSVG from '../../../../public/assets/svgs/blue-pencil.svg';
import InfoIconSVG from '../../../../public/assets/svgs/drop-down-info.svg';
import AvatarIconSVG from '../../../../public/assets/svgs/drop-down-avatar.svg';
import ColorIconSVG from '../../../../public/assets/svgs/drop-down-color.svg';
import FontIconSVG from '../../../../public/assets/svgs/drop-down-font.svg';

import DropDownMenu from '../../../htmlElements/buttons/dropDownMenu/dropDownMenu';
import { DropDownActionType } from '../../../../types/ui/uiTypes';

type Props = {
	menuID: string;
	buttonID: string;
	onClick: () => void;
	children?: React.ReactNode;
};

const DesktopPublishEditNavbar: React.FC<Props> = (props: Props) => {
	const dropDownActions: DropDownActionType = [
		{
			icon: InfoIconSVG,
			text: 'Mes infos',
			onClick: () => {return;},
		},
		{
			icon: AvatarIconSVG,
			text: 'Photo de profil',
			onClick: () => {return;},
		},
		{
			icon: ColorIconSVG,
			text: 'Couleur de la boutique',
			onClick: () => {return;},
		},
		{
			icon: FontIconSVG,
			text: 'Police du titre',
			onClick: () => {return;},
		},
	];

	return (
		<div className={Styles.navWrapper}>
			<div>
				<PrimaryButton buttonText="Publier" active onClick={props.onClick} cssClass={Styles.publishButton} />
			</div>
			<DropDownMenu
				dropDownText="Éditer"
				dropDownIcon={EditIconSVG}
				actions={dropDownActions}
				menuID={props.menuID}
				buttonID={props.buttonID}
			/>
		</div>
	);
};

export default DesktopPublishEditNavbar;
