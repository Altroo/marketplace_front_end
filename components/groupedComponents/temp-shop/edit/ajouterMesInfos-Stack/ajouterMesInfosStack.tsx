import React from 'react';
import Styles from './ajouterMesInfosStack.module.sass';
import { Box, Button, Stack } from '@mui/material';
import RightSwipeModal from '../../../../desktop/modals/rightSwipeModal/rightSwipeModal';
import EditNomBoutique from '../renseignerMesInfos-Modals/editNomBoutique/editNomBoutique';
import EditBio from '../renseignerMesInfos-Modals/editBio/editBio';
import EditHoraire from '../renseignerMesInfos-Modals/editHoraire/editHoraire';
import EditCoordonees from '../renseignerMesInfos-Modals/editCoordonees/editCoordonees';
import EditAdresse from '../renseignerMesInfos-Modals/editAdresse/editAdresse';
import ShowNomBoutique from './showNomBoutique/showNomBoutique';
import ShowBio from './showBio/showBio';
import ShowHoraire from './showHoraire/showHoraire';
import ShowCoordonees from './showCoordonees/showCoordonees';
import ShowAdresse from './showAdresse/showAdresse';
import { addMyInfosStackType } from '../../../../../types/ui/uiTypes';

const AjouterMesInfosStack: React.FC<addMyInfosStackType> = (props: addMyInfosStackType) => {
	// const [openInfoModal, setInfoModalOpen] = useState(false);
	//
	// const handleOpen = () => {
	// 	setInfoModalOpen(true);
	// };
	// const handleClose = () => {
	// 	setInfoModalOpen(false);
	// };

	let modalContent: React.ReactNode;
	let addMyInfosStackContent: React.ReactNode;

	// Edit = right swipe modal detail of my infos modal
	// Show = right swipe infos modal
	if (props.title === 'Nom') {
		modalContent = <EditNomBoutique handleClose={() => props.setOpenEditModal(false)} />;
		addMyInfosStackContent = <ShowNomBoutique />;
	} else if (props.title === 'Bio') {
		modalContent = <EditBio handleClose={() => props.setOpenEditModal(false)} />;
		addMyInfosStackContent = <ShowBio />;
	} else if (props.title === 'Horaire') {
		modalContent = <EditHoraire handleClose={() => props.setOpenEditModal(false)} />;
		addMyInfosStackContent = <ShowHoraire />;
	} else if (props.title === 'Coordonées') {
		modalContent = <EditCoordonees handleClose={() => props.setOpenEditModal(false)} />;
		addMyInfosStackContent = <ShowCoordonees />;
	} else if (props.title === 'Adresse') {
		modalContent = <EditAdresse handleClose={() => props.setOpenEditModal(false)} />;
		addMyInfosStackContent = (
			<ShowAdresse />
		);
	}

	return (
		<>
			{/* EDIT CONTENT MODAL */}
			<RightSwipeModal open={props.openEditModal} handleClose={() => props.setOpenEditModal(false)}>
				<div className={props.title !== 'Adresse' ? Styles.modalContentWrapper : Styles.addressModalWrapper}>
					{modalContent}
				</div>
			</RightSwipeModal>
			{/* END EDIT CONTENT MODAL */}
			<Stack direction="column" spacing={1}>
				<Stack direction="row" justifyContent="space-between" alignItems="center">
					<Box component="span" className={Styles.stackTitle}>
						{props.title}
					</Box>
					<Button onClick={() => props.setOpenEditModal(true)} className={Styles.stackButton}>
						{props.added ? 'Modifier' : 'Ajouter'}
					</Button>
				</Stack>
				{!props.added ? (
					<Box component="p" className={Styles.stackEmptyContent}>
						{`Vous n'avez pas encore renseigné votre ${props.title.toLowerCase()}.`}
					</Box>
				) : (
					<Box className={Styles.stackFullContent}>{addMyInfosStackContent}</Box>
				)}
			</Stack>
		</>
	);
};

export default AjouterMesInfosStack;
