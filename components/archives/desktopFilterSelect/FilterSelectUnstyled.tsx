import * as React from 'react';
import SelectUnstyled, { SelectUnstyledProps, selectUnstyledClasses, SelectOption } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { optionUnstyledClasses } from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import { styled } from '@mui/system';
import Styles from './FilterSelectUnstyled.module.sass';

const blue = {
	100: '#DAECFF',
	200: '#99CCF3',
	400: '#3399FF',
	500: '#007FFF',
	600: '#0072E5',
	900: '#003A75',
};

const grey = {
	100: '#E7EBF0',
	200: '#E0E3E7',
	300: '#CDD2D7',
	400: '#B2BAC2',
	500: '#A0AAB4',
	600: '#6F7E8C',
	700: '#3E5060',
	800: '#2D3843',
	900: '#1A2027',
};

const StyledButton = styled('button')(
	({ theme }) => `
  font-family: Poppins, sans-serif;
  font-size: 17px;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  min-width: 220px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 0px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};

  &:hover {
    background: ${theme.palette.mode === 'dark' ? '' : grey[100]};
    // border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    // outline: 0px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
      margin-left: 5px;
    }
  }

  &::after {
    content: '▾';
    float: right;
    margin-left: 5px;
  }
  `,
);

const StyledListbox = styled('ul')(
	({ theme }) => `
  font-family: Poppins, sans-serif;
  font-size: 17px;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 220px;
  // background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 0px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 0.75em;
  // color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  `,
);

const StyledOption = styled(OptionUnstyled)(
	({ theme }) => `
  list-style: none;
  padding: 8px;
  margin: 5px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    // background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};
    // color: ${theme.palette.mode === 'dark' ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
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
	console.log(option);
	if (option == null) {
		return <span>{label}</span>;
	} else if (option.value === 'D') {
		return (
			<span>
				{label} {"Prix décroissant"}
			</span>
		);
	} else if (option.value === 'C') {
		return (
			<span>
				{label} {"Prix croissant"}
			</span>
		)
	}
}

type Props = {
	// state: 'D' | 'T';
	// setStateHandler: React.Dispatch<React.SetStateAction<'D' | 'T'>>;
	children?: React.ReactNode;
};

const FilterSelectUnstyled: React.FC<Props> = (props: Props) => {
	return (
		<CustomSelect renderValue={renderValue}>
			<StyledOption value="D">Prix décroissant</StyledOption>
			<StyledOption value="C">Prix croissant</StyledOption>
		</CustomSelect>
	);
};

export default FilterSelectUnstyled;
