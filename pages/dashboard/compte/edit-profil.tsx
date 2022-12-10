import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../styles/dashboard/dashboard.module.sass';
import { getServerSideCookieTokens, isAuthenticatedInstance, TabletAndMobile, Desktop } from "../../../utils/helpers";
import { AccountGetProfilResponseType } from '../../../types/account/accountTypes';
import { getApi } from '../../../store/services/_init/_initAPI';
import { AUTH_LOGIN, NOT_FOUND_404 } from '../../../utils/routes';
import { UserClass } from '../../../models/account/UserClass';
import UserMainNavigationBar from '../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import { Box, Stack } from '@mui/material';
import DesktopDashboardSideNav from '../../../components/layouts/desktop/desktopDashboardSideNav/desktopDashboardSideNav';
import { useFormik } from 'formik';
import { profilSchema } from '../../../utils/formValidationSchemas';
import CircularAvatarInputFile from '../../../components/htmlElements/buttons/circularAvatarInputFile/circularAvatarInputFile';
import CustomTextInput from '../../../components/formikElements/customTextInput/customTextInput';
import PrimaryButton from '../../../components/htmlElements/buttons/primaryButton/primaryButton';
import { coordonneeTextInputTheme, offerForWhomDropdownTheme } from '../../../utils/themes';
import CustomDateInput from '../../../components/formikElements/customDateInput/customDateInput';
import { SelectChangeEvent } from '@mui/material/Select';
import CustomDropDownSelect from '../../../components/formikElements/customDropDownSelect/customDropDownSelect';
import { genderItemsList } from '../../../utils/rawData';
import dayjs, { Dayjs } from 'dayjs';
import CustomSingleCountrySelect from '../../../components/groupedComponents/offer/customSingleCountrySelect/customSingleCountrySelect';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { getAvailableCountries } from '../../../store/selectors';
import { placesGetCountriesAction } from '../../../store/actions/places/placesActions';
import { accountPatchProfilAction } from '../../../store/actions/account/accountActions';
import { SagaCallBackOnCompleteBoolType } from '../../../types/_init/_initTypes';
import MobileDashboardNav from '../../../components/layouts/mobile/mobileDashboardNav/mobileDashboardNav';
import Image from 'next/image';
import MiniBackSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import CustomToast from "../../../components/portals/customToast/customToast";
import CustomFooter from "../../../components/layouts/footer/customFooter";
import Portal from "../../../contexts/Portal";
import { useRouter } from "next/router";

type formikContentType = {
	data: UserClass;
	setShowDataUpdated: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormikContent: React.FC<formikContentType> = (props: formikContentType) => {
	const { data } = props;
	const dispatch = useAppDispatch();
	let avatarInitial: string | ArrayBuffer | null = null;
	if (data.avatar) {
		avatarInitial = data.avatar;
	}
	const [preview, setPreview] = useState<string | ArrayBuffer | null>(avatarInitial);
	const [avatar, setAvatar] = useState<File | null>(null);
	const [pickedBirthDate, setPickedBirthDate] = useState<Dayjs | null>(null);
	const [genderChoice, setGenderChoice] = useState<string>(
		data.gender === 'M' ? 'Homme' : data.gender === 'F' ? 'Femme' : '',
	);
	const [pickedCountry, setPickedCountry] = useState<string>(data.country ? data.country.name : '');
	const availableCountries = useAppSelector(getAvailableCountries);

	const formik = useFormik({
		initialValues: {
			first_name: data.first_name,
			last_name: data.last_name,
			city: data.city,
		},
		validateOnMount: true,
		validationSchema: profilSchema,
		onSubmit: async (values, { setSubmitting }) => {
			let birth_date = null;
			if (pickedBirthDate) {
				birth_date = pickedBirthDate.toJSON().split('T')[0];
			}
			let pickedGender = '';
			if (genderChoice) {
				pickedGender = genderChoice === 'Homme' ? 'M' : genderChoice === 'Femme' ? 'F' : '';
			}
			const action = accountPatchProfilAction(
				preview,
				values.first_name,
				values.last_name,
				birth_date,
				pickedGender,
				values.city,
				pickedCountry,
			);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackOnCompleteBoolType) => {
					if (!error && !cancelled && data) {
						props.setShowDataUpdated(true);
					}
				},
			});
			setSubmitting(false);
		},
	});

	const inputTheme = coordonneeTextInputTheme();

	useEffect(() => {
		if (data.birth_date) {
			setPickedBirthDate(dayjs(data.birth_date, 'YYYY-MM-DD'));
		}
		if (availableCountries.length === 0) {
			dispatch(placesGetCountriesAction());
		}
		const reader = new FileReader();
		if (avatar) {
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(avatar);
		} else {
			setPreview(avatarInitial);
		}
	}, [avatarInitial, avatar, data.birth_date, availableCountries.length, dispatch]);

	// on change for whom
	const genderHandleChange = (event: SelectChangeEvent) => {
		const {
			target: { value },
		} = event;
		setGenderChoice(value);
	};

	const handleDateChange = (newValue: Dayjs | null) => {
		setPickedBirthDate(newValue);
	};

	return (
		<Stack direction="column" alignItems="center" spacing={2}>
			<h2 className={Styles.pageTitle}>Profil</h2>
			<CircularAvatarInputFile setAvatar={setAvatar} preview={preview} active={true} showText />
			<form className={Styles.form} onSubmit={(e) => e.preventDefault()}>
				<Stack direction="column" spacing={2}>
					<CustomTextInput
						id="first_name"
						type="text"
						value={formik.values.first_name}
						onChange={formik.handleChange('first_name')}
						onBlur={formik.handleBlur('first_name')}
						helperText={formik.touched.first_name ? formik.errors.first_name : ''}
						error={formik.touched.first_name && Boolean(formik.errors.first_name)}
						fullWidth={false}
						size="medium"
						label="Nom"
						placeholder="Nom"
						theme={inputTheme}
					/>
					<CustomTextInput
						id="last_name"
						type="text"
						value={formik.values.last_name}
						onChange={formik.handleChange('last_name')}
						onBlur={formik.handleBlur('last_name')}
						helperText={formik.touched.last_name ? formik.errors.last_name : ''}
						error={formik.touched.last_name && Boolean(formik.errors.last_name)}
						fullWidth={false}
						size="medium"
						label="Prénom"
						placeholder="Prénom"
						theme={inputTheme}
					/>
					<CustomDropDownSelect
						id="gender"
						label="Genre"
						items={genderItemsList}
						theme={offerForWhomDropdownTheme()}
						onChange={genderHandleChange}
						value={genderChoice}
					/>
					<CustomDateInput
						value={pickedBirthDate}
						onChange={handleDateChange}
						label="Date de naissance"
						placeholder="Date de naissance"
						theme={inputTheme}
					/>
					<CustomTextInput
						id="city"
						type="text"
						value={formik.values.city ? formik.values.city : ''}
						onChange={formik.handleChange('city')}
						onBlur={formik.handleBlur('city')}
						helperText={formik.touched.city ? formik.errors.city : ''}
						error={formik.touched.city && Boolean(formik.errors.city)}
						fullWidth={false}
						size="medium"
						label="Ville"
						placeholder="Ville"
						theme={inputTheme}
					/>
					<CustomSingleCountrySelect
						onChange={(e: SelectChangeEvent) => {
							setPickedCountry(e.target.value);
						}}
						value={pickedCountry}
						id="country"
						label="Pays"
						items={availableCountries}
						theme={offerForWhomDropdownTheme()}
						disabled={false}
						cssClass={Styles.maxWidth}
					/>
					<PrimaryButton
						buttonText="Mettre à jour"
						active={formik.isValid && !formik.isSubmitting}
						onClick={formik.handleSubmit}
						cssClass={`${Styles.maxWidth} ${Styles.mobileButton} ${Styles.submitButton}`}
						type="submit"
					/>
				</Stack>
			</form>
		</Stack>
	);
};

