import React from 'react';
import Styles from './editCoordonees.module.sass';
import { useAppDispatch, useAppSelector } from '../../../../../utils/hooks';
import {
	getNewShopApiError,
	getNewShopEditPromiseStatus,
	getNewShopIsEditInProgress, getShopContactEmail, getShopFacebookLink, getShopInstagramLink,
	getShopObj, getShopPhone, getShopTwitterLink, getShopWebsiteLink, getShopWhatsapp
} from "../../../../../store/selectors";
import { Form, Formik } from 'formik';
import { shopCoordonneeSchema } from '../../../../../utils/formValidationSchemas';
import { Stack, Divider } from "@mui/material";
import TopBarSaveClose from '../topBar-Save-Close/topBarSaveClose';
import HelperDescriptionHeader from '../../../../headers/helperDescriptionHeader/helperDescriptionHeader';
import ApiProgress from '../../../../formikElements/apiResponse/apiProgress/apiProgress';
import ApiAlert from '../../../../formikElements/apiResponse/apiAlert/apiAlert';
import { shopPatchContactAction } from '../../../../../store/actions/shop/shopActions';
import PhoneCircularSVG from "../../../../../public/assets/svgs/phone-circular.svg";
import EmailCircularSVG from "../../../../../public/assets/svgs/email-circular.svg";
import WebSiteCircularSVG from "../../../../../public/assets/svgs/website-circular.svg";
import FacebookCircularSVG from "../../../../../public/assets/svgs/facebook-circular.svg";
import TwitterCircularSVG from "../../../../../public/assets/svgs/twitter-circular.svg";
import InstagramCircularSVG from "../../../../../public/assets/svgs/instagram-circular.svg";
import WhatsappCircularSVG from "../../../../../public/assets/svgs/whatsapp-circular.svg";
import EditShopCoordonneeField
	from "../../../../formikElements/shop/details/index/editShopCoordonneeField/editShopCoordonneeField";

type Props = {
	handleClose: () => void;
	children?: React.ReactNode;
};

