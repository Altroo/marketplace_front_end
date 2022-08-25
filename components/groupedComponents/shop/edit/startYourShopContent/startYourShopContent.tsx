import React from 'react';
import Styles from './startYourShopContent.module.sass';
import CenteredInfoAction from '../../create/centeredInfoAction/centeredInfoAction';
import BorderIconAnchorButton from '../../../../htmlElements/buttons/borderIconAnchorButton/borderIconAnchorButton';
import ActivatedAddIconSVG from '../../../../../public/assets/svgs/globalIcons/blue-add.svg';
import { OFFER_ADD_INDEX } from "../../../../../utils/routes";

type Props = {
	children?: React.ReactNode;
};

const StartYourShopContent: React.FC<Props> = (props: Props) => {
	return (
		<div className={Styles.shopAddOfferWrapper}>
			<div className={Styles.addOfferContainer}>
				<div className={Styles.centeredInfoActionWrapper}>
					<CenteredInfoAction
						header="Démarrer votre boutique"
						subHeader="Ajoutez votre premier article !"
						cssHeaderClass={Styles.infoHeader}
						cssSubHeaderClass={Styles.infoSubHeader}
					/>
					<BorderIconAnchorButton
						buttonText="Ajouter un article"
						svgIcon={ActivatedAddIconSVG}
						active={true}
						nextPage={OFFER_ADD_INDEX}
					/>
				</div>
			</div>
		</div>
	);
};

export default StartYourShopContent;
