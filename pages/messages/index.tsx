import React, { useState, useEffect } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import Styles from '../../styles/messages/index.module.sass';
import UserMainNavigationBar from '../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import CustomFooter from '../../components/layouts/footer/customFooter';
import { Button, Stack, ThemeProvider } from '@mui/material';
import { AUTH_LOGIN, NOT_FOUND_404 } from '../../utils/routes';
import PrimaryButton from '../../components/htmlElements/buttons/primaryButton/primaryButton';
import { useRouter } from 'next/router';
import {
	generatePageQueryParams,
	getBackendNextPageNumber,
	getServerSideCookieTokens,
	isAuthenticatedInstance,
} from '../../utils/helpers';
import { getApi } from '../../store/services/_init/_initAPI';
import {
	ChatGetConversationsLinkedResponseType,
	ChatGetConversationsPaginatedType,
	ChatGetConversationsResponseType,
	ChatGetConversationsType,
} from '../../types/messages/messagesTypes';
import ReactTimeAgo from 'react-time-ago';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { SagaCallBackResponseType } from '../../types/_init/_initTypes';
import {
	chatGetConversationsAction,
	chatGetMessagesOfTargetAction,
	chatPatchMessageAsSeenAction,
} from '../../store/actions/messages/messagesActions';
import ApiProgress from '../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import { getDefaultTheme } from '../../utils/themes';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import NewMessageSVG from '../../public/assets/svgs/mainNavBarIcons/new-notification-blue.svg';
import OnlineSVG from '../../public/assets/svgs/mainNavBarIcons/online-green.svg';
import Image from 'next/image';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import { getSelectedConversation } from '../../store/selectors';

