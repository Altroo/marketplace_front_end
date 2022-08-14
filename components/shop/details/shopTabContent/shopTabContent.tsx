import React from 'react';
import Styles from './shopTabContent.module.sass';
import { checkBoxForWhomBaseType, chipActionsType } from "../../../../types/ui/uiTypes";
import IconTextInput from "../../../htmlElements/iconTextInput/iconTextInput";
import ChipButtons from "../../../htmlElements/buttons/chipButton/chipButton";
import IosSwitch from "../../../htmlElements/switches/IosSwitch";
import CheckBox from "../../../htmlElements/checkBoxes/checkBox";
import StartYourShopContent from "../startYourShopContent/startYourShopContent";

type Props = {
	chipCategoriesAction: chipActionsType;
	checkBoxAction: Array<checkBoxForWhomBaseType>;
	children?: React.ReactNode;
}

const ShopTabContent: React.FC<Props> = (props: Props) => {

	return (
		<>
			<div className={Styles.filterWrapper}>
				<span className={Styles.filterText}>Filtrer</span>
				<div>
					<label>Trier : </label>
					<select>
						<option value="D" defaultValue="D">
							Prix décroissant
						</option>
						<option value="C">Prix croissant</option>
					</select>
				</div>
			</div>
			<div className={Styles.shopDetailsAside}>
				<div className={Styles.shopFilterWrapper}>
					<IconTextInput active={true} placeholder="Rechercher" />
					<div className={Styles.shopFilterContainer}>
						<span className={Styles.subHeader}>Catégories</span>
						<div className={Styles.categoriesWrapper}>
							<ChipButtons actions={props.chipCategoriesAction} />
						</div>
						<div className={Styles.promoWrapper}>
							<span className={Styles.subHeader}>En Promo</span>
							<IosSwitch />
						</div>
						<div className={Styles.forWhomWrapper}>
							<span className={Styles.subHeader}>Pour qui</span>
							<div>
								<div>
									{props.checkBoxAction.map((action, index: number) => {
										return (
											<CheckBox
												key={index}
												checked={action.checked}
												active={action.active}
												text={action.text}
												onChange={action.onChange}
											/>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
				<StartYourShopContent/>
			</div>
		</>
	);
};

export default ShopTabContent;
