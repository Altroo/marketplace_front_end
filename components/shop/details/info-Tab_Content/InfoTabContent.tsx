import React, { useEffect, useState } from 'react';
import Styles from './infoTabContent.module.sass';
import OutlineButton from '../../../htmlElements/buttons/outlineButton/outlineButton';
import { Box, Button, Stack } from '@mui/material';
import { useAppSelector } from '../../../../utils/hooks';
import { getShopObj } from '../../../../store/selectors';
import ShowHoraire from '../ajouterMesInfos-Stack/showHoraire/showHoraire';
import ShowCoordonees from '../ajouterMesInfos-Stack/showCoordonees/showCoordonees';
import ShowBio from '../ajouterMesInfos-Stack/showBio/showBio';
import ShowAdresse from '../ajouterMesInfos-Stack/showAdresse/showAdresse';



type Props = {
	// global info modal
	openInfoModal: boolean;
	setOpenInfoModal: React.Dispatch<React.SetStateAction<boolean>>;
	// edit bio
	setOpenEditBioModal: React.Dispatch<React.SetStateAction<boolean>>;
	// edit horaire
	setOpenEditHoraireModal: React.Dispatch<React.SetStateAction<boolean>>;
	// edit coordonée
	setOpenEditCoordoneeModal: React.Dispatch<React.SetStateAction<boolean>>;
	// edit address
	setOpenEditAdressModal: React.Dispatch<React.SetStateAction<boolean>>;
	// extra
	backgroundColor?: string;
	children?: React.ReactNode;
};
const InfoTabContent: React.FC<Props> = (props: Props) => {
	const [hideButtonWrapper, setHideButtonWrapper] = useState<boolean>(false);
	const {
		bio,
		opening_days,
		morning_hour_from,
		morning_hour_to,
		afternoon_hour_from,
		afternoon_hour_to,
		phone,
		contact_email,
		website_link,
		facebook_link,
		twitter_link,
		instagram_link,
		whatsapp,
		address_name,
		latitude,
		longitude,
		km_radius,
	} = useAppSelector(getShopObj);

	// Hide button wrapper if a value is available
	useEffect(() => {
		if (
			bio ||
			morning_hour_from ||
			morning_hour_to ||
			afternoon_hour_from ||
			afternoon_hour_to ||
			phone ||
			contact_email ||
			website_link ||
			instagram_link ||
			facebook_link ||
			twitter_link ||
			whatsapp ||
			address_name ||
			latitude ||
			longitude ||
			km_radius
		) {
			setHideButtonWrapper(true);
		}
	}, [
		address_name,
		afternoon_hour_from,
		afternoon_hour_to,
		bio,
		contact_email,
		instagram_link,
		facebook_link,
		km_radius,
		latitude,
		longitude,
		morning_hour_from,
		morning_hour_to,
		phone,
		twitter_link,
		website_link,
		whatsapp,
	]);

	// check horaire added
	let horaireAdded = false;
	if (opening_days) {
		if (opening_days.length > 0) {
			horaireAdded = true;
		}
	}
	// check coordonées added
	let coordoneesAdded = false;
	if (phone || twitter_link || website_link || instagram_link || facebook_link || whatsapp || contact_email) {
		coordoneesAdded = true;
	}


	return (
		<div style={{ height: '100%' }}>
			{/* Renseigner mes infos wrapper + BUTTON */}
			{!hideButtonWrapper ? (
				<div className={Styles.infoWrapper}>
					<h3>Dites-en plus !</h3>
					<p>
						C’est ici que les acheteurs peuvent connaître vos horaires, votre adresse ou en savoir un peu
						plus sur vous.
					</p>
					<div className={Styles.buttonWrapper}>
						<OutlineButton
							buttonText="Renseigner mes infos"
							backgroundColor={props.backgroundColor}
							onClick={() => props.setOpenInfoModal(true)}
						/>
					</div>
				</div>
			) : (
				<>
					<Stack
						direction="row"
						spacing={5}
						justifyContent="space-between"
						alignItems="flex-start"
						className={Styles.BothSidesWrapper}
					>
						<Stack
							className={Styles.leftSideWrapper}
							direction="column"
							spacing={1}
							justifyContent="space-between"
						>
							{horaireAdded && (
								<>
									<Stack
										direction="row"
										spacing={1}
										justifyContent="space-between"
										alignItems="baseline"
									>
										<Box component="span" className={Styles.stackTitle}>
											Horaire
										</Box>
										<Button
											onClick={() => props.setOpenEditHoraireModal(true)}
											className={Styles.stackButton}
										>
											Modifier
										</Button>
									</Stack>
									<ShowHoraire />
								</>
							)}
							{coordoneesAdded && (
								<>
									<Stack
										direction="row"
										spacing={1}
										justifyContent="space-between"
										alignItems="baseline"
									>
										<Box component="span" className={Styles.stackTitle}>
											Coordonées
										</Box>
										<Button
											onClick={() => props.setOpenEditCoordoneeModal(true)}
											className={Styles.stackButton}
										>
											Modifier
										</Button>
									</Stack>
									<ShowCoordonees />
								</>
							)}
							{!!address_name && (
								<>
									<Stack
										direction="row"
										spacing={1}
										justifyContent="space-between"
										alignItems="baseline"
									>
										<ShowAdresse
											onClick={() => props.setOpenEditAdressModal(true)}
										/>
									</Stack>
								</>
							)}
						</Stack>
						<Stack
							className={Styles.rightSideWrapper}
							direction="column"
							spacing={1}
							justifyContent="space-between"
						>
							{bio && (
								<>
									<Stack
										direction="row"
										spacing={1}
										justifyContent="space-between"
										alignItems="baseline"
									>
										<Box component="span" className={Styles.stackTitle}>
											Bio
										</Box>
										<Button
											onClick={() => props.setOpenEditBioModal(true)}
											className={Styles.stackButton}
										>
											Modifier
										</Button>
									</Stack>
									<ShowBio />
								</>
							)}
						</Stack>
					</Stack>
				</>
			)}
		</div>
	);
};

export default InfoTabContent;
