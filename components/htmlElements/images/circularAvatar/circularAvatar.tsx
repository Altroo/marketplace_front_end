import React from 'react';
import Styles from './circularAvatar.module.sass';
import { default as ImageFuture } from 'next/future/image';

type Props = {
	imageSrc: string | null;
	children?: React.ReactNode;
};

const CircularAvatar: React.FC<Props> = (props: Props) => {
	return (
		<div className={Styles.wrapper}>
			<ImageFuture
				src={props.imageSrc as string}
				alt=""
				width="0"
				height="0"
				sizes="100vw"
				className={Styles.avatar}
				loading="eager"
			/>
		</div>
	);
};

export default CircularAvatar;
