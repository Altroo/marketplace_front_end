import * as React from 'react';
import {
  Select,
  selectClasses,
  SelectProps,
  SelectRootSlotProps,
} from '@mui/base/Select';
import { Option, optionClasses } from '@mui/base/Option';
import { Popper } from '@mui/base/Popper';
import { styled } from '@mui/system';
import UnfoldMoreRoundedIcon from '@mui/icons-material/UnfoldMoreRounded';
import { SelectValue } from "@mui/base/useSelect";
import { hexToRGB } from "../../../../../utils/helpers";
import Styles from './shopFilterSelect.module.sass';

let hoverColor = hexToRGB('#0D070B', 0.04);
const filterDropUpSVG = '<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.50002 5.33317C8.67068 5.33317 8.84135 5.3985 8.97135 5.5285L12.3047 8.86183C12.5653 9.1225 12.5653 9.54383 12.3047 9.8045C12.044 10.0652 11.6227 10.0652 11.362 9.8045L8.50002 6.9425L5.63802 9.8045C5.37735 10.0652 4.95602 10.0652 4.69535 9.8045C4.43468 9.54383 4.43468 9.1225 4.69535 8.86183L8.02868 5.5285C8.15868 5.3985 8.32935 5.33317 8.50002 5.33317" fill="#84848A"/></svg>';
const filterDropDownSVG = '<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.49998 10.6668C8.32932 10.6668 8.15865 10.6015 8.02865 10.4715L4.69532 7.13817C4.43465 6.8775 4.43465 6.45617 4.69532 6.1955C4.95598 5.93483 5.37732 5.93483 5.63798 6.1955L8.49998 9.0575L11.362 6.1955C11.6227 5.93483 12.044 5.93483 12.3047 6.1955C12.5653 6.45617 12.5653 6.8775 12.3047 7.13817L8.97132 10.4715C8.84132 10.6015 8.67065 10.6668 8.49998 10.6668" fill="#84848A"/></svg>';
const openSVGURL = 'data:image/svg+xml;base64,' + Buffer.from(filterDropUpSVG).toString('base64');
const closeSVGURL = 'data:image/svg+xml;base64,' + Buffer.from(filterDropDownSVG).toString('base64');


type Props = {
	state: 'D' | 'C';
	setStateHandler: React.Dispatch<React.SetStateAction<'D' | 'C'>>;
	activeHoverColor: string;
	onChange: (e: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null, value: SelectValue<string | string[], false>) => void;
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
			<CustomSelect defaultValue="D" onChange={props.onChange} value={props.state} className={Styles.mobileSelect}>
        <StyledOption value="D">Prix décroissant</StyledOption>
        <StyledOption value="C">Prix croissant</StyledOption>
      </CustomSelect>
		</div>
  );
}

const CustomSelect = React.forwardRef(function CustomSelect<
  TValue extends string,
  Multiple extends boolean,
>(props: SelectProps<TValue, Multiple>, ref: React.ForwardedRef<HTMLButtonElement>) {

   const slots = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  };

  return <Select {...props} ref={ref} slots={slots} />;
});

const grey = {
	800: '#2D3843',
	900: '#1A2027',
};

const Button = React.forwardRef(function Button<
  TValue extends NonNullable<unknown>,
  Multiple extends boolean,
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

const StyledButton = styled(Button, { shouldForwardProp: () => true })(
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
  color: ${grey[900]};

  &:hover {
    background: ${hoverColor};
  }

  &.${selectClasses.expanded} {
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
  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
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

const StyledOption = styled(Option)(
  () => `
  list-style: none;
  padding: 8px;
  margin: 5px;
  border-radius: 0.45em;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }
  
  &:hover:not(.${optionClasses.disabled}) {
    background: ${hoverColor};
  }
  `,
);

const StyledPopper = styled(Popper)`
   color: #0d070b;
   background-color: white;
   z-index: 1;
   border-radius: 0.45em;
`;

export default ShopFilterSelect;