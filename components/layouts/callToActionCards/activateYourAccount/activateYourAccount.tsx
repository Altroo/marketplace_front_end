import React from "react";
import Styles from "./activateYourAccount.module.sass";
import { Stack } from "@mui/material";
import OutlineButton from "../../../htmlElements/buttons/outlineButton/outlineButton";
import Image from 'next/image';
import ActivateAccountSVG from "../../../../public/assets/images/cards_illu/activate.svg";

type Props = {
	onClick: () => void;
	children?: React.ReactNode;
}

const ActivateYourAccount: React.FC<Props> = (props: Props) => {
	return (
		<Stack direction="row" spacing="40px" className={Styles.rootStackWrapper} alignItems="center">
			<Image
				src={ActivateAccountSVG}
				alt=""
				width="0"
				height="0"
				sizes="100vw"
				className={Styles.image}
				loading="eager"
			/>
			<Stack direction="column" className={Styles.columnStackWrapper}>
				<span>Activer votre compte!</span>
				<p>Finalisez votre inscription, en rentrant le code envoyé.</p>
				<OutlineButton
					buttonText="Activer mon compte"
					active={true}
					type="button"
					backgroundColor="#F3D8E1"
					cssClass={Styles.actionButton}
					onClick={props.onClick}
				/>
			</Stack>
		</Stack>
	);
};

export default ActivateYourAccount;
