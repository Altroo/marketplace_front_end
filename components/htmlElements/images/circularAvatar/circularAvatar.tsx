import React from 'react';
import Styles from './circularAvatar.module.sass';
import { default as ImageFuture } from 'next/future/image';

type Props = {
	imageSrc: string | null;
	children?: React.ReactNode;
};

const css = {width: 'auto'};
const CircularAvatar: React.FC<Props> = (props: Props) => {
	return (
		<div className={Styles.wrapper}>
			{props.imageSrc && <ImageFuture src={props.imageSrc as string}
											alt=""
											width={300}
											height={300}
											className={Styles.avatar}
											style={css}
			/>}
		</div>
	);
};

export default CircularAvatar;