type indexProps = {
	pageProps: {
		data: ChatGetConversationsLinkedResponseType;
	};
};
const Index: NextPage<indexProps> = (props: indexProps) => {
	const { data } = props.pageProps;
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [loadMoreState, setLoadMoreState] = useState<boolean>(false);
	const [isLoadingInitInProgress, setIsLoadingInitInProgress] = useState<boolean>(true);
	const [isLoadingNextPageInProgress, setIsLoadingNextPageInProgress] = useState<boolean>(false);
	const [conversations, setConversations] = useState<ChatGetConversationsLinkedResponseType>(data);
	const selectedConversation = useAppSelector(getSelectedConversation);

	useEffect(() => {
		const getData = (isReset = false) => {
			const { count, nextPage, results } = conversations;
			// is reset = false.
			// offers map is full
			// count > 0
			// offers map size >= count
			if (!isReset && results !== null && count > 0 && results.length >= count) {
				return;
			}
			let url = `${process.env.NEXT_PUBLIC_CHAT_CONVERSATIONS}`;
			let queryParams: string;
			if (nextPage !== null && !isReset) {
				queryParams = generatePageQueryParams(nextPage);
				url += queryParams;
			} else {
				queryParams = generatePageQueryParams();
				url += queryParams;
			}
			const action = chatGetConversationsAction(url);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<ChatGetConversationsPaginatedType>) => {
					if (!error && !cancelled && data) {
						let map: Array<ChatGetConversationsType> = [];
						if (results === null || isReset) {
							return;
						} else {
							map = results;
						}
						data.results.map((conversation) => {
							map.push(conversation);
						});
						const result = {
							results: map,
							nextPage: getBackendNextPageNumber(data.next),
							count: data.count,
						};

						setConversations(result);
						setIsLoadingNextPageInProgress(false);
						if (isReset) {
							setIsLoadingInitInProgress(false);
						}
					}
				},
			});
		};

		if (loadMoreState) {
			if (conversations.results) {
				const isReset = conversations.results.length >= conversations.count;
				getData(isReset);
			}
			setLoadMoreState(false);
		}

		if (conversations.count > 0) {
			setIsLoadingInitInProgress(false);
			console.log('infinity');
		}
	}, [conversations, dispatch, loadMoreState]);

	const viewConversationHandler = (user_pk: number, message_pk: number | undefined = undefined) => {
		dispatch(chatGetMessagesOfTargetAction(user_pk));
		if (message_pk) {
			const action = chatPatchMessageAsSeenAction(message_pk);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
					if (!error && !cancelled && data) {
						router.replace(router.asPath).then();
					}
				},
			});
		}
	};

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={Styles.main}>
				<Stack direction="column" className={Styles.conversationsSideBar}>
					<Stack direction="column" spacing="32px">
						<PrimaryButton
							buttonText="Retour"
							active={true}
							onClick={() => router.back()}
							cssClass={Styles.backButton}
						/>
						<Stack direction="column" spacing="48px" position="relative">
							<h2 className={Styles.header}>Messages</h2>
							{isLoadingInitInProgress || isLoadingNextPageInProgress ? (
								<ApiProgress
									cssStyle={{ position: 'absolute', top: '50%', left: '50%' }}
									backdropColor="#FFFFFF"
									circularColor="#0D070B"
								/>
							) : (
								<Stack direction="column" spacing="12px">
									{conversations.results.map((data, index) => {
										const {
											pk,
											created,
											online, // TODO - require state
											body, // TODO - require state
											shop_avatar_thumbnail,
											shop_name,
											user_avatar,
											user_pk,
											user_last_name,
											user_first_name,
											viewed, // TODO - require state
										} = data;
										return (
											<Stack
												direction="column"
												spacing="12px"
												key={index}
												className={Styles.conversationsListRootStack}
												onClick={() => {
													if (!viewed) {
														viewConversationHandler(user_pk, pk);
													} else {
														viewConversationHandler(user_pk);
													}
												}}
											>
												<Stack
													direction="row"
													justifyContent="space-between"
													alignItems="center"
													className={Styles.conversationsRootStack}
												>
													<Stack direction="row" spacing="18px" alignItems="center">
														<ThemeProvider theme={getDefaultTheme()}>
															{online ? (
																<Badge
																	overlap="circular"
																	anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
																	badgeContent={
																		<Avatar
																			alt="online"
																			src={OnlineSVG.src}
																			sx={{ width: 18, height: 18 }}
																			className={Styles.onlineImage}
																		/>
																	}
																>
																	<Avatar
																		alt={`${shop_name ? shop_name : user_last_name + ' ' + user_first_name}`}
																		src={shop_avatar_thumbnail ? shop_avatar_thumbnail : user_avatar}
																		sx={{ width: 48, height: 48 }}
																		className={Styles.userAvatar}
																	/>
																</Badge>
															) : (
																<Avatar
																	alt={`${shop_name ? shop_name : user_last_name + ' ' + user_first_name}`}
																	src={shop_avatar_thumbnail ? shop_avatar_thumbnail : user_avatar}
																	sx={{ width: 48, height: 48 }}
																	className={Styles.userAvatar}
																/>
															)}
														</ThemeProvider>
														<Stack direction="column" spacing="5px">
															<ReactTimeAgo date={Date.parse(created)} locale="fr" className={Styles.chatLongAgo} />
															<span className={Styles.chatUserName}>
																{shop_name ? shop_name : user_last_name + ' ' + user_first_name}
															</span>
															<span className={`${viewed ? Styles.bodyRegularMessage : Styles.bodyNewMessage}`}>
																{body}
															</span>
														</Stack>
													</Stack>
													{!viewed && <Image src={NewMessageSVG} alt="" width="12" height="12" />}
												</Stack>
												<Divider orientation="vertical" flexItem className={Styles.splitDivider} />
											</Stack>
										);
									})}
								</Stack>
							)}
							{conversations.nextPage && (
								<ThemeProvider theme={getDefaultTheme()}>
									<Stack direction="row" justifyContent="center" alignItems="center" mt={2}>
										<Link
											href={{
												query: {
													...router.query,
													page: conversations.nextPage,
												},
											}}
											replace={true}
											scroll={false}
											shallow={true}
										>
											<Button
												variant="text"
												color="primary"
												className={Styles.loadMoreButton}
												onClick={() => {
													setLoadMoreState(true);
													setIsLoadingNextPageInProgress(true);
												}}
											>
												Charger plus
											</Button>
										</Link>
									</Stack>
								</ThemeProvider>
							)}
						</Stack>
					</Stack>
				</Stack>
				<Stack direction="column" className={Styles.conversationRootStack}>
					{selectedConversation.receiver ? (
						<span>{selectedConversation.receiver.first_name}</span>
					) : (
						<span>Pas de messages</span>
					)}
				</Stack>
			</main>
			<CustomFooter />
		</Stack>
	);
};

// TODO - move to clien side rendering
export async function getServerSideProps(context: GetServerSidePropsContext) {
	const appToken = getServerSideCookieTokens(context);
	const url = `${process.env.NEXT_PUBLIC_CHAT_CONVERSATIONS}`;
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: ChatGetConversationsResponseType = await getApi(url, instance);
			if (response.status === 200) {
				const data = {
					results: response.data.results,
					nextPage: getBackendNextPageNumber(response.data.next),
					count: response.data.count,
				};
				return {
					props: {
						data: data,
					},
				};
			}
		} else {
			// redirect to login page.
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

export default Index;
