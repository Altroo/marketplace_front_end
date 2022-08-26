import React from 'react';
import Styles from './customSquareImageUploading.module.sass';
import ImageUploading from 'react-images-uploading';
import { Box, Stack } from '@mui/material';
import { default as ImageFuture } from 'next/future/image';
import Image from 'next/image';
import CircularRemoveBlack from '../../../public/assets/svgs/globalIcons/circular-remove-black.svg';
import SquareImageInputFile from '../../htmlElements/buttons/squareImageInputFile/squareImageInputFile';
import { ImageListType } from "react-images-uploading/dist/typings";

type Props = {
	images: ImageListType;
	onChange: (imageList: ImageListType, addUpdateIndex?: Array<number>) => void;
	maxNumber: number;
	children?: React.ReactNode;
};

const CustomSquareImageUploading: React.FC<Props> = (props: Props) => {
	return (
			<ImageUploading
				multiple
				value={props.images}
				onChange={props.onChange}
				maxNumber={props.maxNumber}
				dataURLKey="data_url"
				acceptType={['jpg', 'png', 'jpeg']}
			>
				{({ imageList, onImageUpload, onImageRemove }) => (
					<Stack
						className={Styles.rootStackWrapper}
						direction="row"
						alignItems="center" gap={5}>
						{imageList.map((image, index) => {
							return (
								<Stack key={index} direction="row">
									<Stack direction="row" className={Styles.addImagesWrapper} justifyContent="center" alignItems="center">
										<ImageFuture
											className={Styles.showImage}
											src={image['data_url']}
											alt=""
											width={250}
											height={160}
											loading="lazy"
										/>
										<Box className={Styles.closeButtonWrapper} onClick={() => onImageRemove(index)}>
											<Image src={CircularRemoveBlack} width={32} height={32} alt="" />
										</Box>
									</Stack>
								</Stack>
							);
						})}
						{props.images.length <= 3 && (
							<SquareImageInputFile
								onImageUpload={onImageUpload}
								// dragProps={dragProps}
								// isDragging={isDragging}
							/>
						)}
					</Stack>
				)}
			</ImageUploading>
	);
};

export default CustomSquareImageUploading;
