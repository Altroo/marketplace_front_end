import React, { useEffect, useState } from 'react';
import Styles from './editInfoTabContent.module.sass';
import OutlineButton from '../../../../htmlElements/buttons/outlineButton/outlineButton';
import { Box, Button, Stack } from '@mui/material';
import { useAppSelector } from '../../../../../utils/hooks';
import {
	getShopAddressName,
	getShopAfternoonHourFrom,
	getShopAfternoonHourTo,
	getShopBio,
	getShopContactEmail,
	getShopFacebookLink,
	getShopInstagramLink,
	getShopKmRadius,
	getShopLatitude,
	getShopLongitude,
	getShopMorningHourFrom,
	getShopMorningHourTo,
	getShopOpeningDays,
	getShopPhone,
	getShopTwitterLink,
	getShopWebsiteLink,
	getShopWhatsapp,
} from "../../../../../store/selectors";
import ShowHoraire from '../../../temp-shop/edit/ajouterMesInfos-Stack/showHoraire/showHoraire';
import ShowCoordonees from '../../../temp-shop/edit/ajouterMesInfos-Stack/showCoordonees/showCoordonees';
import ShowBio from '../../../temp-shop/edit/ajouterMesInfos-Stack/showBio/showBio';
import ShowAdresse from '../../../temp-shop/edit/ajouterMesInfos-Stack/showAdresse/showAdresse';

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
const EditShopInfoTabContent: React.FC<Props> = (props: Props) => {
	const [hideButtonWrapper, setHideButtonWrapper] = useState<boolean>(false);
	const bio = useAppSelector(getShopBio);
	const opening_days = useAppSelector(getShopOpeningDays);
	const morning_hour_from = useAppSelector(getShopMorningHourFrom);
	const morning_hour_to = useAppSelector(getShopMorningHourTo);
	const afternoon_hour_from = useAppSelector(getShopAfternoonHourFrom);
	const afternoon_hour_to = useAppSelector(getShopAfternoonHourTo);
	const phone = useAppSelector(getShopPhone);
	const twitter_link = useAppSelector(getShopTwitterLink);
	const website_link = useAppSelector(getShopWebsiteLink);
	const instagram_link = useAppSelector(getShopInstagramLink);
	const whatsapp = useAppSelector(getShopWhatsapp);
	const contact_email = useAppSelector(getShopContactEmail);
	const facebook_link = useAppSelector(getShopFacebookLink);
	const address_name = useAppSelector(getShopAddressName);
	const longitude = useAppSelector(getShopLongitude);
	const latitude = useAppSelector(getShopLatitude);
	const km_radius = useAppSelector(getShopKmRadius);

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
						C’est ici que les acheteurs peuvent connaître vos horaires, votre adresse ou en savoir un peu plus sur vous.
					</p>
					<div className={Styles.buttonWrapper}>
						<OutlineButton
							active={true}
							buttonText="Renseigner mes infos"
							backgroundColor={props.backgroundColor}
							onClick={() => props.setOpenInfoModal(true)}
						/>
					</div>
				</div>
			) : (
				<Stack
					direction="row"
					spacing={5}
					justifyContent="space-between"
					alignItems="flex-start"
					className={Styles.BothSidesWrapper}
				>
					<Stack className={Styles.leftSideWrapper} direction="column" spacing="32px" justifyContent="space-between">
						<Box>
							<Stack direction="row" spacing={1} justifyContent="space-between" alignItems="baseline">
								<Box component="span" className={Styles.stackTitle}>
									Horaires
								</Box>
								<Button
									onClick={() => {
										if (!props.openInfoModal) {
											props.setOpenInfoModal(true);
										}
										props.setOpenEditHoraireModal(true);
									}}
									className={Styles.stackButton}
								>
									{horaireAdded ? 'Modifier' : 'Ajouter'}
								</Button>
							</Stack>
							{horaireAdded ? (
								<ShowHoraire />
							) : (
								<span className={Styles.infoNotFound}>Vous n&apos;a pas encore renseigné vos horaires</span>
							)}
						</Box>
						<Box>
							<Stack direction="row" spacing={1} justifyContent="space-between" alignItems="baseline">
								<Box component="span" className={Styles.stackTitle}>
									Coordonées
								</Box>
								<Button
									onClick={() => {
										if (!props.openInfoModal) {
											props.setOpenInfoModal(true);
										}
										props.setOpenEditCoordoneeModal(true);
									}}
									className={Styles.stackButton}
								>
									{coordoneesAdded ? 'Modifier' : 'Ajouter'}
								</Button>
							</Stack>
							{coordoneesAdded ? (
								<ShowCoordonees />
							) : (
								<span className={Styles.infoNotFound}>Vous n&apos;a pas encore renseigné vos coordonnées</span>
							)}
						</Box>
						<Box>
							{!address_name && (
								<Stack direction="row" spacing={1} justifyContent="space-between" alignItems="baseline">
									<Box component="span" className={Styles.stackTitle}>
										Adresse
									</Box>
									<Button
										onClick={() => {
											if (!props.openInfoModal) {
												props.setOpenInfoModal(true);
											}
											props.setOpenEditAdressModal(true);
										}}
										className={Styles.stackButton}
									>
										{address_name ? 'Modifier' : 'Ajouter'}
									</Button>
								</Stack>
							)}
							{address_name ? (
								<ShowAdresse
									onClick={() => {
										if (!props.openInfoModal) {
											props.setOpenInfoModal(true);
										}
										props.setOpenEditAdressModal(true);
									}}
								/>
							) : (
								<span className={Styles.infoNotFound}>Vous n&apos;a pas encore renseigné vos adresse</span>
							)}
						</Box>
					</Stack>
					<Stack className={Styles.rightSideWrapper} direction="column" spacing={1} justifyContent="space-between">
						<Box>
							<Stack direction="row" spacing={1} justifyContent="space-between" alignItems="baseline">
								<Box component="span" className={Styles.stackTitle}>
									Bio
								</Box>
								<Button onClick={() => {
									if (!props.openInfoModal) {
											props.setOpenInfoModal(true);
										}
										props.setOpenEditBioModal(true);
								}} className={Styles.stackButton}>
									{bio ? 'Modifier' : 'Ajouter'}
								</Button>
							</Stack>
							{bio ? (
								<ShowBio />
							) : (
								<span className={Styles.infoNotFound}>Vous n&apos;a pas encore renseigné votre bio</span>
							)}
						</Box>
					</Stack>
				</Stack>
			)}
		</div>
	);
};

export default EditShopInfoTabContent;
