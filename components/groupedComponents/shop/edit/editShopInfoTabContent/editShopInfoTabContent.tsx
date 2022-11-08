import React, { useEffect, useState } from 'react';
import Styles from './editInfoTabContent.module.sass';
import OutlineButton from '../../../../htmlElements/buttons/outlineButton/outlineButton';
import { Box, Button, Stack } from '@mui/material';
import { useAppSelector } from '../../../../../utils/hooks';
import { getShopObj } from '../../../../../store/selectors';
import ShowHoraire from '../../../temp-shop/edit/ajouterMesInfos-Stack/showHoraire/showHoraire';
import ShowCoordonees from '../../../temp-shop/edit/ajouterMesInfos-Stack/showCoordonees/showCoordonees';
import ShowBio from '../../../temp-shop/edit/ajouterMesInfos-Stack/showBio/showBio';
import ShowAdresse from '../../../temp-shop/edit/ajouterMesInfos-Stack/showAdresse/showAdresse';
import { OpeningDaysArray } from '../../../../../types/shop/shopTypes';

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

	const [stateBio, setStateBio] = useState<string | null>(null);
	const [stateOpeningDays, setStateOpeningDays] = useState<OpeningDaysArray | null>(null);
	const [stateMorningHourFrom, setStateMorningHourFrom] = useState<string | null>(null);
	const [stateMorningHourTo, setStateMorningHourTo] = useState<string | null>(null);
	const [stateAfternoonHourFrom, setStateAfternoonHourFrom] = useState<string | null>(null);
	const [stateAfternoonHourTo, setStateAfternoonHourTo] = useState<string | null>(null);
	const [statePhone, setStatePhone] = useState<string | null>(null);
	const [stateContactEmail, setStateContactEmail] = useState<string | null>(null);
	const [stateWebsiteLink, setStateWebsiteLink] = useState<string | null>(null);
	const [stateFacebookLink, setStateFacebookLink] = useState<string | null>(null);
	const [stateTwitterLink, setStateTwitterLink] = useState<string | null>(null);
	const [stateInstagramLink, setStateInstagramLink] = useState<string | null>(null);
	const [stateWhatsapp, setStateWhatsapp] = useState<string | null>(null);
	const [stateAdressName, setStateAdressName] = useState<string | null>(null);
	const [stateLatitude, setStateLatitude] = useState<number | null>(null);
	const [stateLongitude, setStateLongitude] = useState<number | null>(null);
	const [stateKmRadius, setStateKmRadius] = useState<number | null>(null);

	// global states
	const [horaireAdded, setHoraireAdded] = useState<boolean>(false);
	const [coordoneesAdded, setCoordoneesAdded] = useState<boolean>(false);

	// Hide button wrapper if a value is available
	useEffect(() => {
		if (bio) {
			setStateBio(bio);
			setHideButtonWrapper(true);
		}

		if (opening_days && opening_days.length > 0) {
			if (opening_days.length > 0) {
				setStateOpeningDays(opening_days);
				setHoraireAdded(true);
				setHideButtonWrapper(true);
			}
		}

		if (morning_hour_from) {
			setStateMorningHourFrom(morning_hour_from);
			setHideButtonWrapper(true);
		}

		if (morning_hour_to) {
			setStateMorningHourTo(morning_hour_to);
			setHideButtonWrapper(true);
		}

		if (afternoon_hour_from) {
			setStateAfternoonHourFrom(afternoon_hour_from);
			setHideButtonWrapper(true);
		}

		if (afternoon_hour_to) {
			setStateAfternoonHourTo(afternoon_hour_to);
			setHideButtonWrapper(true);
		}

		if (phone) {
			setStatePhone(phone);
			setHideButtonWrapper(true);
		}

		if (contact_email) {
			setStateContactEmail(contact_email);
			setHideButtonWrapper(true);
		}

		if (website_link) {
			setStateWebsiteLink(website_link);
			setHideButtonWrapper(true);
		}

		if (facebook_link) {
			setStateFacebookLink(facebook_link);
			setHideButtonWrapper(true);
		}

		if (twitter_link) {
			setStateTwitterLink(twitter_link);
			setHideButtonWrapper(true);
		}

		if (instagram_link) {
			setStateInstagramLink(instagram_link);
			setHideButtonWrapper(true);
		}

		if (whatsapp) {
			setStateWhatsapp(whatsapp);
			setHideButtonWrapper(true);
		}

		if (address_name) {
			setStateAdressName(address_name);
			setHideButtonWrapper(true);
		}

		if (latitude) {
			setStateLatitude(latitude);
			setHideButtonWrapper(true);
		}

		if (longitude) {
			setStateLongitude(longitude);
			setHideButtonWrapper(true);
		}

		if (km_radius) {
			setStateKmRadius(km_radius);
			setHideButtonWrapper(true);
		}

		if (phone || twitter_link || website_link || instagram_link || facebook_link || whatsapp || contact_email) {
			setCoordoneesAdded(true);
			setHideButtonWrapper(true);
		}
	}, [
		address_name,
		afternoon_hour_from,
		afternoon_hour_to,
		bio,
		contact_email,
		facebook_link,
		instagram_link,
		km_radius,
		latitude,
		longitude,
		morning_hour_from,
		morning_hour_to,
		opening_days,
		phone,
		twitter_link,
		website_link,
		whatsapp,
	]);

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
										setTimeout(() => {
											props.setOpenEditHoraireModal(true);
										}, 1000);
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
										setTimeout(() => {
											props.setOpenEditCoordoneeModal(true);
										}, 1000);
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
							{!stateAdressName && (
								<Stack direction="row" spacing={1} justifyContent="space-between" alignItems="baseline">
									<Box component="span" className={Styles.stackTitle}>
										Adresse
									</Box>
									<Button
										onClick={() => {
											if (!props.openInfoModal) {
												props.setOpenInfoModal(true);
											}
											setTimeout(() => {
												props.setOpenEditAdressModal(true);
											}, 1000);
										}}
										className={Styles.stackButton}
									>
										{stateAdressName ? 'Modifier' : 'Ajouter'}
									</Button>
								</Stack>
							)}
							{stateAdressName ? (
								<ShowAdresse
									onClick={() => {
										if (!props.openInfoModal) {
											props.setOpenInfoModal(true);
										}
										setTimeout(() => {
											props.setOpenEditAdressModal(true);
										}, 1000);
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
								<Button
									onClick={() => {
										if (!props.openInfoModal) {
											props.setOpenInfoModal(true);
										}
										setTimeout(() => {
											props.setOpenEditBioModal(true);
										}, 1000);
									}}
									className={Styles.stackButton}
								>
									{stateBio ? 'Modifier' : 'Ajouter'}
								</Button>
							</Stack>
							{stateBio ? (
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
