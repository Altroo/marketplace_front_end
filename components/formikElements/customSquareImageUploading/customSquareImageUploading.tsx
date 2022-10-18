import React, { useEffect, useState } from 'react';
import Styles from './customSquareImageUploading.module.sass';
import ImageUploading from 'react-images-uploading';
import { Box, Stack } from '@mui/material';
import { default as ImageFuture } from 'next/future/image';
import Image from 'next/image';
import CircularRemoveBlack from '../../../public/assets/svgs/globalIcons/circular-remove-black.svg';
import SquareImageInputFile from '../../htmlElements/buttons/squareImageInputFile/squareImageInputFile';
import { ImageListType } from 'react-images-uploading/dist/typings';
import {
	IMAGE_COUNT_LIMIT_REACHED,
	IMAGE_FORMAT,
	IMAGE_SIZE_LIMIT_REACHED
} from "../../../utils/formValidationErrorMessages";
import CloseSVG from "../../../public/assets/svgs/navigationIcons/close.svg";

type Props = {
	images: ImageListType;
	onChange: (imageList: ImageListType, addUpdateIndex?: Array<number>) => void;
	maxNumber: number;
	children?: React.ReactNode;
};

const CustomSquareImageUploading: React.FC<Props> = (props: Props) => {
	// const [errors, setErrors] = useState<Array<string> | Array<FormikErrors<ImageType>>>([]);
	// const [error, setError] = useState<string | FormikErrors<ImageType>>('');
	//
	// useEffect(() => {
	// 	if (props.error) {
	// 		if (Array.isArray(props.helperText)) {
	// 			setErrors(props.helperText);
	// 		}else if (typeof props.helperText === 'string') {
	// 			setError(props.helperText);
	// 		}
	// 	}
	// }, [props.error, props.helperText]);

	return (
		<>
			<ImageUploading
				multiple
				value={props.images}
				onChange={props.onChange}
				maxNumber={props.maxNumber}
				dataURLKey="dataURL"
				maxFileSize={5000000} // 5 mb
				acceptType={['jpg', 'png', 'jpeg']}
			>
				{({ imageList, onImageUpload, onImageRemove, errors }) =>
					(
						<>
							<Stack className={Styles.rootStackWrapper} direction="row" alignItems="center" gap={5}>
								{imageList.map((image, index) => {
									return (
										<Stack
											key={index}
											direction="row"
											className={Styles.addImagesWrapper}
											justifyContent="center"
											alignItems="center"
										>
											<ImageFuture
												className={Styles.showImage}
												src={image['dataURL'] as string}
												alt=""
												width={250}
												height={160}
												loading="eager"
												priority={true}
											/>
											<Box className={Styles.closeButtonWrapper} onClick={() => onImageRemove(index)}>
												<ImageFuture
													src={CircularRemoveBlack}
													alt=""
													width="32"
													height="32"
													sizes="100vw"
													/>
											</Box>
										</Stack>
									);
								})}
								{props.images.length <= 3 && <SquareImageInputFile onImageUpload={onImageUpload} />}
							</Stack>
							{errors && (
						<div>
							{errors?.maxNumber && <span className={Styles.errorMessage}>{IMAGE_COUNT_LIMIT_REACHED(4)}</span>}
							{errors?.acceptType && <span className={Styles.errorMessage}>{IMAGE_FORMAT}</span>}
							{errors?.maxFileSize && <span className={Styles.errorMessage}>{IMAGE_SIZE_LIMIT_REACHED}</span>}
							{/*errors?.resolution && <span>Selected file is not match your desired resolution</span>*/}
						</div>)}
						</>
					)
				}
			</ImageUploading>
		</>
	);
};

export default CustomSquareImageUploading;
