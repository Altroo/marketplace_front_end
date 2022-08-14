import React from "react";
import Styles from "./infoTabContent.module.sass";

type Props = {
	children?: React.ReactNode;
}

const InfoTabContent: React.FC<Props> = (props: Props) => {

	return (
		<div><p>INFOS CONTENT</p></div>
	);
};

export default InfoTabContent;
