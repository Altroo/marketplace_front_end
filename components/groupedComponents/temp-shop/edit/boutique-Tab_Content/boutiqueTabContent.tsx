// import React, { useEffect, useState } from "react";
// import Styles from "./boutiqueTabContent.module.sass";
// import { checkBoxForWhomBaseType, chipActionsType, switchActionType } from "../../../../../types/ui/uiTypes";
// import IconTextInput from "../../../../htmlElements/inputs/iconTextInput/iconTextInput";
// import ChipButtons from "../../../../htmlElements/buttons/chipButtons/chipButtons";
// // import IosSwitch from '../../../../htmlElements/switches/iosSwitch';
// import CheckBox from "../../../../htmlElements/checkBoxes/checkBox";
// import StartYourShopContent from "../startYourShopContent/startYourShopContent";
// import ShopFilterSelect from "../shopFilterSelect/shopFilterSelect";
// import { Box, Stack } from "@mui/material";
// import RightSwipeModal from "../../../../desktop/modals/rightSwipeModal/rightSwipeModal";
// import Image from "next/image";
// import CloseSVG from "../../../../../public/assets/svgs/navigationIcons/close.svg";
// import AccordionFilter from "../../../../layouts/accordionFilter/accordionFilter";
//
// type Props = {
// 	activeColor: string;
// 	hidden: boolean;
// 	openFilterModal: boolean;
// 	setOpenFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
// 	children?: React.ReactNode;
// };
//
// const BoutiqueTabContent: React.FC<Props> = (props: Props) => {
// 	// Todo temp shop - check later from router sort_by.
// 	const [filter, setFilter] = useState<"D" | "C">("D");
//
// 	const filterOnChange = (
// 		e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent | React.FocusEvent | null,
// 		value: string | null
// 	) => {
// 		setFilter(value as "D" | "C");
// 	};
//
// 	useEffect(() => {
// 		console.log(filter);
// 	}, [filter]);
//
// 	return (
// 		<>
// 			{!props.hidden ? (
// 				<div className={Styles.filterWrapper}>
// 					<span className={Styles.filterText}>Filtrer</span>
// 					<ShopFilterSelect
// 						state={filter}
// 						setStateHandler={setFilter}
// 						activeHoverColor={props.activeColor}
// 						onChange={(e, v) => filterOnChange(e, v)}
// 					/>
// 				</div>
// 			) : null}
// 			<Stack direction="row" justifyContent="space-between">
// 				{!props.hidden ? (
// 						<>
// 							{/*<div className={Styles.shopFilterWrapper}>*/}
// 							{/*	<IconTextInput active={true} placeholder="Rechercher" />*/}
// 							{/*	<div className={Styles.shopFilterContainer}>*/}
// 							{/*		<span className={Styles.subHeader}>Catégories</span>*/}
// 							{/*		<div className={Styles.categoriesWrapper}>*/}
// 							{/*			<ChipButtons actions={props.chipCategoriesAction} />*/}
// 							{/*		</div>*/}
// 							{/*		/!*<div className={Styles.promoWrapper}>*!/*/}
// 							{/*		/!*	<span className={Styles.subHeader}>En Promo</span>*!/*/}
// 							{/*		/!*	<IosSwitch*!/*/}
// 							{/*		/!*		checked={props.promoCheckAction.checked}*!/*/}
// 							{/*		/!*		onChange={props.promoCheckAction.onChange}*!/*/}
// 							{/*		/!*		activeColor={props.promoCheckAction.activeColor}*!/*/}
// 							{/*		/!*		labelcssStyles={{marginLeft: '10px'}}*!/*/}
// 							{/*		/!*	/>*!/*/}
// 							{/*		/!*</div>*!/*/}
// 							{/*		<div className={Styles.forWhomWrapper}>*/}
// 							{/*			<span className={Styles.subHeader}>Pour qui</span>*/}
// 							{/*			<div>*/}
// 							{/*				<div>*/}
// 							{/*					{props.checkBoxForWhomAction.map((action, index: number) => {*/}
// 							{/*						return (*/}
// 							{/*							<CheckBox*/}
// 							{/*								key={index}*/}
// 							{/*								checked={action.checked}*/}
// 							{/*								active={action.active}*/}
// 							{/*								text={action.text}*/}
// 							{/*								onChange={action.onChange}*/}
// 							{/*								activeColor={action.activeColor}*/}
// 							{/*							/>*/}
// 							{/*						);*/}
// 							{/*					})}*/}
// 							{/*				</div>*/}
// 							{/*			</div>*/}
// 							{/*		</div>*/}
// 							{/*	</div>*/}
// 							{/*</div>*/}
// 							{/* Mobile filter MODAL */}
// 							{availableFiltersHasData && (
// 								<RightSwipeModal
// 									open={props.openFilterModal}
// 									handleClose={() => props.setOpenFilterModal(false)}
// 									keepMounted={true}
// 								>
// 									<Stack
// 										className={Styles.mobileFilterRootStack}
// 										direction="column"
// 										justifyContent="space-between"
// 										alignContent="space-between"
// 										columnGap={0}
// 										rowGap={0}
// 									>
// 										<Box className={Styles.closeButtonWrapper}>
// 											<Image
// 												src={CloseSVG}
// 												width={40}
// 												height={40}
// 												alt=""
// 												onClick={() => props.setOpenFilterModal(false)}
// 												style={{ cursor: "pointer" }}
// 											/>
// 										</Box>
// 										<h5 className={Styles.mobileFilterHeader}>Filtrer</h5>
// 										<ShopFilterSelect
// 											onChange={(e, value) => {
// 												filterOnChange(e, value as "D" | "C");
// 											}}
// 											state={filter}
// 											setStateHandler={setFilter}
// 											activeHoverColor={props.activeColor}
// 										/>
// 										<AccordionFilter
// 											availableFilters={availableFilters}
// 											setApplyFiltersClicked={setApplyFiltersClicked}
// 											closeModal={closeMobileFilterModal}
// 										/>
// 									</Stack>
// 								</RightSwipeModal>
// 							)}
// 						</>
// 					) : null}
// 				<StartYourShopContent />
// 			</Stack>
// 		</>
// 	);
// };
//
// export default BoutiqueTabContent;
// @ts-ignore
// eslint-disable-next-line no-empty
{}