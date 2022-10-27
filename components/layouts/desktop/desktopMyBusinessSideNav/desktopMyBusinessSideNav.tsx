import React from 'react';
// using desktopDashboardSideNav styles
import Styles from '../desktopDashboardSideNav/desktopDashboardSideNav.module.sass';
import { useRouter } from 'next/router';
import { DesktopSideNavElement, DesktopSideNavElementType } from "../desktopDashboardSideNav/desktopDashboardSideNav";
import MobileAbonnementSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/mobile-abonnement.svg';
import MobileIndexedOffersSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/mobile-indexed-articles.svg';
import MobileAudiencesSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/mobile-articles-total-count.svg';
import MobileChiffreAffaireSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/mobile-usd.svg';

import {
	DASHBOARD_ADD_INDEX_OFFERS,
	DASHBOARD_AUDIENCES,
	DASHBOARD_CHIFFRE_DAFFAIRE,
	DASHBOARD_INDEXED_OFFERS,
	DASHBOARD_SUBSCRIPTION
} from "../../../../utils/routes";
import { Stack } from '@mui/material';
import { default as ImageFuture } from 'next/future/image';
import MiniBackSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import { AccountGetDashboardType } from "../../../../types/account/accountTypes";
import { ShopInfoContent } from "../../../../pages/dashboard";

type Props = {
	data: AccountGetDashboardType;
	backText?: string;
	children?: React.ReactNode;
};

const DesktopMyBusinessSideNav: React.FC<Props> = (props: Props) => {
	const { data } = props;
	const {
		total_sells_count,
		total_offers_vue_count,
		shop_name,
		is_subscribed,
		shop_avatar,
		shop_url,
		global_rating,
		total_offers_count,
	} = data;
	const router = useRouter();

	const myBusinessNavElements: Array<DesktopSideNavElementType> = [
		{
			text: 'Abonnement',
			link: DASHBOARD_SUBSCRIPTION,
			icon: MobileAbonnementSVG,
			current: router.pathname.endsWith(DASHBOARD_SUBSCRIPTION),
			disabled: false,
		},
		{
			text: 'Articles référencés',
			link: DASHBOARD_INDEXED_OFFERS,
			icon: MobileIndexedOffersSVG,
			current: router.pathname.includes(DASHBOARD_INDEXED_OFFERS), // changed to include
			disabled: false,
		},
		{
			text: 'Audience',
			link: DASHBOARD_AUDIENCES,
			icon: MobileAudiencesSVG,
			current: router.pathname.endsWith(DASHBOARD_AUDIENCES),
			disabled: false,
		},
		{
			text: "Chiffre d'affaire",
			link: DASHBOARD_CHIFFRE_DAFFAIRE,
			icon: MobileChiffreAffaireSVG,
			current: router.pathname.endsWith(DASHBOARD_CHIFFRE_DAFFAIRE),
			disabled: false,
		},
	];

	return (
		<Stack direction="column" className={Styles.sideBar}>
			<Stack direction="column" spacing={4}>
				{props.backText && (
					<Stack direction="column">
						<Stack direction="row" justifyContent="space-between">
							<Stack
								className={Styles.topBackNavigationStack}
								direction="row"
								spacing={1}
								onClick={() => router.back()}
								alignItems="center"
							>
								<ImageFuture src={MiniBackSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.backIcon} />
								<span className={Styles.backText}>Retour</span>
							</Stack>
						</Stack>
						<span className={Styles.backHeader}>{props.backText}</span>
					</Stack>
				)}
				<ShopInfoContent
					total_sells_count={total_sells_count}
					total_offers_vue_count={total_offers_vue_count}
					shop_name={shop_name}
					is_subscribed={is_subscribed}
					shop_avatar={shop_avatar}
					shop_url={shop_url}
					global_rating={global_rating}
					total_offers_count={total_offers_count}
				/>
				<Stack direction="column" spacing={2}>
					{myBusinessNavElements.map((element, index) => {
						return (
							<DesktopSideNavElement
								text={element.text}
								key={index}
								link={element.link}
								icon={element.icon}
								current={element.current}
								disabled={element.disabled}
							/>
						);
					})}
				</Stack>
			</Stack>
		</Stack>
	);
};

export default DesktopMyBusinessSideNav;
