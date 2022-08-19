import React, { useState } from 'react';
import Styles from './infoTabContent.module.sass';
import OutlineButton from '../../../htmlElements/buttons/outlineButton/outlineButton';
import RightSwipeModal from '../../../desktop/modals/rightSwipeModal/rightSwipeModal';
import CloseSVG from '../../../../public/assets/svgs/close.svg';
import Image from 'next/image';
import HelperDescriptionHeader from '../../../headers/helperDescriptionHeader/helperDescriptionHeader';
import { Stack } from '@mui/material';
import { addMyInfosStackType } from '../../../../types/ui/uiTypes';
import AjouterMesInfosStack from '../ajouterMesInfos-Stack/ajouterMesInfosStack';

type Props = {
	infosStackActions: Array<addMyInfosStackType>;
	backgroundColor?: string;
	children?: React.ReactNode;
};
const InfoTabContent: React.FC<Props> = (props: Props) => {
	const [openInfoModal, setInfoModalOpen] = useState(false);

	const handleOpen = () => {
		setInfoModalOpen(true);
	};
	const handleClose = () => {
		setInfoModalOpen(false);
	};

	return (
		<div className={Styles.infoWrapper}>
			<h3>Dites-en plus !</h3>
			<p>
				C’est ici que les acheteurs peuvent connaître vos horaires, votre adresse ou en savoir un peu plus sur
				vous.
			</p>
			<div className={Styles.buttonWrapper}>
				<OutlineButton
					buttonText="Renseigner mes infos"
					backgroundColor={props.backgroundColor}
					onClick={handleOpen}
				/>
				<RightSwipeModal open={openInfoModal} handleClose={handleClose}>
					<div className={Styles.modalContentWrapper}>
						<div className={Styles.topBar}>
							<Image src={CloseSVG} width={40} height={40} alt="" onClick={handleClose} />
						</div>
						<HelperDescriptionHeader header="Ajouter mes infos" />
						<Stack direction="column" spacing={4}>
							{props.infosStackActions.map((stack, index) => {
								return (
									<AjouterMesInfosStack
										key={index}
										onClick={stack.onClick}
										title={stack.title}
										added={stack.added}
										content={stack.content}
									/>
								);
							})}
						</Stack>
					</div>
				</RightSwipeModal>
			</div>
		</div>
	);
};

export default InfoTabContent;
