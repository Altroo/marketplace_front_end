import React from "react";
// import Styles from "./showNomBoutique.module.sass";
import { useAppSelector } from "../../../../../../utils/hooks";
import { getShopName } from "../../../../../../store/selectors";

type Props = {
	children?: React.ReactNode;
}

const ShowNomBoutique: React.FC<Props> = (props: Props) => {
	const shopName = useAppSelector(getShopName);

	return (
		<>
			{shopName}
		</>
	);
};

export default ShowNomBoutique;
