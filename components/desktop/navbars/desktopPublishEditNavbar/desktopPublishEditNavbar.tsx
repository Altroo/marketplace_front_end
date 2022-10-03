import React from 'react';
import Styles from './desktopPublishEditNavbar.module.sass';
import PrimaryButton from '../../../htmlElements/buttons/primaryButton/primaryButton';
import EditIconSVG from '../../../../public/assets/svgs/globalIcons/blue-pencil.svg';

import DropDownMenu from '../../../htmlElements/buttons/dropDownMenu/dropDownMenu';
import { DropDownActionType } from '../../../../types/ui/uiTypes';
import { Stack } from "@mui/material";

type Props = {
	menuID: string;
	buttonID: string;
	actions: DropDownActionType;
	buttonTitle: string;
	onClick: () => void;
	dropDownText: string;
	hideLeftButton?: boolean;
	children?: React.ReactNode;
};

const DesktopPublishEditNavbar: React.FC<Props> = (props: Props) => {
	return (
		<Stack direction="row" justifyContent="space-between">
			<div>
				<div hidden={props.hideLeftButton}>
					<PrimaryButton buttonText={props.buttonTitle} active onClick={props.onClick} cssClass={Styles.publishButton} />
				</div>
			</div>
			<DropDownMenu
				dropDownText={props.dropDownText}
				dropDownIcon={EditIconSVG}
				actions={props.actions}
				menuID={props.menuID}
				buttonID={props.buttonID}
			/>
		</Stack>
	);
};

export default DesktopPublishEditNavbar;
