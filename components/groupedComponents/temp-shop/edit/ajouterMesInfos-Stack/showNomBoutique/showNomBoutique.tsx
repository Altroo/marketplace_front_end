import React from "react";
import { useAppSelector } from "../../../../../../utils/hooks";
import { getShopName } from "../../../../../../store/selectors";

const ShowNomBoutique: React.FC = () => {
	const shopName = useAppSelector(getShopName);

	return (
		<>
			{shopName}
		</>
	);
};

export default ShowNomBoutique;
