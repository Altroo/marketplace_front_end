import React from 'react';
import Styles from './editBio.module.sass';
import { useAppDispatch, useAppSelector } from '../../../../../../utils/hooks';
import {
	getNewShopApiError,
	getNewShopEditPromiseStatus,
	getNewShopIsEditInProgress,
	getShopBio,
} from '../../../../../../store/selectors';
import { shopPatchBioAction } from '../../../../../../store/actions/shop/shopActions';
import { Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import HelperDescriptionHeader from '../../../../../headers/helperDescriptionHeader/helperDescriptionHeader';
import ApiProgress from '../../../../../formikElements/apiResponse/apiProgress/apiProgress';
import ApiAlert from '../../../../../formikElements/apiResponse/apiAlert/apiAlert';
import TopBarSaveClose from '../topBar-Save-Close/topBarSaveClose';
import { shopBioSchema } from '../../../../../../utils/formValidationSchemas';
import { bioTextAreaTheme } from '../../../../../../utils/themes';
import CustomCounterTextArea from "../../../../../formikElements/customTextArea/customCounterTextArea";

type Props = {
	handleClose: () => void;
	children?: React.ReactNode;
};

const EditBio: React.FC<Props> = (props: Props) => {
	const dispatch = useAppDispatch();
	const shopBio = useAppSelector(getShopBio);
	const isEditInProgress = useAppSelector(getNewShopIsEditInProgress);
	const editPromiseStatus = useAppSelector(getNewShopEditPromiseStatus);
	const apiError = useAppSelector(getNewShopApiError);

	const editBioSubmitHandler = (value: string) => {
		dispatch(shopPatchBioAction(value));
		if (!isEditInProgress && editPromiseStatus === 'REJECTED' && apiError) {
			return;
		} else {
			props.handleClose();
		}
	};
	const bioTextAreaCustomTheme = bioTextAreaTheme();
	return (
		<Stack direction="column" spacing={4}>
			<Formik
				enableReinitialize={true}
				initialValues={{
					bio: shopBio,
				}}
				validateOnMount={true}
				validationSchema={shopBioSchema}
				onSubmit={(values) => editBioSubmitHandler(values.bio as string)}
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
								header="Rédiger une bio"
								description="Parler de vous, donnez envie à vos clients de vous contacter"
								HelpText="Comment rédiger une belle bio ?"
								headerClasses={Styles.header}
								descriptionClasses={Styles.description}
							/>
							<CustomCounterTextArea
								id="bio"
								label="Bio"
								value={values.bio ? values.bio : ''}
								onChange={handleChange('bio')}
								onBlur={handleBlur('bio')}
								helperText={touched.bio ? errors.bio : ''}
								error={touched.bio && Boolean(errors.bio)}
								type="text"
								fullWidth={true}
								minRows={4}
								multiline={true}
								theme={bioTextAreaCustomTheme}
								size="medium"
								cssClass={Styles.textArea}
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
	);
};

export default EditBio;
