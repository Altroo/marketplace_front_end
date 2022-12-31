import React, { useMemo } from 'react';
// using mobileDashboardNav styles
import Styles from '../mobileDashboardNav/mobileDashboardNav.module.sass';
import { useRouter } from 'next/router';
import {
	DASHBOARD_AUDIENCES,
	DASHBOARD_CHIFFRE_DAFFAIRE,
	DASHBOARD_INDEXED_OFFERS,
	DASHBOARD_SUBSCRIPTION,
	SITE_ROOT,
} from '../../../../utils/routes';
import MobileAbonnementSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/mobile-abonnement.svg';
import MobileIndexedOffersSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/mobile-indexed-articles.svg';
import MobileAudiencesSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/mobile-articles-total-count.svg';
import MobileChiffreAffaireSVG from '../../../../public/assets/svgs/dashboardIcons/mainIcons/mobile-usd.svg';
import { MobileSideNavElement, MobileSideNavElementType } from '../mobileDashboardNav/mobileDashboardNav';
import { Stack } from '@mui/material';
import Image from 'next/image';
import MiniBackSVG from '../../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import { AccountGetDashboardType } from '../../../../types/account/accountTypes';
import { ShopInfoContent } from '../../../../pages/dashboard';

type Props = {
	data: AccountGetDashboardType;
	setContent: React.Dispatch<React.SetStateAction<boolean>>;
	backText?: string;
	addMobilePadding?: boolean;
	children?: React.ReactNode;
};

const MobileMyBusinessNav: React.FC<Props> = (props: Props) => {
	const { data, addMobilePadding, setContent } = props;
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

	const myBusinessNavElements: Array<MobileSideNavElementType> = useMemo(() => {
		return [
			{
				text: 'Abonnement',
				link: DASHBOARD_SUBSCRIPTION,
				icon: MobileAbonnementSVG,
				current: router.pathname.endsWith(DASHBOARD_SUBSCRIPTION.replace(SITE_ROOT, '')),
				disabled: false,
				setContent: setContent,
			},
			{
				text: 'Articles référencés',
				link: DASHBOARD_INDEXED_OFFERS,
				icon: MobileIndexedOffersSVG,
				current: router.pathname.includes(DASHBOARD_INDEXED_OFFERS.replace(SITE_ROOT, '')), // changed to include
				disabled: false,
				setContent: setContent,
			},
			{
				text: 'Audience',
				link: DASHBOARD_AUDIENCES,
				icon: MobileAudiencesSVG,
				current: router.pathname.endsWith(DASHBOARD_AUDIENCES.replace(SITE_ROOT, '')),
				disabled: false,
				setContent: setContent,
			},
			{
				text: "Chiffre d'affaire",
				link: DASHBOARD_CHIFFRE_DAFFAIRE,
				icon: MobileChiffreAffaireSVG,
				current: router.pathname.endsWith(DASHBOARD_CHIFFRE_DAFFAIRE.replace(SITE_ROOT, '')),
				disabled: false,
				setContent: setContent,
			},
		];
	}, [router.pathname, setContent]);

	return (
		<Stack
			direction="column"
			className={Styles.sideBar}
			spacing={4}
			sx={{
				paddingLeft: `${addMobilePadding ? '24px !important' : '0px'}`,
				paddingRight: `${addMobilePadding ? '24px !important' : '0px'}`,
			}}
		>
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
							<Image src={MiniBackSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.backIcon} />
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
						<MobileSideNavElement
							text={element.text}
							key={index}
							link={element.link}
							icon={element.icon}
							disabled={element.disabled}
							current={element.current}
							setContent={element.setContent}
						/>
					);
				})}
			</Stack>
		</Stack>
	);
};

export default MobileMyBusinessNav;
