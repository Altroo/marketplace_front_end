import React, { useMemo, useRef } from "react";
import Styles from './circularAvatarInputFile.module.sass';
import { default as ImageFuture } from 'next/future/image';
import Image from 'next/image';
import AvatarIconSVG from '../../../../public/assets/svgs/globalIcons/avatar.svg';

type Props = {
	preview: string | ArrayBuffer | null;
	active: boolean;
	setAvatar?: (file: File | null) => void;
	children?: React.ReactNode;
};

const CircularAvatarInputFile: React.FC<Props> = (props: Props) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const {setAvatar} = props;

	const avatarInputOnChangeHandler = useMemo(() => (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}
		if (!setAvatar) {
			return;
		}
		const file = e.target.files[0];
		if (file && file.type.substring(0, 5) === 'image') {
			setAvatar(file);
		} else {
			setAvatar(null);
		}
	}, [setAvatar]);

	// opens hidden avatar input
	const avatarInputOnClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault();
		if (!fileInputRef.current) {
			return;
		}
		fileInputRef.current.click();
	};

	return (
		<>
			<input type="file" className={Styles.hiddenFile} ref={fileInputRef} accept="image/*"
				onChange={(e) => avatarInputOnChangeHandler(e)}
			/>
			<div className={`${Styles.avatarContainer} ${props.preview !== null ? Styles.removeBorders : ''}`}
				onClick={(e) => {
					if (props.active) {
						avatarInputOnClickHandler(e)
					}
				}}>
				{props.preview && (
					<ImageFuture src={props.preview as string} alt="" width={100} height={100}
						className={`${Styles.previewAvatar} ${Styles.avatarIcon}`}
					/>
				)}
				<ImageFuture
						src={AvatarIconSVG}
						alt=""
						width="40"
						height="40"
						sizes="100vw"
						className={`${props.preview !== null ? Styles.hideIcon : ''}`}
					/>
			</div>
		</>
	);
};

export default CircularAvatarInputFile;
