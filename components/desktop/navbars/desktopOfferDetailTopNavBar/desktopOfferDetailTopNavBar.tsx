import React from "react";
import Styles from "./desktopOfferDetailTopNavBar.module.sass";
import { Stack, ThemeProvider } from "@mui/material";
import { default as ImageFuture } from 'next/future/image';
import EditBlackSVG from '../../../../public/assets/svgs/globalIcons/edit-black.svg';
import SolderEditActiveSVG from '../../../../public/assets/svgs/globalIcons/solder-edit-active.svg';
import SolderEditInactiveSVG from '../../../../public/assets/svgs/globalIcons/solder-edit-inactive.svg';
import EpinglerActiveSVG from '../../../../public/assets/svgs/globalIcons/epingler-active.svg';
import EpinglerInactiveSVG from '../../../../public/assets/svgs/globalIcons/epingler-inactive.svg';
// same as promouvoir
import ReferencerActiveSVG from '../../../../public/assets/svgs/globalIcons/referencer-active.svg';
import ReferencerInactiveSVG from '../../../../public/assets/svgs/globalIcons/referencer-inactive.svg';
import DupliquerSVG from '../../../../public/assets/svgs/globalIcons/dupliquer-icon.svg';
import SupprimerSVG from '../../../../public/assets/svgs/globalIcons/close-black.svg';

import { CustomTheme } from "../../../../utils/themes";
import Button from "@mui/material/Button";

type Props = {
	offer_pk?: number;
	epinglerActive?: boolean;
	referencerActive?: boolean;
	solderActive?: boolean;
	children?: React.ReactNode;
}

const DesktopOfferDetailTopNavBar: React.FC<Props> = (props: Props) => {
	const customTheme = CustomTheme();
	return (
		<ThemeProvider theme={customTheme}>
			<Stack direction="row" justifyContent="space-between" className={Styles.stackWrapper}>
				<Button
					onClick={() => {}}
					color="primary"
					className={`${Styles.iconButton} ${Styles.active}`}
					>
					<ImageFuture
						src={EditBlackSVG}
						alt=""
						width="0"
						height="0"
						sizes="100vw"
						className={Styles.icon} />
					Modifier
				</Button>
				<Button
					onClick={() => {}}
					color="primary"
					className={`${Styles.iconButton} ${Styles.active}`}
					>
					<ImageFuture
						src={props.solderActive ? SolderEditActiveSVG : SolderEditInactiveSVG}
						alt=""
						width="0"
						height="0"
						sizes="100vw"
						className={Styles.icon} />
					Modifier
				</Button>
				<Button
					onClick={() => {}}
					color="primary"
					className={`${Styles.iconButton} ${Styles.active}`}
					>
					<ImageFuture
						src={props.epinglerActive ? EpinglerActiveSVG : EpinglerInactiveSVG}
						alt=""
						width="0"
						height="0"
						sizes="100vw"
						className={Styles.icon} />
					Epingler
				</Button>
				<Button
					disabled={true}
					onClick={() => {}}
					color="primary"
					className={`${Styles.iconButton} ${Styles.active}`}
					>
					<ImageFuture
						src={ReferencerInactiveSVG}
						alt=""
						width="0"
						height="0"
						sizes="100vw"
						className={Styles.icon} />
					Référencer
				</Button>
				<Button
					onClick={() => {}}
					color="primary"
					className={`${Styles.iconButton} ${Styles.active}`}
					>
					<ImageFuture
						src={ReferencerInactiveSVG}
						alt=""
						width="0"
						height="0"
						sizes="100vw"
						className={Styles.icon} />
					Promouvoir
				</Button>
				<Button
					onClick={() => {}}
					color="primary"
					className={`${Styles.iconButton} ${Styles.active}`}
					>
					<ImageFuture
						src={DupliquerSVG}
						alt=""
						width="0"
						height="0"
						sizes="100vw"
						className={Styles.icon} />
					Duppliquer
				</Button>
				<Button
					onClick={() => {}}
					color="primary"
					className={`${Styles.iconButton} ${Styles.active}`}
					>
					<ImageFuture
						src={SupprimerSVG}
						alt=""
						width="0"
						height="0"
						sizes="100vw"
						className={Styles.icon} />
					Supprimer
				</Button>
			</Stack>
		</ThemeProvider>
	);
};

export default DesktopOfferDetailTopNavBar;
