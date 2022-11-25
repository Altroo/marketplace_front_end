import React from "react";
import Styles from "./createYourShop.module.sass";
import { Stack } from "@mui/material";
import OutlineButton from "../../../htmlElements/buttons/outlineButton/outlineButton";
import Image from 'next/image';
import CreateShopWideSVG from "../../../../public/assets/images/cards_illu/create-shop-wide.svg";
import { useRouter } from "next/router";
import { REAL_SHOP_ADD_SHOP_NAME } from "../../../../utils/routes";

const CreateYourShop: React.FC = () => {
	const router = useRouter();
	return (
		<Stack direction="row" justifyContent="space-between" className={Styles.rootStackWrapper}>
			<Stack direction="column" className={Styles.columnStackWrapper} justifyContent="center">
				<span>Créez votre boutique</span>
				<p>Vous aussi vendez sur Qaryb!</p>
				<OutlineButton
					buttonText="C'est parti !"
					active={true}
					type="button"
					backgroundColor="#F3D8E1"
					cssClass={Styles.actionButton}
					onClick={() => router.push(REAL_SHOP_ADD_SHOP_NAME, undefined, {shallow: true})}
				/>
			</Stack>
			<Image
				src={CreateShopWideSVG}
				alt=""
				width="0"
				height="0"
				sizes="100vw"
				className={Styles.avatar}
			/>
		</Stack>
	);
};

export default CreateYourShop;
