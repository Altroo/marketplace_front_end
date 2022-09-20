import React from 'react';
import Styles from './desktopTopSaveShareNavBar.module.sass';
import PrimaryButton from '../../../htmlElements/buttons/primaryButton/primaryButton';
import { Stack, ThemeProvider } from '@mui/material';
import Button from '@mui/material/Button';
import { CustomTheme } from "../../../../utils/themes";
import { default as ImageFuture } from "next/future/image";
import CloseSVG from "../../../../public/assets/svgs/navigationIcons/close.svg";
import ShareSVG from "../../../../public/assets/svgs/globalIcons/share-blue.svg";

type Props = {
	onClickSave: () => void;
	onClickShare: () => void;
	onClickClose: () => void;
	children?: React.ReactNode;
};

const DesktopTopSaveShareNavBar: React.FC<Props> = (props: Props) => {
	const customTheme = CustomTheme();
	return (
		<ThemeProvider theme={customTheme}>
			<Stack direction="row" justifyContent="space-between" className={Styles.stackWrapper}>
				<Stack direction="row" spacing={3}>
					<PrimaryButton
						buttonText="Enregistrer"
						active
						onClick={props.onClickSave}
						cssClass={Styles.saveBtn}
					/>
					<Button
						color="primary"
						onClick={props.onClickShare}
						className={Styles.shareBtn}>
						<Stack direction="row" alignItems="center">
							<ImageFuture
								src={ShareSVG}
								alt=""
								width="0"
								height="0"
								sizes="100vw"
								className={Styles.icon}
							/>
							<span className={Styles.shareTxt}>Partager</span>
						</Stack>
					</Button>
				</Stack>
				<ImageFuture
					src={CloseSVG}
					alt=""
					width="0"
					height="0"
					sizes="100vw"
					style={{cursor: 'pointer'}}
					className={Styles.icon}
				/>
			</Stack>
		</ThemeProvider>
	);
};

export default DesktopTopSaveShareNavBar;
