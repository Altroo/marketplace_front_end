import React from 'react';
import Styles from './editNomBoutique.module.sass';
import HelperDescriptionHeader from '../../../../../headers/helperDescriptionHeader/helperDescriptionHeader';
import { Stack } from '@mui/material';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../../../../utils/hooks';
import {
	getShopName,
} from '../../../../../../store/selectors';
import { shopPatchShopNameAction } from '../../../../../../store/actions/shop/shopActions';
import TopBarSaveClose from '../topBar-Save-Close/topBarSaveClose';
import { shopNameSchema } from '../../../../../../utils/formValidationSchemas';
import CustomTextInput from '../../../../../formikElements/customTextInput/customTextInput';
import { editShopNameTextInputTheme } from '../../../../../../utils/themes';
import { SagaCallBackResponseType } from '../../../../../../types/_init/_initTypes';
import { ShopNameType } from '../../../../../../types/shop/shopTypes';
import { useRouter } from 'next/router';
import { setFormikAutoErrors } from '../../../../../../utils/helpers';

const shopNameFieldTheme = editShopNameTextInputTheme();

type Props = {
	handleClose: () => void;
	children?: React.ReactNode;
};

const EditNomBoutique: React.FC<Props> = (props: Props) => {
	const dispatch = useAppDispatch();
	const shopName = useAppSelector(getShopName);
	const router = useRouter();

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			shop_name: shopName,
		},
		validateOnMount: true,
		validationSchema: shopNameSchema,
		onSubmit: async (values, { setSubmitting, setFieldError }) => {
			const action = shopPatchShopNameAction(values.shop_name);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<ShopNameType>) => {
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
						header="Changer le nom de ma boutique"
						description="Soyez sûr quand vous changez le nom de votre boutique, certains utilisateurs
									pourraient ne pas vous reconnaître…"
						HelpText="Ce peut être le nom de votre marque ou votre propre nom"
						headerClasses={Styles.header}
						descriptionClasses={Styles.description}
					/>
					<CustomTextInput
						id="shop_name"
						label="Nom de votre boutique"
						value={formik.values.shop_name}
						onChange={formik.handleChange('shop_name')}
						onBlur={formik.handleBlur('shop_name')}
						helperText={formik.touched.shop_name ? formik.errors.shop_name : ''}
						error={formik.touched.shop_name && Boolean(formik.errors.shop_name)}
						theme={shopNameFieldTheme}
						fullWidth={true}
						size="medium"
						type="text"
						cssClass={Styles.shopNameTextField}
					/>
				</Stack>
			</form>
		</Stack>
	);
};

export default EditNomBoutique;
