import React from 'react';
import Styles from './mobilePublishEditNavbar.module.sass';
import PrimaryButton from '../../../htmlElements/buttons/primaryButton/primaryButton';
import EditIconSVG from '../../../../public/assets/svgs/globalIcons/blue-pencil.svg';

import DropDownMenu from '../../../htmlElements/buttons/dropDownMenu/dropDownMenu';
import { DropDownActionType } from '../../../../types/ui/uiTypes';

type Props = {
	menuID: string;
	buttonID: string;
	actions: DropDownActionType;
	onPublish: () => void;
	children?: React.ReactNode;
};

const MobilePublishEditNavbar: React.FC<Props> = (props: Props) => {

	return (
		<div className={Styles.navWrapper}>
			<div>
				<PrimaryButton buttonText="Publier" active onClick={props.onPublish} cssClass={Styles.publishButton} />
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

export default MobilePublishEditNavbar;
