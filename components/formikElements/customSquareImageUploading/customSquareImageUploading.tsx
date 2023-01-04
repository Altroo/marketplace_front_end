import React, { useRef } from "react";
import Styles from './customSquareImageUploading.module.sass';
import ImageUploading from 'react-images-uploading';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import CircularRemoveBlack from '../../../public/assets/svgs/globalIcons/circular-remove-black.svg';
import SquareImageInputFile from '../../htmlElements/buttons/squareImageInputFile/squareImageInputFile';
import { ImageListType } from 'react-images-uploading/dist/typings';
import {
	IMAGE_COUNT_LIMIT_REACHED,
	IMAGE_FORMAT,
	IMAGE_SIZE_LIMIT_REACHED,
} from '../../../utils/formValidationErrorMessages';
import 'cropperjs/dist/cropper.css';
import Cropper, { ReactCropperElement } from 'react-cropper';

type Props = {
	images: ImageListType;
	onChange: (imageList: ImageListType, addUpdateIndex?: Array<number>) => void;
	onCrop: (data: string | null, index: number) => void;
	maxNumber: number;
	children?: React.ReactNode;
};

const CustomSquareImageUploading: React.FC<Props> = (props: Props) => {
	const cropperRefOne = useRef<ReactCropperElement>(null);
	const cropperRefTwo = useRef<ReactCropperElement>(null);
	const cropperRefThree = useRef<ReactCropperElement>(null);
	const cropperRefFfour = useRef<ReactCropperElement>(null);

	const refArrays = [
		cropperRefOne,
		cropperRefTwo,
		cropperRefThree,
		cropperRefFfour,
	]

	const onCropEnd = (index: number) => {
		const imageElement: ReactCropperElement | null = refArrays[index]?.current;
		const cropper = imageElement?.cropper;
		if (cropper) {
			const data = cropper.getCroppedCanvas().toDataURL();
			props.onCrop(data, index);
		}
	};

	const onCropClear = (index: number) => {
		const imageElement: ReactCropperElement | null = refArrays[index]?.current;
		const cropper = imageElement?.cropper;
		if (cropper) {
			cropper.clear();
			props.onCrop(null, index);
		}
	}

	return (
		<>
			<ImageUploading
				multiple
				value={props.images}
				onChange={props.onChange}
				maxNumber={props.maxNumber}
				dataURLKey="dataURL"
				maxFileSize={15000000} // 15 mb
				acceptType={['jpg', 'png', 'jpeg']}
			>
				{({ imageList, onImageUpload, onImageRemove, errors }) => (
					<>
						<Stack className={Styles.rootStackWrapper} direction="row" alignItems="center">
							{imageList.map((image, index) => {
								return (
									<Stack
										key={index}
										direction="row"
										className={Styles.addImagesWrapper}
										justifyContent="center"
										alignItems="center"
										id="offersCropper"
									>
										<Cropper
											ref={refArrays[index]}
											className={Styles.showImage}
											src={image['dataURL'] as string}
											cropBoxResizable={false}
											initialAspectRatio={36 / 25}
											minCropBoxWidth={360}
											minCropBoxHeight={250}
											minCanvasWidth={360}
											minCanvasHeight={250}
											minContainerWidth={360}
											minContainerHeight={250}
											dragMode="move"
											viewMode={3}
											crop={() => onCropEnd(index)}
										/>
										<Box
											className={Styles.closeButtonWrapper}
											onClick={() => {
												onImageRemove(index);
												onCropClear(index);
											}}
										>
											<Image src={CircularRemoveBlack} alt="" width="32" height="32" sizes="100vw" />
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
							</div>
						)}
					</>
				)}
			</ImageUploading>
			{/*{clickedImage && (*/}
			{/*	<ImageModal*/}
			{/*		open={!!clickedImage}*/}
			{/*		handleClose={() => setClickedImage(null)}*/}
			{/*		direction="up"*/}
			{/*		onBackdrop={() => setClickedImage(null)}*/}
			{/*		fullScreen={true}*/}
			{/*		theme={customImageModalTheme()}*/}
			{/*		cssClasse={Styles.clickedImageModal}*/}
			{/*	>*/}
			{/*		<Box className={Styles.clickedImageBox}>*/}
			{/*			<Image className={Styles.clickedImage} src={clickedImage} width={590} height={388} sizes="100vw" alt="" />*/}
			{/*		</Box>*/}
			{/*	</ImageModal>*/}
			{/*)}*/}
		</>
	);
};

export default CustomSquareImageUploading;
