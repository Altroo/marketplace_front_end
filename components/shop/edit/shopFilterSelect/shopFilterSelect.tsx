import * as React from 'react';
import SelectUnstyled, { SelectUnstyledProps, selectUnstyledClasses, SelectOption } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/material';
import { hexToRGB } from '../../../../utils/helpers';

const grey = {
	800: '#2D3843',
	900: '#1A2027',
};

let hoverColor = hexToRGB('#0D070B', 0.04);

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
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${grey[900]}; // text color

  &:hover {
    background: ${hoverColor}; // hover element
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
      margin-left: 15px;
    }
  }

  &::after {
    content: '▾';
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
	z-index: 1;
`;

function CustomSelect(props: SelectUnstyledProps<string>) {
	const components: SelectUnstyledProps<string>['components'] = {
		Root: StyledButton,
		Listbox: StyledListbox,
		Popper: StyledPopper,
		...props.components,
	};
	return <SelectUnstyled {...props} components={components} />;
}

function renderValue(option: SelectOption<string> | null) {
	const label = 'Trier par :';
	if (option == null) {
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
}

type Props = {
	state: 'D' | 'T';
	setStateHandler: React.Dispatch<React.SetStateAction<'D' | 'T'>>;
	activeHoverColor: string;
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
				onChange={(e) => (e ? props.setStateHandler(e as 'D' | 'T') : '')}
			>
				<StyledOption value="D">Prix décroissant</StyledOption>
				<StyledOption value="C">Prix croissant</StyledOption>
			</CustomSelect>
		</div>
	);
};

export default ShopFilterSelect;
