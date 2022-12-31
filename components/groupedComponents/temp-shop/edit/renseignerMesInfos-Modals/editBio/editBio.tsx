import React from 'react';
import Styles from './editBio.module.sass';
import { useAppDispatch, useAppSelector } from '../../../../../../utils/hooks';
import {
	getShopBio,
} from '../../../../../../store/selectors';
import { shopPatchBioAction } from '../../../../../../store/actions/shop/shopActions';
import { Stack } from '@mui/material';
import { useFormik } from 'formik';
import HelperDescriptionHeader from '../../../../../headers/helperDescriptionHeader/helperDescriptionHeader';
import TopBarSaveClose from '../topBar-Save-Close/topBarSaveClose';
import { shopBioSchema } from '../../../../../../utils/formValidationSchemas';
import { bioTextAreaTheme } from '../../../../../../utils/themes';
import CustomTextArea from '../../../../../formikElements/customTextArea/customTextArea';
import { SagaCallBackResponseType } from '../../../../../../types/_init/_initTypes';
import { setFormikAutoErrors } from '../../../../../../utils/helpers';
import { useRouter } from 'next/router';
import { ShopBioType } from '../../../../../../types/shop/shopTypes';

const bioTextAreaCustomTheme = bioTextAreaTheme();

type Props = {
	handleClose: () => void;
	children?: React.ReactNode;
};

const EditBio: React.FC<Props> = (props: Props) => {
	const dispatch = useAppDispatch();
	const shopBio = useAppSelector(getShopBio);
	const router = useRouter();

	const formik = useFormik({
		initialValues: {
			bio: shopBio,
		},
		enableReinitialize: true,
		validateOnMount: true,
		validationSchema: shopBioSchema,
		onSubmit: async (values, { setSubmitting, setFieldError }) => {
			const action = shopPatchBioAction(values.bio);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<ShopBioType>) => {
					if (!error && !cancelled && data) {
						props.handleClose();
						router.replace(router.asPath).then();
					}
					if (error) {
						setFormikAutoErrors({
							e: error,
							setFieldError,
						});
					}
				},
			});
			setSubmitting(false);
		},
	});

	return (
		<Stack direction="column" spacing={4}>
			<form onSubmit={(e) => e.preventDefault()}>
				<Stack direction="column" justifyContent="space-between" alignContent="space-between">
					<TopBarSaveClose
						buttonText="Enregistrer"
						handleClose={props.handleClose}
						handleSubmit={formik.handleSubmit}
						isSubmitting={formik.isSubmitting}
						isValid={formik.isValid}
					/>
					<HelperDescriptionHeader
						header="Rédiger une bio"
						description="Parler de vous, donnez envie à vos clients de vous contacter"
						// HelpText="Comment rédiger une belle bio ?"
						headerClasses={Styles.header}
						descriptionClasses={Styles.description}
					/>
					<CustomTextArea
						id="bio"
						label="Bio"
						value={formik.values.bio ? formik.values.bio : ''}
						onChange={formik.handleChange('bio')}
						onBlur={formik.handleBlur('bio')}
						helperText={formik.touched.bio ? formik.errors.bio : ''}
						error={formik.touched.bio && Boolean(formik.errors.bio)}
						type="text"
						fullWidth={true}
						minRows={4}
						multiline={true}
						theme={bioTextAreaCustomTheme}
						size="medium"
						cssClass={Styles.textArea}
					/>
				</Stack>
			</form>
		</Stack>
	);
};

export default EditBio;
