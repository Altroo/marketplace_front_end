import React from 'react';
import Styles from './editNomBoutique.module.sass';
import HelperDescriptionHeader from '../../../../../headers/helperDescriptionHeader/helperDescriptionHeader';
import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import EditShopNameField from '../../../../../archives/editShopNameField/editShopNameField';
import { useAppDispatch, useAppSelector } from '../../../../../../utils/hooks';
import {
	getShopName,
	getNewShopIsEditInProgress,
	getNewShopEditPromiseStatus,
	getNewShopApiError,
} from '../../../../../../store/selectors';
import { shopPatchShopNameAction } from '../../../../../../store/actions/shop/shopActions';
import ApiAlert from '../../../../../formikElements/apiLoadingResponseOrError/apiAlert/apiAlert';
import ApiProgress from '../../../../../formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import TopBarSaveClose from '../topBar-Save-Close/topBarSaveClose';
import { shopNameSchema } from '../../../../../../utils/formValidationSchemas';
import CustomTextInput from '../../../../../formikElements/customTextInput/customTextInput';
import { editShopNameTextInputTheme } from "../../../../../../utils/themes";

type Props = {
	handleClose: () => void;
	children?: React.ReactNode;
};

const EditNomBoutique: React.FC<Props> = (props: Props) => {
	const dispatch = useAppDispatch();
	const shopName = useAppSelector(getShopName);
	const isEditInProgress = useAppSelector(getNewShopIsEditInProgress);
	const editPromiseStatus = useAppSelector(getNewShopEditPromiseStatus);
	const apiError = useAppSelector(getNewShopApiError);

	const editShopNameSubmitHandler = (value: string) => {
		dispatch(shopPatchShopNameAction(value));
		if (!isEditInProgress && editPromiseStatus === 'REJECTED' && apiError) {
			return;
		} else {
			props.handleClose();
		}
	};
	const shopNameFieldTheme = editShopNameTextInputTheme();
	return (
		<>
			<Stack direction="column" spacing={4}>
				<Formik
					enableReinitialize={true}
					initialValues={{
						shop_name: shopName,
					}}
					validateOnMount={true}
					validationSchema={shopNameSchema}
					onSubmit={(values) => editShopNameSubmitHandler(values.shop_name)}
				>
					{({ handleChange, handleBlur, handleSubmit, values, touched, errors, isValid, isSubmitting }) => (
						<Form>
							<Stack direction="column" justifyContent="space-between" alignContent="space-between">
								<TopBarSaveClose
									handleClose={props.handleClose}
									handleSubmit={handleSubmit}
									isSubmitting={isSubmitting}
									isValid={isValid}
								/>
								<HelperDescriptionHeader
									header="Changer le nom de ma boutique"
									description="Soyez sûr quand vous changez le nom de votre boutique, certains utilisateurs
									pourraient ne pas vous reconnaître…"
									HelpText="Comment choisir son nom ?"
									headerClasses={Styles.header}
									descriptionClasses={Styles.description}
								/>
								<CustomTextInput
									id="shop_name"
									label="Nom de votre boutique"
									value={values.shop_name}
									onChange={handleChange('shop_name')}
									onBlur={handleBlur('shop_name')}
									helperText={touched.shop_name ? errors.shop_name : ''}
									error={touched.shop_name && Boolean(errors.shop_name)}
									theme={shopNameFieldTheme}
									fullWidth={true}
									size="medium"
									type="text"
									cssClass={Styles.shopNameTextField}
								/>
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
		</>
	);
};

export default EditNomBoutique;
