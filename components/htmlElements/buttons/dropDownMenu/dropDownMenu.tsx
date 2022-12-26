import React, { useState, MouseEvent } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Styles from './dropDownMenu.module.sass';
import { DropDownActionType, DropDownVariantType } from '../../../../types/ui/uiTypes';
import { ThemeProvider } from '@mui/material';
import { getDropDownMenuTheme } from '../../../../utils/themes';
import Image from 'next/image';

type Props = {
	menuID: string;
	buttonID: string;
	actions: DropDownActionType;
	dropDownText?: string;
	dropDownIcon: string;
	variant?: DropDownVariantType;
	iconButton?: React.ReactNode;
	children?: React.ReactNode;
};

const DropDownMenu: React.FC<Props> = (props: Props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const customTheme = getDropDownMenuTheme();
	return (
		<div className={Styles.dropDownWrapper}>
			<ThemeProvider theme={customTheme}>
				{props.iconButton ? (
					props.iconButton
				) : (
					<Button
						id={props.buttonID}
						aria-controls={open ? `${props.menuID}` : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
						endIcon={<Image src={props.dropDownIcon} alt="" sizes="100vw" />}
					>
						{props.dropDownText}
					</Button>
				)}
				<Menu
					variant={props.variant ? props.variant : 'menu'}
					id={props.menuID}
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': `${props.buttonID}`,
					}}
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
export default DropDownMenu;