type IndexProps = {
	pageProps: {
		data: UserClass;
	};
};

const EditProfil: NextPage<IndexProps> = (props: IndexProps) => {
	const { data } = props.pageProps;
	const [showDataUpdated, setShowDataUpdated] = useState<boolean>(false);
	const router = useRouter()
	const direct = router.query.direct as boolean | undefined;
	const [mobileElementClicked, setMobileElementClicked] = useState<boolean>(direct ? direct : false);

	return (
		<Stack direction="column" sx={{position: 'relative'}}>
			<UserMainNavigationBar />
			<main className={`${Styles.main} ${Styles.fixMobile}`}>
				<Desktop>
					<Stack direction="row" className={Styles.flexRootStack}>
						<DesktopDashboardSideNav backText="Mon compte" />
						<Box sx={{ width: '100%' }}>
							<FormikContent data={data} setShowDataUpdated={setShowDataUpdated} />
						</Box>
					</Stack>
				</Desktop>
				<TabletAndMobile>
					<Stack>
					{!mobileElementClicked ? (
						<MobileDashboardNav setContent={setMobileElementClicked} backText="Mon compte"/>
					) : (
						<Box sx={{ width: '100%', height: '100%' }}>
							<Stack direction="column">
								<Stack direction="row" justifyContent="space-between">
									<Stack
										className={Styles.topBackNavigationStack}
										direction="row"
										spacing={1}
										onClick={() => setMobileElementClicked(false)}
										alignItems="center"
									>
										<Image
											src={MiniBackSVG}
											alt=""
											width="0"
											height="0"
											sizes="100vw"
											className={Styles.backIcon}
										/>
										<span className={Styles.backText}>Retour</span>
									</Stack>
								</Stack>
							</Stack>
							<FormikContent data={data} setShowDataUpdated={setShowDataUpdated} />
						</Box>
					)}
				</Stack>
				</TabletAndMobile>
				<Portal id="snackbar_portal">
					<CustomToast type="success" message="Profil mis à jour" setShow={setShowDataUpdated} show={showDataUpdated}/>
				</Portal>
			</main>
			<CustomFooter />
		</Stack>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const appToken = getServerSideCookieTokens(context);
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_PROFIL}`;
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetProfilResponseType = await getApi(url, instance);
			if (response.status === 200) {
				return {
					props: {
						data: response.data,
					},
				};
			}
		} else {
			// redirect to register page.
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
				},
			};
		}
	} catch (e) {
		// redirect to error - not found page.
		return {
			redirect: {
				permanent: false,
				destination: NOT_FOUND_404,
			},
		};
	}
}

export default EditProfil;
