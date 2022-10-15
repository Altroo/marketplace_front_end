import React from "react";
import Styles from "./createYourShop.module.sass";
import { Stack } from "@mui/material";
import OutlineButton from "../../../htmlElements/buttons/outlineButton/outlineButton";
import { default as ImageFuture } from "next/future/image";
import CreateShopWideSVG from "../../../../public/assets/images/cards_illu/create-shop-wide.svg";
import { useRouter } from "next/router";
import { TEMP_SHOP_ADD_SHOP_NAME } from "../../../../utils/routes";

type Props = {
	children?: React.ReactNode;
}

const CreateYourShop: React.FC<Props> = (props: Props) => {
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
					onClick={() => router.push(TEMP_SHOP_ADD_SHOP_NAME, undefined, {shallow: true})}
				/>
			</Stack>
			<ImageFuture
				src={CreateShopWideSVG}
				alt=""
				width="0"
				height="0"
				sizes="100vw"
				className={Styles.avatar}
				loading="eager"
			/>
		</Stack>
	);
};

export default CreateYourShop;
