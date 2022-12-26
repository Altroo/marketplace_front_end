import React, { useCallback, useMemo, useState, useEffect } from 'react';
import Styles from './getProductCart.module.sass';
import { Box, Grid, IconButton, Stack, TextField, ThemeProvider } from '@mui/material';
import { getDefaultTheme, OfferQuantityFieldTheme, SizesChipTheme } from '../../../../utils/themes';
import { hexToRGB } from '../../../../utils/helpers';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Image from 'next/image';
import MinusSVG from '../../../../public/assets/svgs/globalIcons/minus-circular.svg';
import PlusSVG from '../../../../public/assets/svgs/globalIcons/plus-circular.svg';
import PrimaryButton from '../../../htmlElements/buttons/primaryButton/primaryButton';
import { OfferBulkStatesListType, OfferColorsListType } from '../../../../types/ui/uiTypes';

const chipTheme = SizesChipTheme();
const quantityTheme = OfferQuantityFieldTheme();
const defaultTheme = getDefaultTheme();

type Props = {
	colorsListString: Array<string>;
	sizesListString: Array<string>;
	productQuantity: number | null;
	AddProductToCartHandler: (
		selectedColor: string | null,
		selectedSize: string | null,
		selectedQuantity: number,
	) => void;
	children?: React.ReactNode;
};

