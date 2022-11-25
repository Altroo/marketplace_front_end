import React, { useState } from 'react';
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
import ImageModal from '../../desktop/modals/imageModal/imageModal';
import { customImageModalTheme } from '../../../utils/themes';

type Props = {
	images: ImageListType;
	onChange: (imageList: ImageListType, addUpdateIndex?: Array<number>) => void;
	maxNumber: number;
	children?: React.ReactNode;
};

const CustomSquareImageUploading: React.FC<Props> = (props: Props) => {
	const [clickedImage, setClickedImage] = useState<string | null>(null);

	const showImage = (src: string) => {
		setClickedImage(src);
	};

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
									>
										<Image
											className={Styles.showImage}
											src={image['dataURL'] as string}
											alt=""
											width={250}
											height={160}
											loading="eager"
											priority={true}
											onClick={() => showImage(image['dataURL'] as string)}
										/>
										<Box className={Styles.closeButtonWrapper} onClick={() => onImageRemove(index)}>
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
			{clickedImage && (
				<ImageModal
					open={!!clickedImage}
					handleClose={() => setClickedImage(null)}
					direction="up"
					onBackdrop={() => setClickedImage(null)}
					fullScreen={true}
					theme={customImageModalTheme()}
					cssClasse={Styles.clickedImageModal}
				>
					<Box className={Styles.clickedImageBox}>
						<Image className={Styles.clickedImage} src={clickedImage} width={590} height={388} sizes="100vw" alt="" />
					</Box>
				</ImageModal>
			)}
		</>
	);
};

export default CustomSquareImageUploading;
