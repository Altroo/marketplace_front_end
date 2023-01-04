import React, { useState, MouseEvent } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Styles from './iconDropDownMenu.module.sass';
import { DropDownActionType, DropDownVariantType } from '../../../../types/ui/uiTypes';
import { ThemeProvider } from '@mui/material';
import { getDropDownMenuTheme } from '../../../../utils/themes';
import Image from 'next/image';
import EditBlueSVG from '../../../../public/assets/svgs/globalIcons/edit-blue.svg';

const customTheme = getDropDownMenuTheme();

type Props = {
	menuID: string;
	buttonID: string;
	actions: DropDownActionType;
	variant?: DropDownVariantType;
	children?: React.ReactNode;
};

const IconDropDownMenu: React.FC<Props> = (props: Props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLImageElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={Styles.dropDownWrapper}>
			<ThemeProvider theme={customTheme}>
				<Image
					id={props.buttonID}
					src={EditBlueSVG}
					alt=""
					width="32"
					height="32"
					aria-controls={open ? `${props.menuID}` : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={(e) => handleClick(e)}
					style={{ cursor: 'pointer' }}
				/>
				<Menu
					variant={props.variant ? props.variant : 'menu'}
					id={props.menuID}
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': `${props.buttonID}`,
					}}
					disableScrollLock={true}
				>
					{props.actions.map((action, index) => {
						return (
							<MenuItem
								disabled={action.disabled ? action.disabled : false}
								onClick={() => {
									if (action.onClick) {
										action.onClick(true);
									}
									handleClose();
								}}
								key={index}
								className={`${Styles.menuItem} ${action.text === 'Supprimer' ? Styles.deleteColor : null} `}
							>
								{action.icon && (
									<Image src={action.icon} alt="" width="0" height="0" sizes="100vw" className={Styles.icon} />
								)}
								{action.text}
							</MenuItem>
						);
					})}
				</Menu>
			</ThemeProvider>
		</div>
	);
};
export default IconDropDownMenu;
