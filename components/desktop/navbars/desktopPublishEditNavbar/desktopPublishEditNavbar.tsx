import React from 'react';
import Styles from './desktopPublishEditNavbar.module.sass';
import PrimaryButton from '../../../htmlElements/buttons/primaryButton/primaryButton';
import EditIconSVG from '../../../../public/assets/svgs/blue-pencil.svg';

import DropDownMenu from '../../../htmlElements/buttons/dropDownMenu/dropDownMenu';
import { DropDownActionType } from '../../../../types/ui/uiTypes';

type Props = {
	menuID: string;
	buttonID: string;
	actions: DropDownActionType;
	onClick: () => void;
	children?: React.ReactNode;
};

const DesktopPublishEditNavbar: React.FC<Props> = (props: Props) => {

	return (
		<div className={Styles.navWrapper}>
			<div>
				<PrimaryButton buttonText="Publier" active onClick={props.onClick} cssClass={Styles.publishButton} />
			</div>
			<DropDownMenu
				dropDownText="Éditer"
				dropDownIcon={EditIconSVG}
				actions={props.actions}
				menuID={props.menuID}
				buttonID={props.buttonID}
			/>
		</div>
	);
};

export default DesktopPublishEditNavbar;