const EditCoordonees: React.FC<Props> = (props: Props) => {
	const dispatch = useAppDispatch();
	const phone = useAppSelector(getShopPhone);
	const twitter_link = useAppSelector(getShopTwitterLink);
	const website_link = useAppSelector(getShopWebsiteLink);
	const instagram_link = useAppSelector(getShopInstagramLink);
	const whatsapp = useAppSelector(getShopWhatsapp);
	const contact_email = useAppSelector(getShopContactEmail);
	const facebook_link = useAppSelector(getShopFacebookLink);
	const isEditInProgress = useAppSelector(getNewShopIsEditInProgress);
	const editPromiseStatus = useAppSelector(getNewShopEditPromiseStatus);
	const apiError = useAppSelector(getNewShopApiError);

	type editCoordonnesValuesType = {
		phone: string | null;
		contact_email: string | null;
		website_link: string | null;
		facebook_link: string | null;
		twitter_link: string | null;
		instagram_link: string | null;
		whatsapp: string | null;
	};
	const editCoordoneesHandler = (values: editCoordonnesValuesType) => {
		dispatch(
			shopPatchContactAction(
				values.phone,
				values.contact_email,
				values.website_link,
				values.facebook_link,
				values.twitter_link,
				values.instagram_link,
				values.whatsapp,
			),
		);
		if (!isEditInProgress && editPromiseStatus === 'REJECTED' && apiError) {
			return;
		} else {
			props.handleClose();
		}
	};

	return (
		<Stack direction="column" spacing={4}>
			<Formik
				enableReinitialize={true}
				initialValues={{
					phone,
					contact_email,
					website_link,
					facebook_link,
					twitter_link,
					instagram_link,
					whatsapp,
				}}
				validateOnMount={true}
				validationSchema={shopCoordonneeSchema}
				onSubmit={(values) => {
					editCoordoneesHandler(values);
				}}
			>
				{({ handleChange,
						handleBlur,
						handleSubmit,
						values,
						touched,
						errors,
						isValid,
						isSubmitting }) => (
					<Form>
						<Stack direction="column" justifyContent="space-between" alignContent="space-between">
							<TopBarSaveClose
								handleClose={props.handleClose}
								handleSubmit={handleSubmit}
								isSubmitting={isSubmitting}
								isValid={isValid}
							/>
							<HelperDescriptionHeader
								header="Ajouter des coordonnées"
								description="Mettez les liens vers vos réseaux sociaux et tout ce qui pourrait intéresser vos clients"
								headerClasses={Styles.header}
								descriptionClasses={Styles.description}
							/>
							<Stack direction="column" spacing={2} divider={<Divider orientation="horizontal" flexItem />}>
								<Stack direction="column" spacing={3}>
									<span className={Styles.spanTitle}>Contact</span>
									<EditShopCoordonneeField
										icon={PhoneCircularSVG}
										id="phone"
										label="Téléphone"
										// placeholder="e.g : 610203040"
										value={values.phone ? values.phone : ''}
										onChange={handleChange('phone')}
										onBlur={handleBlur('phone')}
										helperText={touched.phone ? errors.phone : ''}
										error={touched.phone && Boolean(errors.phone)}
										type="tel"
										fullWidth={true}
									/>
									<EditShopCoordonneeField
										icon={EmailCircularSVG}
										id="contact_email"
										label="Email"
										// placeholder="e.g : hello@qaryb.com"
										value={values.contact_email ? values.contact_email : ''}
										onChange={handleChange('contact_email')}
										onBlur={handleBlur('contact_email')}
										helperText={touched.contact_email ? errors.contact_email : ''}
										error={touched.contact_email && Boolean(errors.contact_email)}
										type="email"
										fullWidth={true}
									/>
								</Stack>
								<Stack direction="column" spacing={3}>
									<span className={Styles.spanTitle}>Site internet</span>
									<EditShopCoordonneeField
										icon={WebSiteCircularSVG}
										id="website_link"
										label="Site internet"
										// placeholder="e.g : https:// ou http://"
										value={values.website_link ? values.website_link : ''}
										onChange={handleChange('website_link')}
										onBlur={handleBlur('website_link')}
										helperText={touched.website_link ? errors.website_link : ''}
										error={touched.website_link && Boolean(errors.website_link)}
										type="url"
										fullWidth={true}
									/>
								</Stack>
								<Stack direction="column" spacing={3}>
									<span className={Styles.spanTitle}>Réseaux sociaux</span>
									<EditShopCoordonneeField
										icon={FacebookCircularSVG}
										id="facebook_link"
										label="Facebook"
										// placeholder="e.g : https:// ou http://"
										value={values.facebook_link ? values.facebook_link : ''}
										onChange={handleChange('facebook_link')}
										onBlur={handleBlur('facebook_link')}
										helperText={touched.facebook_link ? errors.facebook_link : ''}
										error={touched.facebook_link && Boolean(errors.facebook_link)}
										type="text"
										fullWidth={true}
									/>
									<EditShopCoordonneeField
										icon={TwitterCircularSVG}
										id="twitter_link"
										label="Twitter"
										value={values.twitter_link ? values.twitter_link : ''}
										onChange={handleChange('twitter_link')}
										onBlur={handleBlur('twitter_link')}
										helperText={touched.twitter_link ? errors.twitter_link : ''}
										error={touched.twitter_link && Boolean(errors.twitter_link)}
										type="text"
										fullWidth={true}
									/>
									<EditShopCoordonneeField
										icon={InstagramCircularSVG}
										id="instagram_link"
										label="Instagram"
										value={values.instagram_link ? values.instagram_link : ''}
										onChange={handleChange('instagram_link')}
										onBlur={handleBlur('instagram_link')}
										helperText={touched.instagram_link ? errors.instagram_link : ''}
										error={touched.instagram_link && Boolean(errors.instagram_link)}
										type="text"
										fullWidth={true}
									/>
									<EditShopCoordonneeField
										icon={WhatsappCircularSVG}
										id="whatsapp"
										label="Whatsapp"
										value={values.whatsapp ? values.whatsapp : ''}
										onChange={handleChange('whatsapp')}
										onBlur={handleBlur('whatsapp')}
										helperText={touched.whatsapp ? errors.whatsapp : ''}
										error={touched.whatsapp && Boolean(errors.whatsapp)}
										type="tel"
										fullWidth={true}
									/>
								</Stack>
							</Stack>
						</Stack>
					</Form>
				)}
			</Formik>
			{isEditInProgress && editPromiseStatus === 'PENDING' && (
				<ApiProgress cssStyle={{ position: 'absolute', top: '45%', left: '45%' }} />
			)}
			{!isEditInProgress && editPromiseStatus === 'REJECTED' && apiError && (
				<ApiAlert
					errorDetails={apiError.details}
					cssStyle={{ position: 'absolute', left: '0', top: '50%', margin: '0 -60px -60px -60px' }}
				/>
			)}
		</Stack>
	);
};

export default EditCoordonees;
