import React from "react";
import Styles from './dismissMessageModal.module.sass';

type Props = {
	title: string;
	body: string;
	buttonText: string;
	visible: boolean;
	dismissHandler: () => void;
	children?: React.ReactNode;
};

const DismissMessageModal: React.FC<Props> = (props: Props) => {
	return props.visible ? (
		<>
			<div className={Styles.dimmerEffect}></div>
			<div className={Styles.modalbox}>
				<div className={Styles.modalWrapper}>
					<span className={Styles.modalTitle}>{props.title}</span>
					<span className={Styles.modalBody}>{props.body}</span>
					<button className={Styles.modalRowButton}
						onClick={props.dismissHandler}>
						{props.buttonText}
					</button>
				</div>
			</div>
		</>
	): <></>;
};

export default DismissMessageModal;

