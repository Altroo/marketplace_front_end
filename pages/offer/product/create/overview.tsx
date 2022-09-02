import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { default as ImageFuture } from "next/future/image";
import Styles from "../../../../styles/offer/create/overview.module.sass";
import DesktopPublishEditNavbar
	from "../../../../components/desktop/navbars/desktopPublishEditNavbar/desktopPublishEditNavbar";
import { DropDownActionType } from "../../../../types/ui/uiTypes";
import EditGraySVG from "../../../../public/assets/svgs/globalIcons/edit-gray.svg";
import PinGraySVG from "../../../../public/assets/svgs/globalIcons/pin-gray.svg";
import SolderGraySVG from "../../../../public/assets/svgs/globalIcons/solder-gray.svg";
import PromoRefGraySVG from "../../../../public/assets/svgs/globalIcons/promo-ref-gray.svg";
import DuplicateGraySVG from "../../../../public/assets/svgs/globalIcons/duplicate-gray.svg";
import CloseBlackSVG from "../../../../public/assets/svgs/globalIcons/close-black.svg";
import { Stack, ThemeProvider, ImageList, ImageListItem } from "@mui/material";
import { getDefaultTheme } from "../../../../utils/themes";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";
import { useRouter } from "next/router";
import { getUserLocalOffer } from "../../../../store/selectors";
import { UserLocalOfferType } from "../../../../types/offer/offerTypes";
import { cookiesPoster } from "../../../../store/services/_init/_initAPI";

const Overview: NextPage = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		title,
		forWhom,
		clickAndCollect,
		categoriesList,
		deliveries,
		description,
		prix,
		quantity,
		prix_par,
		colors,
		sizes,
		picture_1,
		picture_2,
		picture_3,
		picture_4
	} = useAppSelector<UserLocalOfferType>(getUserLocalOffer);
	const [availableImages, setAvailableImages] = useState<Array<string>>([]);

	const navigateToEditePage = () => {
	};
	const deleteOffer = () => {
	};

	const dropDownActions: DropDownActionType = [
		{
			icon: EditGraySVG,
			text: "Modifier",
			onClick: navigateToEditePage
		},
		{
			icon: PinGraySVG,
			text: "Épingler l’offre",
			disabled: true
		},
		{
			icon: SolderGraySVG,
			text: "Référencer l’offre",
			disabled: true
		},
		{
			icon: PromoRefGraySVG,
			text: "Solder cette offre",
			disabled: true
		},
		{
			icon: PromoRefGraySVG,
			text: "Promouvoir",
			disabled: true
		},
		{
			icon: DuplicateGraySVG,
			text: "Duppliquer",
			disabled: true
		},
		{
			icon: CloseBlackSVG,
			text: "Supprimer",
			onClick: deleteOffer
		}
	];
	// const itemData: Array<string> = [
	// 	""
	// ];

	useEffect(() => {
		// const reader = new FileReader();
		// if (picture_1) {
		// 	reader.onloadend = () => {
		// 		setAvailableImages(prevState => {
		// 		return [...prevState, reader.result as string];
		// 	});
		// 		reader.readAsDataURL(picture_1);
		// 	};
		// } else {
		// 	setPreview(avatarInitial);
		// }
		if (picture_1) {
			setAvailableImages(prevState => {
				return [...prevState, picture_1];
			});
		}
		if (picture_2) {
			setAvailableImages(prevState => {
				return [...prevState, picture_2];
			});
		}
		if (picture_3) {
			setAvailableImages(prevState => {
				return [...prevState, picture_3];
			});
		}
		if (picture_4) {
			setAvailableImages(prevState => {
				return [...prevState, picture_4];
			});
		}
	}, [picture_1, picture_2, picture_3, picture_4]);

	const defaultTheme = getDefaultTheme();

	return (
		<ThemeProvider theme={defaultTheme}>
			<main className={Styles.main}>
				{/* both desktop and mobile */}
				<DesktopPublishEditNavbar
					actions={dropDownActions}
					onClick={() => {
						console.log("Clicked");
					}}
					menuID="desktop-validate-menu"
					buttonID="desktop-validate-menu-btn"
					buttonTitle="Valider"
				/>
				<Stack direction="row" justifyContent="space-between" spacing={5}>
					<ImageList sx={{ width: 500, height: 450 }} cols={1} rowHeight="auto">
						{availableImages.length > 0 && availableImages.map((image, index) =>
							(
								<ImageListItem key={index}>
									{image ?
										<ImageFuture
											unoptimized={true}
											src={image}
											alt=""
											loading="lazy"
											decoding="async"
											width={250}
											height={160}
										/> : null}
								</ImageListItem>
							))}
					</ImageList>
				</Stack>
			</main>
		</ThemeProvider>
	);
};

export default Overview;
