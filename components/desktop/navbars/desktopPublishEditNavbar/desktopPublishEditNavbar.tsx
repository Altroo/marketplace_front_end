import React from 'react';
import Styles from './desktopPublishEditNavbar.module.sass';
import PrimaryButton from '../../../htmlElements/buttons/primaryButton/primaryButton';
import EditIconSVG from '../../../../public/assets/svgs/globalIcons/blue-pencil.svg';

import DropDownMenu from '../../../htmlElements/buttons/dropDownMenu/dropDownMenu';
import { DropDownActionType } from '../../../../types/ui/uiTypes';

type Props = {
	menuID: string;
	buttonID: string;
	actions: DropDownActionType;
	buttonTitle: string;
	onClick: () => void;
	dropDownText: string;
	children?: React.ReactNode;
};

const DesktopPublishEditNavbar: React.FC<Props> = (props: Props) => {
	return (
		<div className={Styles.navWrapper}>
			<div>
				<PrimaryButton buttonText={props.buttonTitle} active onClick={props.onClick} cssClass={Styles.publishButton} />
			</div>
			<DropDownMenu
				dropDownText={props.dropDownText}
				dropDownIcon={EditIconSVG}
				actions={props.actions}
				menuID={props.menuID}
				buttonID={props.buttonID}
			/>
		</div>
	);
};

export default DesktopPublishEditNavbar;
