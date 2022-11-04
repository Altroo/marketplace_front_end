import React from 'react';
import Styles from './circularAvatar.module.sass';
import Image from 'next/image';

type Props = {
	imageSrc: string | null;
	children?: React.ReactNode;
};

const CircularAvatar: React.FC<Props> = (props: Props) => {
	return (
		<div className={Styles.wrapper}>
			<Image
				src={props.imageSrc as string}
				alt=""
				width="0"
				height="0"
				sizes="100vw"
				className={Styles.avatar}
				loading="eager"
				priority={true}
			/>
		</div>
	);
};

export default CircularAvatar;
