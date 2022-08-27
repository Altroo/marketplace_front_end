import React, { useState, MouseEvent } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Styles from './dropDownMenu.module.sass';
import Image from 'next/image';
import { DropDownActionType, DropDownVariantType } from '../../../../types/ui/uiTypes';
import { createTheme, ThemeProvider } from '@mui/material';

type Props = {
	menuID: string;
	buttonID: string;
	dropDownText: string;
	dropDownIcon: string;
	actions: DropDownActionType;
	variant?: DropDownVariantType;
	children?: React.ReactNode;
};

const menuTheme = createTheme({
	components: {
		MuiMenu: {
			styleOverrides: {
				paper: {
					boxShadow: '0 2.80058px 11.2023px rgba(13, 7, 11, 0.2) !important',
					borderRadius: '30px !important',
					padding: '10px',
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					fontFamily: 'Poppins',
					fontSize: '17px',
					color: '#0D070B',
					margin: '0',
				},
			},
		},
	},
});

const DropDownMenu: React.FC<Props> = (props: Props) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div className={Styles.dropDownWrapper}>
			<Button
				id={props.buttonID}
				aria-controls={open ? `${props.menuID}` : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
				endIcon={<Image src={props.dropDownIcon} alt="" />}
			>
				{props.dropDownText}
			</Button>
			<ThemeProvider theme={menuTheme}>
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
							<MenuItem onClick={() => {
								action.onClick(true);
								handleClose();
							}} key={index} className={Styles.menuItem}>
								{action.icon && <Image src={action.icon} alt="" />}
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
