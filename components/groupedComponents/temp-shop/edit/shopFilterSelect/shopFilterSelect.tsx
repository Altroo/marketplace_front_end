import React from 'react';
import SelectUnstyled, { SelectUnstyledProps, selectUnstyledClasses, SelectOption } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/material';
import { hexToRGB } from '../../../../../utils/helpers';
import Styles from './shopFilterSelect.module.sass';

const grey = {
	800: '#2D3843',
	900: '#1A2027',
};

let hoverColor = hexToRGB('#0D070B', 0.04);

const filterDropUpSVG = '<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.50002 5.33317C8.67068 5.33317 8.84135 5.3985 8.97135 5.5285L12.3047 8.86183C12.5653 9.1225 12.5653 9.54383 12.3047 9.8045C12.044 10.0652 11.6227 10.0652 11.362 9.8045L8.50002 6.9425L5.63802 9.8045C5.37735 10.0652 4.95602 10.0652 4.69535 9.8045C4.43468 9.54383 4.43468 9.1225 4.69535 8.86183L8.02868 5.5285C8.15868 5.3985 8.32935 5.33317 8.50002 5.33317" fill="#84848A"/></svg>';
const filterDropDownSVG = '<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.49998 10.6668C8.32932 10.6668 8.15865 10.6015 8.02865 10.4715L4.69532 7.13817C4.43465 6.8775 4.43465 6.45617 4.69532 6.1955C4.95598 5.93483 5.37732 5.93483 5.63798 6.1955L8.49998 9.0575L11.362 6.1955C11.6227 5.93483 12.044 5.93483 12.3047 6.1955C12.5653 6.45617 12.5653 6.8775 12.3047 7.13817L8.97132 10.4715C8.84132 10.6015 8.67065 10.6668 8.49998 10.6668" fill="#84848A"/></svg>';
const openSVGURL = 'data:image/svg+xml;base64,' + Buffer.from(filterDropUpSVG).toString('base64');
const closeSVGURL = 'data:image/svg+xml;base64,' + Buffer.from(filterDropDownSVG).toString('base64');

const StyledButton = styled('button')(
	() => `
  font-family: Poppins, sans-serif;
  font-size: 17px;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 220px;
  background: #fff;
  border: 0px solid ${grey[800]}; // border color
  border-radius: 0.75em;
  margin-top: 1rem;
  margin-bottom: 1rem;
  text-align: left;
  line-height: 1.5;
  padding-left: 0px;
  padding-right: 0px;
  color: ${grey[900]}; // text color

  &:hover {
    background: ${hoverColor}; // hover element
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: url(${openSVGURL});
      margin-left: 15px;
    }
  }

  &::after {
    content: url(${closeSVGURL});
    float: right;
    margin-left: 15px;
  }
  `,
);

const StyledListbox = styled('ul')(
	() => `
  font-family: Poppins, sans-serif;
  font-size: 17px;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 220px;
  border-radius: 0.75em;
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
	() => `
  list-style: none;
  padding: 8px;
  margin: 5px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background: ${hoverColor}; // hovered item
  }
  `,
);

const StyledPopper = styled(PopperUnstyled)`
	color: #0d070b;
	background-color: white;
	z-index: 1;
	border-radius: 0.45em;
`;

function CustomSelect(props: SelectUnstyledProps<string>) {
	const components: SelectUnstyledProps<string>['slots'] = {
		root: StyledButton,
		listbox: StyledListbox,
		popper: StyledPopper,
		...props.slots,
	};
	return <SelectUnstyled {...props} slots={components} className={Styles.mobileOption} />;
}

const renderValue = (option: SelectOption<string> | null) => {
	const label = 'Trier par :';
	if (option === null) {
		return <span>{label}</span>;
	} else if (option.value === 'D') {
		return (
			<span>
				{label} {'Prix décroissant'}
			</span>
		);
	} else if (option.value === 'C') {
		return (
			<span>
				{label} {'Prix croissant'}
			</span>
		);
	}
};

type Props = {
	state: 'D' | 'C';
	setStateHandler: React.Dispatch<React.SetStateAction<'D' | 'C'>>;
	activeHoverColor: string;
	onChange: (
		e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent | React.FocusEvent | null,
		value: string | null,
	) => void;
	children?: React.ReactNode;
};

const ShopFilterSelect: React.FC<Props> = (props: Props) => {

	if (props.activeHoverColor) {
		if (props.activeHoverColor !== '#FFFFFF') {
			hoverColor = hexToRGB(props.activeHoverColor, 0.04);
		}
	}

	return (
		<div>
			<CustomSelect
				renderValue={renderValue}
				value={props.state}
				onChange={props.onChange}
				className={Styles.mobileSelect}
			>
				<StyledOption value="D">
					Prix décroissant
				</StyledOption>
				<StyledOption value="C">
					Prix croissant
				</StyledOption>
			</CustomSelect>
		</div>
	);
};

export default ShopFilterSelect;
