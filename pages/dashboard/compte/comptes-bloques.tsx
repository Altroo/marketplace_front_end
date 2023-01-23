import React, { useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../../styles/dashboard/dashboard.module.sass';
import { useRouter } from 'next/router';
import { Box, Stack, ThemeProvider } from '@mui/material';
import UserMainNavigationBar from '../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import {
	Desktop,
	getServerSideCookieTokens,
	isAuthenticatedInstance,
	TabletAndMobile
} from "../../../utils/helpers";
import DesktopDashboardSideNav from '../../../components/layouts/desktop/desktopDashboardSideNav/desktopDashboardSideNav';
import MobileDashboardNav from '../../../components/layouts/mobile/mobileDashboardNav/mobileDashboardNav';
import Image from 'next/image';
import MiniBackSVG from '../../../public/assets/svgs/dashboardIcons/leftSideNavIcons/mini-back.svg';
import MiniBlockSVG from '../../../public/assets/svgs/dashboardIcons/mainIcons/mini-block.svg';
import OpenLockSVG from '../../../public/assets/images/dashboard_illu/lock-open.svg';
import Portal from '../../../contexts/Portal';
import CustomToast from '../../../components/portals/customToast/customToast';
import CustomFooter from '../../../components/layouts/footer/customFooter';
import {
	AccountGetBlockedUsersResponseType,
	AccountGetBlockedUsersType,
} from "../../../types/account/accountTypes";
import { getApi } from '../../../store/services/_init/_initAPI';
import { AUTH_LOGIN, NOT_FOUND_404 } from '../../../utils/routes';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { getDefaultTheme } from '../../../utils/themes';
import Divider from '@mui/material/Divider';
import PrimaryButton from "../../../components/htmlElements/buttons/primaryButton/primaryButton";
import {
	accountDeleteBlockAction,
} from "../../../store/actions/account/accountActions";
import { useAppDispatch } from "../../../utils/hooks";
import { SagaCallBackResponseType } from "../../../types/_init/_initTypes";

type FullBlockedContentType = {
	data: Array<AccountGetBlockedUsersType>;
	setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
};
const FullBlockedContent: React.FC<FullBlockedContentType> = (props: FullBlockedContentType) => {
	const { data, setShowToast } = props;
	const router = useRouter();
	const dispatch = useAppDispatch()
	const onUnblockHandler = (user_pk: number) => {
		const action = accountDeleteBlockAction(user_pk);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
					if (!error && !cancelled && data) {
						router.replace(router.asPath).then(() => {
							setShowToast(true);
						});
					}
				},
			});
	};

	return (
		<Stack direction="column" className={Styles.blockRootStack} spacing="32px">
			<Stack direction="column" spacing="5px">
				<h2 className={Styles.blockHeader}>Comptes bloqués</h2>
				<Stack direction="column" className={Styles.blockSubHeader}>
					<span>Gérer les comptes que vous avez bloqués.</span>
					<span>
						Quand vous bloquez quelqu’un, cette personne ne peut plus vous envoyer de messages et vous ne voyez pas ses
						notifications.
					</span>
				</Stack>
			</Stack>
			<Stack direction="column" spacing="12px">
				{data.map((blocked, index) => {
					const { blocked_user_avatar, blocked_user_first_name, blocked_user_last_name, blocked_user_pk } = blocked;
					return (
						<Stack direction="column" key={index} spacing="12px" className={Styles.blockedUsersListRootStack}>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								width="100%"
							>
								<Stack direction="row" spacing="18px" alignItems="center">
									<ThemeProvider theme={getDefaultTheme()}>
										<Badge
											overlap="circular"
											anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
											badgeContent={
												<Avatar
													alt="blocked"
													src={MiniBlockSVG.src}
													sx={{ width: 18, height: 18 }}
													className={Styles.miniBlockImage}
												/>
											}
										>
											<Avatar
												alt={`${blocked_user_first_name} ${blocked_user_last_name}`}
												src={blocked_user_avatar}
												sx={{ width: 48, height: 48 }}
												className={Styles.blockedUserAvatar}
											/>
										</Badge>
									</ThemeProvider>
									<span className={Styles.blockedUserName}>{`${blocked_user_first_name} ${blocked_user_last_name}`}</span>
								</Stack>
								<PrimaryButton
									cssClass={Styles.unblockButton}
									buttonText="Débloquer"
									active={true}
									onClick={() => onUnblockHandler(blocked_user_pk)}
								/>
							</Stack>
							<Divider orientation="vertical" flexItem className={Styles.splitDivider} />
						</Stack>
					);
				})}
			</Stack>
		</Stack>
	);
};