const GetProductCart: React.FC<Props> = (props: Props) => {
	const { colorsListString, sizesListString, productQuantity, AddProductToCartHandler } = props;
	const [selectedColor, setSelectedColor] = useState<string | null>(null);
	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
	const [colorsRequireValidation, setColorsRequireValidation] = useState<boolean>(false);
	const [sizesRequireValidation, setSizesRequireValidation] = useState<boolean>(false);
	const [isSubmitActive, setIsSubmitActive] = useState<boolean>(false);
	// Colors
	const availableColorsList: Array<OfferColorsListType> = useMemo(() => {
		const stateColorsList: Array<OfferColorsListType> = [];
		colorsListString.map((color) => {
			switch (color) {
				case 'Noir':
					stateColorsList.push({
						code: 'BK',
						value: 'Noir',
						hex: '#0D070B',
					});
					break;
				case 'Blanc':
					stateColorsList.push({
						code: 'WT',
						value: 'Blanc',
						hex: '#FFFFFF',
					});
					break;
				case 'Marron':
					stateColorsList.push({
						code: 'BR',
						value: 'Marron',
						hex: '#CEB186',
					});
					break;
				case 'Bleu':
					stateColorsList.push({
						code: 'BL',
						value: 'Bleu',
						hex: '#0274D7',
					});
					break;
				case 'Vert':
					stateColorsList.push({
						code: 'GN',
						value: 'Vert',
						hex: '#07CBAD',
					});
					break;
				case 'Violet':
					stateColorsList.push({
						code: 'PR',
						value: 'Violet',
						hex: '#8669FB',
					});
					break;
				case 'Orange':
					stateColorsList.push({
						code: 'OR',
						value: 'Orange',
						hex: '#FFA826',
					});
					break;
				case 'Rose':
					stateColorsList.push({
						code: 'PI',
						value: 'Rose',
						hex: '#FF9DBF',
					});
					break;
				case 'Jaune':
					stateColorsList.push({
						code: 'YE',
						value: 'Jaune',
						hex: '#FED301',
					});
					break;
				case 'Gris':
					stateColorsList.push({
						code: 'GR',
						value: 'Gris',
						hex: '#D9D9DD',
					});
					break;
				case 'Multi': // TODO - verify
					stateColorsList.push({
						code: 'MC',
						value: 'Multi',
						hex: 'conic-gradient(from 70.34deg at 51.34% 50%, #9557FF -67.34deg, #FF5364 21.53deg, #FFFB45 108.58deg, #70FA67 180deg, #48C3FF 228.18deg, #9557FF 292.66deg, #FF5364 381.53deg)',
					});
					break;
				case 'Rouge':
					stateColorsList.push({
						code: 'RD',
						value: 'Rouge',
						hex: '#E12D3D',
					});
					break;
			}
		});
		return stateColorsList;
	}, [colorsListString]);
	const colorOnClickHandler = useCallback((value: string) => {
		setSelectedColor((prevState) => {
			if (prevState === value) {
				return null;
			} else {
				return value;
			}
		});
	}, []);

	// Sizes
	const availableSizesList: Array<Omit<OfferBulkStatesListType, 'state' | 'setState'>> = useMemo(() => {
		const stateSizesList: Array<Omit<OfferBulkStatesListType, 'state' | 'setState'>> = [];
		sizesListString.map((size) => {
			switch (size) {
				case 'XSmall':
					stateSizesList.push({
						code: 'XS',
						value: 'XSmall',
					});
					break;
				case 'Small':
					stateSizesList.push({
						code: 'S',
						value: 'Small',
					});
					break;
				case 'Medium':
					stateSizesList.push({
						code: 'M',
						value: 'Medium',
					});
					break;
				case 'Large':
					stateSizesList.push({
						code: 'L',
						value: 'Large',
					});
					break;
				case 'XLarge':
					stateSizesList.push({
						code: 'X',
						value: 'XLarge',
					});
					break;
				case 'XXLarge':
					stateSizesList.push({
						code: 'XL',
						value: 'XXLarge',
					});
					break;
			}
		});
		return stateSizesList;
	}, [sizesListString]);
	const sizeOnClickHandler = useCallback((code: string) => {
		setSelectedSize(code);
	}, []);

	// Quantity
	const quantityOnClickPlusHandler = useCallback(() => {
		setSelectedQuantity((prevState) => {
			if (prevState === productQuantity) {
				return prevState;
			}
			return prevState + 1;
		});
	}, [productQuantity]);

	const quantityOnClickMinusHandler = useCallback(() => {
		setSelectedQuantity((prevState) => {
			if (prevState === 1) {
				return 1;
			} else {
				return prevState - 1;
			}
		});
	}, []);

	const quantityOnValueChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		if (e.target.value) {
			setSelectedQuantity(parseInt(e.target.value));
		} else {
			setSelectedQuantity(1);
		}
	}, []);

	useEffect(() => {
		// colors not exist but sizes exist
		if (colorsListString.length > 0) {
			setColorsRequireValidation(true);
		} else {
			setColorsRequireValidation(false);
		}
		if (sizesListString.length > 0) {
			setSizesRequireValidation(true);
		} else {
			setSizesRequireValidation(false);
		}
		if (colorsRequireValidation && sizesRequireValidation) {
			if (selectedColor && selectedSize && selectedQuantity > 0) {
				setIsSubmitActive(true);
			} else {
				setIsSubmitActive(false);
			}
		} else if (colorsRequireValidation && !sizesRequireValidation) {
			if (selectedColor && selectedQuantity > 0) {
				setIsSubmitActive(true);
			} else {
				setIsSubmitActive(false);
			}
		} else if (!colorsRequireValidation && sizesRequireValidation) {
			if (selectedSize && selectedQuantity > 0) {
				setIsSubmitActive(true);
			} else {
				setIsSubmitActive(false);
			}
		} else if (!colorsRequireValidation && !sizesRequireValidation) {
			if (selectedQuantity > 0) {
				setIsSubmitActive(true);
			} else {
				setIsSubmitActive(false);
			}
		}
	}, [
		colorsListString.length,
		colorsRequireValidation,
		selectedColor,
		selectedQuantity,
		selectedSize,
		sizesListString.length,
		sizesRequireValidation,
	]);

	return (
		<Stack direction="column" className={Styles.rootCartModalStack} justifyContent="space-between" spacing="60px">
			<Stack direction="column" spacing={{ xs: '18px', sm: '18px', md: '48px', lg: '48px', xl: '48px' }}>
				{colorsListString.length > 0 && (
					<>
						<span className={Styles.cartTitles}>Choisissez une couleur</span>
						<Stack direction="column" spacing="18px">
							<Stack direction="row" spacing="12px" alignItems="center">
								<span className={Styles.cartTitles}>Couleur</span>
								<span className={Styles.cartSelectedColor}>{selectedColor ? selectedColor : ''}</span>
							</Stack>
							<ThemeProvider theme={defaultTheme}>
								<Grid container className={Styles.rootGridColor}>
									{availableColorsList.map((color, index) => {
										const rippleColor = hexToRGB(color.hex, 0.5);
										return (
											<Grid item key={index}>
												<Stack direction="column" key={index} alignItems="center">
													<Box
														className={`${Styles.colorWrapper} ${
															selectedColor === color.value ? Styles.colorActive : ''
														}`}
													>
														<Button
															className={Styles.colorButton}
															sx={{
																border: color.code === 'WT' ? '1px solid #A3A3AD' : '0',
																background: color.hex,
																'&:hover': {
																	backgroundColor: `${rippleColor} !important`,
																},
															}}
															size="small"
															onClick={() => colorOnClickHandler(color.value)}
															color="primary"
														/>
													</Box>
													<span className={Styles.colorValue}>{color.value}</span>
												</Stack>
											</Grid>
										);
									})}
								</Grid>
							</ThemeProvider>
						</Stack>
					</>
				)}
				{sizesListString.length > 0 && (
					<Stack direction="column" spacing="20px">
						<span className={Styles.cartTitles}>Sélectionner une taille</span>
						<Stack
							direction="row"
							flexWrap="wrap"
							justifyContent="space-between"
							alignItems="center"
							className={Styles.rootStack}
						>
							<ThemeProvider theme={chipTheme}>
								<Grid container className={Styles.rootGrid}>
									{availableSizesList.map((size, index) => {
										return (
											<Grid item key={index}>
												<Chip
													label={size.value}
													variant={size.value === selectedSize ? 'filled' : 'outlined'}
													onClick={() => sizeOnClickHandler(size.value)}
												/>
											</Grid>
										);
									})}
								</Grid>
							</ThemeProvider>
						</Stack>
					</Stack>
				)}
				<Stack direction="column" spacing="18px">
					<span className={Styles.cartTitles}>Quantité</span>
					<Stack direction="row" flexWrap="wrap" spacing="40px">
						<IconButton onClick={quantityOnClickMinusHandler} className={Styles.quantityIconButton}>
							<Image src={MinusSVG} alt="" width="40" height="40" sizes="100vw" />
						</IconButton>
						<ThemeProvider theme={quantityTheme}>
							<TextField
								variant="outlined"
								value={selectedQuantity}
								inputProps={{ min: 1, max: productQuantity ? productQuantity : 100 }}
								onChange={(e) => quantityOnValueChangeHandler(e)}
								color="primary"
							/>
						</ThemeProvider>
						<IconButton onClick={quantityOnClickPlusHandler} className={Styles.quantityIconButton}>
							<Image src={PlusSVG} alt="" width="40" height="40" sizes="100vw" />
						</IconButton>
					</Stack>
				</Stack>
			</Stack>
			<div className={`${Styles.primaryButtonWrapper} ${Styles.primaryButton}`}>
				<PrimaryButton
					buttonText="Ajouter au panier"
					active={isSubmitActive}
					onClick={() => AddProductToCartHandler(selectedColor, selectedSize, selectedQuantity)}
				/>
			</div>
		</Stack>
	);
};

export default GetProductCart;
