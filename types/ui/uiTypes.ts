import { OverridableStringUnion } from '@mui/types';
import { ChipPropsVariantOverrides } from '@mui/material/Chip/Chip';
import React from 'react';

type EditDropDownType = {
	text: string;
	onClick: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
	icon?: string;
};
export type DropDownActionType = Array<EditDropDownType>;

export type DropDownVariantType = 'menu' | 'selectedMenu';
type chipActionType = {
	selected: boolean;
	buttonText: string;
	onClick?: () => void;
	border?: string;
	textColor?: string;
	backgroundColor?: string;
	disabled?: boolean;
};
export type chipActionsType = Array<chipActionType>;
export type chipVariantType = OverridableStringUnion<'filled' | 'outlined', ChipPropsVariantOverrides>;

export type checkBoxForWhomType = {
	text: string;
	checked: boolean;
	active: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	activeColor?: string;
	children?: React.ReactNode;
};

export type checkBoxesForWhomActionType = {
	onChange: (value: ((prevState: boolean) => boolean) | boolean) => void;
	checked: boolean;
	active: boolean;
	activeColor: string;
	text: string;
};

export interface checkBoxForWhomBaseType extends Omit<checkBoxForWhomType, 'onChange'> {
	text: string;
	checked: boolean;
	active: boolean;
	onChange?: React.Dispatch<React.SetStateAction<boolean>>;
	activeColor?: string;
	children?: React.ReactNode;
}

export type switchActionType = {
	checked: boolean;
	onChange: React.Dispatch<React.SetStateAction<boolean>>;
	activeColor?: string;
};

export type contacterPhoneInputType = {
	checked: boolean;
	setStateHandler: (value: boolean) => void;
	icon: string;
	label: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	code: string;
	setCode: React.Dispatch<React.SetStateAction<string>>;
	backgroundColor?: string;
	children?: React.ReactNode;
};

export type SelectInputcontacterType = {
	label: string;
	code: string;
};

export type addMyInfosStackType = {
	title: 'Nom' | 'Bio' | 'Horaire' | 'Coordonées' | 'Adresse';
	// edit shop name
	openEditModal: boolean;
	setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
	// openEditShopNameModal: boolean;
	// setOpenEditShopNameModal: React.Dispatch<React.SetStateAction<boolean>>;
	// // edit bio
	// openEditBioModal: boolean;
	// setOpenEditBioModal: React.Dispatch<React.SetStateAction<boolean>>;
	// // edit horaire
	// openEditHoraireModal: boolean;
	// setOpenEditHoraireModal: React.Dispatch<React.SetStateAction<boolean>>;
	// // edit coordonée
	// openEditCoordoneeModal: boolean;
	// setOpenEditCoordoneeModal: React.Dispatch<React.SetStateAction<boolean>>;
	// // edit address
	// openEditAdressModal: boolean;
	// setOpenEditAdressModal: React.Dispatch<React.SetStateAction<boolean>>;
	added: boolean;
	content?: React.ReactNode;
}