const EmptyBlockedContent: React.FC = () => {
	return (
		<Stack
			direction="column"
			alignItems="center"
			justifyContent="center"
			spacing={{ xs: '18px', sm: '18px', md: '50px', lg: '50px', xl: '50px' }}
			className={Styles.blockRootStack}
			height="fit-content"
		>
			<Image src={OpenLockSVG} alt="" width="145" height="233" />
			<Stack direction="column" spacing="18px" alignItems="center" className={Styles.emptyBlockStack}>
				<h2>Vous n’avez bloqué personne</h2>
				<p>
					Quand vous bloquez quelqu’un, cette personne ne peut plus vous envoyer de messages et vous ne voyez pas ses
					notifications.
				</p>
			</Stack>
		</Stack>
	);
};

type IndexProps = {
	pageProps: {
		data: Array<AccountGetBlockedUsersType>;
	};
};
const ComptesBloques: NextPage<IndexProps> = (props: IndexProps) => {
	const { data } = props.pageProps;
	const [showToast, setShowToast] = useState<boolean>(false);
	const router = useRouter();
	const direct = router.query.direct as boolean | undefined;
	const [mobileElementClicked, setMobileElementClicked] = useState<boolean>(direct ? direct : false);

	return (
		<Stack direction="column" sx={{ position: 'relative' }}>
			<UserMainNavigationBar />
			<main className={`${Styles.main} ${Styles.fixMobile}`}>
				<Desktop>
					<Stack direction="row" className={Styles.flexRootStack}>
						<DesktopDashboardSideNav backText="Mon compte" />
						<Box sx={{ width: '100%' }}>
							{data.length > 0 ? <FullBlockedContent data={data} setShowToast={setShowToast} /> : <EmptyBlockedContent />}
						</Box>
					</Stack>
				</Desktop>
				<TabletAndMobile>
					<Stack>
						{!mobileElementClicked ? (
							<MobileDashboardNav setContent={setMobileElementClicked} backText="Mon compte" />
						) : (
							<Box sx={{ width: '100%', height: '100%' }}>
								<Stack direction="column">
									<Stack direction="row" justifyContent="space-between">
										<Stack
											className={Styles.topBackNavigationStack}
											direction="row"
											spacing={1}
											onClick={() => setMobileElementClicked(false)}
											alignItems="center"
										>
											<Image src={MiniBackSVG} alt="" width="0" height="0" sizes="100vw" className={Styles.backIcon} />
											<span className={Styles.backText}>Retour</span>
										</Stack>
									</Stack>
								</Stack>
								{data.length > 0 ? <FullBlockedContent data={data} setShowToast={setShowToast} /> : <EmptyBlockedContent />}
							</Box>
						)}
					</Stack>
				</TabletAndMobile>
				<Portal id="snackbar_portal">
					<CustomToast type="success" message="Utilisateur débloquer." setShow={setShowToast} show={showToast} />
				</Portal>
			</main>
			<CustomFooter />
		</Stack>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const appToken = getServerSideCookieTokens(context);
	const url = `${process.env.NEXT_PUBLIC_ACCOUNT_BLOCK}`;
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: AccountGetBlockedUsersResponseType = await getApi(url, instance);
			if (response.status === 200) {
				return {
					props: {
						data: response.data,
					},
				};
			}
		} else {
			// redirect to register page.
			return {
				redirect: {
					permanent: false,
					destination: AUTH_LOGIN,
				},
			};
		}
	} catch (e) {
		// redirect to error - not found page.
		return {
			redirect: {
				permanent: false,
				destination: NOT_FOUND_404,
			},
		};
	}
}

export default ComptesBloques;
