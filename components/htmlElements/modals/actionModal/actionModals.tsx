import React from 'react';
import Styles from './actionModals.module.sass';

// comingSoon - default false (coming soon)
// title
// body - default empty.
// actions + actions style => action active - action text - action function (dismiss or func)
type Props = {
	title: string;
	actions: Array<{ active: boolean; text: string; onClick: () => void }>;
	actionsStyle: Array<string>;
	comingSoon?: boolean;
	body?: string;
	children?: React.ReactNode;
};

const ActionModals: React.FC<Props> = (props: Props) => {
	return (
		<>
			<div className={Styles.dimmerEffect}></div>
			<div className={Styles.modalbox}>
				<div className={Styles.modalWrapper}>
					{props.comingSoon && (
						<span className={Styles.modalComingSoon}>Coming soon</span>
					)}
					<span className={Styles.modalTitle}>{props.title}</span>
					{props.body && <span className={Styles.modalBody}>{props.body}</span>}
					<div className={`${props.actionsStyle}`}>
						{props.actions.map((action: {active: boolean, text: string, onClick: () => void}, index: number) => {
							return (
								<button
									className={Styles.modalRowButton}
									onClick={() => action.onClick()}
									key={index}
									style={{backgroundColor: action.active ? '#0D070B' : '#FFFFFF',
										color: action.active ? '#FFFFFF' : '#0D070B'
									}}>
									{action.text}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default ActionModals;
