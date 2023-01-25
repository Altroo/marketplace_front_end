import React, { useState, useEffect, useCallback, MouseEvent, useRef } from 'react';
import { NextPage } from 'next';
import Styles from '../../styles/messages/index.module.sass';
import UserMainNavigationBar from '../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import CustomFooter from '../../components/layouts/footer/customFooter';
import {
	Button,
	Stack,
	ThemeProvider,
	Divider,
	Badge,
	Avatar,
	Box,
	Menu,
	MenuItem,
	InputAdornment,
	CircularProgress,
	IconButton,
	TextField,
} from '@mui/material';
import { AUTH_LOGIN, REAL_SHOP_BY_SHOP_LINK_ROUTE, USER_VIEW_PROFILE_BY_ID } from '../../utils/routes';
import PrimaryButton from '../../components/htmlElements/buttons/primaryButton/primaryButton';
import { useRouter } from 'next/router';
import { generatePageQueryParams } from '../../utils/helpers';
import ReactTimeAgo from 'react-time-ago';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { SagaCallBackResponseType } from '../../types/_init/_initTypes';
import {
	chatGetConversationsAction,
	chatGetLoadMoreMessagesOfTargetAction,
	chatGetMessagesOfTargetAction,
	chatPatchMessageAsSeenAction,
	chatPostArchiveConversationAction,
	chatPostMessageAction,
	chatPostMessageImageAction,
	chatSetClearMessagesOfTargetAction,
} from '../../store/actions/messages/messagesActions';
import ApiProgress from '../../components/formikElements/apiLoadingResponseOrError/apiProgress/apiProgress';
import {
	chatTextInputTheme,
	customChatImageModalTheme,
	getDefaultTheme,
	getDropDownMenuTheme,
} from '../../utils/themes';
import NewNotificationBlueSVG from '../../public/assets/svgs/mainNavBarIcons/new-notification-blue.svg';
import OnlineSVG from '../../public/assets/svgs/chatIcons/online-green.svg';
import EmptyChatMessagesIllu from '../../public/assets/images/chat_illu/empty-messages-illu.svg';
import SendImageBlackSVG from '../../public/assets/svgs/chatIcons/send-image-black.svg';
import SendMessageBlackSVG from '../../public/assets/svgs/chatIcons/send-message-black.svg';
import ArchiverBlackSVG from '../../public/assets/svgs/chatIcons/archiver-black.svg';
import BlockBlackSVG from '../../public/assets/svgs/chatIcons/block-black.svg';
// import SignalerBlackSVG from '../../public/assets/svgs/chatIcons/signaler-black.svg';
import ThreeDotsBlackSVG from '../../public/assets/svgs/chatIcons/three-dot-black.svg';
import Image from 'next/image';
import Link from 'next/link';
import { getConversations, getSelectedConversation } from '../../store/selectors';
import { useSession } from 'next-auth/react';
import InfiniteScroll from 'react-infinite-scroller';
import { accountPostBlockAction } from '../../store/actions/account/accountActions';
import OpenLockSVG from '../../public/assets/images/dashboard_illu/lock-open.svg';
import 'cropperjs/dist/cropper.css';
import Cropper, { ReactCropperElement } from 'react-cropper';
import CustomSwipeModal from '../../components/desktop/modals/rightSwipeModal/customSwipeModal';

const EmptyConversation = () => {
	return (
		<Stack
			direction="column"
			spacing="50px"
			justifyContent="center"
			alignItems="center"
			className={Styles.centerAlignStack}
		>
			<Image src={EmptyChatMessagesIllu} alt="" width="371" height="249" sizes="100vw" />
			<Stack direction="column" spacing="18px" className={Styles.emptyMessageRootStack}>
				<h2>Aucun message</h2>
				<p>Lorsque quelqu&apos;un vous envoie un message, il apparaît ici.</p>
			</Stack>
		</Stack>
	);
};

const UserBlockedContent = () => {
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
				<h2>Vous avez bloqué cette personne</h2>
				<p>
					Désormais, elle ne peut plus vous envoyer de messages et vous ne pouvez plus la contacter. À tout moment, vous
					pouvez décider de la débloquer en allant dans les paramètres de votre compte, “Contacts bloqués”.
				</p>
			</Stack>
		</Stack>
	);
};

const SelectedConversation: React.FC = () => {
	const selectedConversation = useAppSelector(getSelectedConversation);
	const { receiver, chat_messages } = selectedConversation;
	const dispatch = useAppDispatch();
	const [chatSubMenuEl, setChatSubMenuEl] = useState<null | HTMLElement>(null);
	const [chatText, setChatText] = useState<string>('');
	const [loadMoreState, setLoadMoreState] = useState<boolean>(false);
	const [userBlocked, setUserBlocked] = useState<boolean>(false);
	const scrollParentRef = useRef<HTMLElement>(null);
	const imageInputRef = useRef<HTMLInputElement>(null);
	const openChatSubMenu = Boolean(chatSubMenuEl);
	const [previewImage, setPreviewImage] = useState<string | null>(null);

	const handleChatSubMenuClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
		setChatSubMenuEl(event.currentTarget);
	}, []);

	const handleChatSubMenuClose = useCallback(() => {
		setChatSubMenuEl(null);
	}, []);

	const BlockUserHandler = (user_pk: number) => {
		const action = accountPostBlockAction(user_pk);
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
				if (!error && !cancelled && data) {
					let url = `${process.env.NEXT_PUBLIC_CHAT_CONVERSATIONS}`;
					const queryParams = generatePageQueryParams();
					url += queryParams;
					const action = chatGetConversationsAction(url, true);
					dispatch({
						...action,
						onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
							if (!error && !cancelled && data) {
								setUserBlocked(true);
								handleChatSubMenuClose();
							}
						},
					});
				}
			},
		});
	};

	const ArchiverConversationHandler = (recipient: number) => {
		const action = chatPostArchiveConversationAction(recipient);
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
				if (!error && !cancelled && data) {
					let url = `${process.env.NEXT_PUBLIC_CHAT_CONVERSATIONS}`;
					const queryParams = generatePageQueryParams();
					url += queryParams;
					const action = chatGetConversationsAction(url, true);
					dispatch({
						...action,
						onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
							if (!error && !cancelled && data) {
								handleChatSubMenuClose();
							}
						},
					});
				}
			},
		});
	};

	const cropperRef = useRef<ReactCropperElement>(null);
	const [openCropModal, setOpenCropModal] = useState<boolean>(false);

	const imageInputOnChangeUploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) {
			return;
		}
		const file = e.target.files[0];
		if (file && file.type.substring(0, 5) === 'image') {
			// to trigger loading skeleton animation
			setPreviewImage(null);
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = () => {
				setPreviewImage(reader.result as string);
				setOpenCropModal(true);
			};
		}
	};

	const ImageInputOnClickHandler = () => {
		if (!imageInputRef.current) {
			return;
		}
		imageInputRef.current.click();
	};

	const onSaveCropImage = (recipient_pk: number) => {
		const imageElement: ReactCropperElement | null = cropperRef?.current;
		const cropper = imageElement?.cropper;
		if (cropper) {
			const dataUrl = cropper.getCroppedCanvas().toDataURL();
			const action = chatPostMessageImageAction(recipient_pk, dataUrl);
			dispatch({
				...action,
				onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
					if (!error && !cancelled && data) {
						setPreviewImage(dataUrl);
						setOpenCropModal(false);
					}
				},
			});
		}
	};

	const SendMessageHandler = (recipient_pk: number) => {
		const action = chatPostMessageAction(recipient_pk, chatText);
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
				if (!error && !cancelled && data) {
					setChatText('');
				}
			},
		});
	};

	const LoadMoreMessages = () => {
		setLoadMoreState(true);
		const action = chatGetLoadMoreMessagesOfTargetAction();
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
				if (!error && !cancelled && data) {
					setLoadMoreState(false);
				}
			},
		});
	};

	return (
		<Box padding="24px">
			{receiver ? (
				<Stack direction="column" spacing="24px">
					<Stack direction="row" justifyContent="space-between">
						<Stack direction="row" spacing="18px" alignItems="center">
							<ThemeProvider theme={getDefaultTheme()}>
								{receiver.online ? (
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
											alt={`${
												receiver.shop ? receiver.shop.shop_name : receiver.first_name + ' ' + receiver.last_name
											}`}
											src={receiver.shop ? receiver.shop.shop_avatar : receiver.picture}
											sx={{ width: 48, height: 48 }}
											className={Styles.userAvatar}
										/>
									</Badge>
								) : (
									<Avatar
										alt={`${receiver.shop ? receiver.shop.shop_name : receiver.first_name + ' ' + receiver.last_name}`}
										src={receiver.shop ? receiver.shop.shop_avatar : receiver.picture}
										sx={{ width: 48, height: 48 }}
										className={Styles.userAvatar}
									/>
								)}
							</ThemeProvider>
							<Stack direction="column" spacing="5px">
								<Link
									href={
										receiver.shop
											? REAL_SHOP_BY_SHOP_LINK_ROUTE(receiver.shop.shop_url)
											: USER_VIEW_PROFILE_BY_ID(receiver.pk)
									}
									target="_blank"
									rel="noreferrer"
								>
									<span className={Styles.chatUserName}>
										{receiver.shop ? receiver.shop.shop_name : receiver.first_name + ' ' + receiver.last_name}
									</span>
								</Link>
							</Stack>
						</Stack>
						<IconButton
							aria-label="chat settings"
							id="chat-settings"
							aria-controls={openChatSubMenu ? 'chat-settings' : undefined}
							aria-haspopup="true"
							aria-expanded={openChatSubMenu ? 'true' : undefined}
							onClick={handleChatSubMenuClick}
							size="large"
							color="inherit"
						>
							<Image src={ThreeDotsBlackSVG} alt="" width="21" height="5" sizes="100vw" />
						</IconButton>
						{/* chat sub Menu */}
						<ThemeProvider theme={getDropDownMenuTheme()}>
							<Menu
								id="chat-menu"
								anchorEl={chatSubMenuEl}
								open={openChatSubMenu}
								onClose={handleChatSubMenuClose}
								MenuListProps={{
									'aria-labelledby': 'chat-settings',
								}}
								keepMounted
							>
								<MenuItem onClick={() => BlockUserHandler(receiver.pk)} className={Styles.menuItem}>
									<Stack direction="row" spacing="18px" alignItems="center">
										<Box className={Styles.menuItemImage}>
											<Image src={BlockBlackSVG} alt="" width="25" height="25" sizes="100vw" />
										</Box>
										<span>Bloquer ce profil</span>
									</Stack>
								</MenuItem>
								{/*<MenuItem onClick={() => {}} className={Styles.menuItem}>*/}
								{/*	<Stack direction="row" spacing="18px" alignItems="center">*/}
								{/*		<Box className={Styles.menuItemImage}>*/}
								{/*			<Image src={SignalerBlackSVG} alt="" width="25" height="25" sizes="100vw" />*/}
								{/*		</Box>*/}
								{/*		<span>Signaler ce profil</span>*/}
								{/*	</Stack>*/}
								{/*</MenuItem>*/}
								<MenuItem onClick={() => ArchiverConversationHandler(receiver.pk)} className={Styles.menuItemArchiver}>
									<Stack direction="row" spacing="18px" alignItems="center">
										<Box className={Styles.menuItemImage}>
											<Image src={ArchiverBlackSVG} alt="" width="25" height="25" sizes="100vw" />
										</Box>
										<span>Archiver la conversation</span>
									</Stack>
								</MenuItem>
							</Menu>
						</ThemeProvider>
						{/* end chat sub Menu */}
					</Stack>
					<Divider orientation="vertical" flexItem className={Styles.splitDivider} />
					<Stack
						direction="column-reverse"
						spacing="12px"
						justifyContent="space-between"
						className={Styles.columnReverseStack}
						ref={scrollParentRef}
					>
						<InfiniteScroll
							pageStart={1}
							initialLoad={false}
							loadMore={LoadMoreMessages}
							hasMore={Boolean(chat_messages.next)}
							loader={
								loadMoreState ? (
									<CircularProgress sx={{ color: '#0D070B', position: 'absolute', left: '50%', top: '50%' }} key={0} />
								) : undefined
							}
							isReverse={true}
							useWindow={false}
							getScrollParent={() => scrollParentRef.current}
						>
							{chat_messages.results.map((message, index, messages) => {
								let created: number | null = Date.parse(message.created);
								const hourDate: Date = new Date(message.created);
								const hour: string = hourDate.getHours() + ':' + hourDate.getMinutes();
								if (typeof messages[index - 1] !== 'undefined') {
									if (
										new Date(message.created).toDateString() === new Date(messages[index - 1].created).toDateString()
									) {
										created = null;
									}
								}
								return (
									<Stack key={index} direction="column" className={Styles.topMargin}>
										{created && <ReactTimeAgo date={created} locale="fr" className={Styles.chatConversationLongAgo} />}
										{receiver.pk === message.recipient ? (
											<Stack direction="column" className={Styles.chatBoxSenderRootStack}>
												<Stack direction="row" justifyContent="space-between">
													<span>{message.initiator}</span>
													<span>{hour}</span>
												</Stack>
												<Box className={`${message.attachment_link ? Styles.senderMessageImageChatBox : Styles.senderMessageChatBox}`}>
													{message.attachment_link ? (
														<Image
															src={message.attachment_link}
															alt=""
															width="300"
															height="300"
															sizes="100vw"
														/>
													) : (
														<span>{message.body}</span>
													)}
												</Box>
												{message.viewed && <span>Vu</span>}
											</Stack>
										) : (
											<Stack direction="column" className={Styles.chatBoxReceiverRootStack}>
												<Stack direction="row" justifyContent="space-between">
													<span>{message.initiator}</span>
													<span>{hour}</span>
												</Stack>
												<Box className={`${message.attachment_link ? Styles.receiverMessageImageChatBox : Styles.receiverMessageChatBox}`}>
													{message.attachment_link ? (
														<Image
															src={message.attachment_link}
															alt=""
															width="300"
															height="300"
															sizes="100vw"
														/>
													) : (
														<span>{message.body}</span>
													)}
												</Box>
											</Stack>
										)}
									</Stack>
								);
							})}
						</InfiniteScroll>
					</Stack>
					<Divider orientation="vertical" flexItem className={Styles.splitDivider} />
					<Stack direction="row" spacing="10px">
						<IconButton onClick={ImageInputOnClickHandler} size="large" color="inherit">
							<Image src={SendImageBlackSVG} alt="" width="30" height="30" sizes="100vw" />
							<input
								type="file"
								className={Styles.hiddenFile}
								ref={imageInputRef}
								accept="image/*"
								onChange={(e) => imageInputOnChangeUploadHandler(e)}
							/>
						</IconButton>
						{/* Start crop image */}
						<CustomSwipeModal
							keepMounted={false}
							direction="up"
							fullScreen={false}
							showCloseIcon={true}
							onBackdrop={() => setOpenCropModal(false)}
							theme={customChatImageModalTheme()}
							transition
							open={openCropModal}
							handleClose={() => setOpenCropModal(false)}
							cssClasse={Styles.centerModal}
						>
							<Stack direction="column" spacing="24px">
								<Cropper
									src={previewImage as string}
									style={{ height: '100%', width: '100%' }}
									cropBoxResizable={false}
									initialAspectRatio={0}
									minCropBoxWidth={5000}
									minCropBoxHeight={5000}
									dragMode="move"
									ref={cropperRef}
									viewMode={3}
								/>
								<Stack direction="row" width="100%" justifyContent="center" pb="24px">
									<PrimaryButton
										buttonText="Envoyez"
										active={true}
										onClick={() => onSaveCropImage(receiver.pk)}
										cssClass={Styles.cropButton}
									/>
								</Stack>
							</Stack>
						</CustomSwipeModal>
						{/* shop avatar crop end */}
						<ThemeProvider theme={chatTextInputTheme()}>
							<TextField
								variant="outlined"
								type="text"
								value={chatText}
								onChange={(e) => setChatText(e.target.value)}
								onFocus={() => {
									if (typeof chat_messages.results[chat_messages.results.length - 1] !== 'undefined' && receiver) {
										const lastMessage = chat_messages.results[chat_messages.results.length - 1];
										if (lastMessage.user === receiver.pk && !lastMessage.viewed) {
											dispatch(chatPatchMessageAsSeenAction(lastMessage.pk));
										}
									}
								}}
								onKeyDown={(e) => {
									if (e.code === 'Enter') {
										SendMessageHandler(receiver?.pk);
									}
								}}
								placeholder="Envoyer un message"
								fullWidth={true}
								className={Styles.chatTextInput}
								size="medium"
								color="primary"
								disabled={false}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={() => SendMessageHandler(receiver?.pk)}
												disabled={chatText === ''}
												onMouseDown={(e) => e.preventDefault()}
											>
												<Image src={SendMessageBlackSVG} alt="" width="20" height="20" sizes="100vw" />
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</ThemeProvider>
					</Stack>
				</Stack>
			) : userBlocked ? (
				<UserBlockedContent />
			) : (
				<EmptyConversation />
			)}
		</Box>
	);
};

// TODO - include router target ID, when initiating new conversation.
const Index: NextPage = () => {
	const { data: session, status } = useSession();
	const loading = status === 'loading';
	const router = useRouter();
	const dispatch = useAppDispatch();

	const [loadMoreState, setLoadMoreState] = useState<boolean>(false);
	const [isLoadingInitInProgress, setIsLoadingInitInProgress] = useState<boolean>(true);
	const [isLoadingNextPageInProgress, setIsLoadingNextPageInProgress] = useState<boolean>(false);
	const [isLoadingTargetInProgress, setIsLoadingTargetInProgress] = useState<boolean>(false);
	const conversations = useAppSelector(getConversations);

	useEffect(() => {
		if (!loading) {
			if (session) {
				if (isLoadingInitInProgress) {
					let url = `${process.env.NEXT_PUBLIC_CHAT_CONVERSATIONS}`;
					const queryParams = generatePageQueryParams();
					url += queryParams;
					const action = chatGetConversationsAction(url, true);
					dispatch({
						...action,
						onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
							if (!error && !cancelled && data) {
								setIsLoadingNextPageInProgress(false);
								setIsLoadingInitInProgress(false);
							}
						},
					});
				}
			} else {
				router.replace(AUTH_LOGIN).then();
			}
		}
		const getData = (isReset = false) => {
			if (conversations) {
				const { count, nextPage, results } = conversations;
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
				const action = chatGetConversationsAction(url, isReset);
				dispatch({
					...action,
					onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
						if (!error && !cancelled && data) {
							setIsLoadingNextPageInProgress(false);
							if (isReset) {
								setIsLoadingInitInProgress(false);
							}
						}
					},
				});
			}
		};

		if (loadMoreState) {
			if (conversations && conversations.results) {
				const isReset = conversations.results.length >= conversations.count;
				getData(isReset);
			}
			setLoadMoreState(false);
		}
		// dispatch clear selected messages of target.
		const handleRouteChange = () => {
			dispatch(chatSetClearMessagesOfTargetAction());
		};
		router.events.on('routeChangeStart', handleRouteChange);
		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, [conversations, dispatch, isLoadingInitInProgress, loadMoreState, loading, router, session]);

	const viewConversationHandler = (user_pk: number, message_pk: number | undefined = undefined) => {
		setIsLoadingTargetInProgress(true);
		const action = chatGetMessagesOfTargetAction(user_pk);
		dispatch({
			...action,
			onComplete: ({ error, cancelled, data }: SagaCallBackResponseType<boolean>) => {
				if (!error && !cancelled && data) {
					setIsLoadingTargetInProgress(false);
				}
			},
		});

		if (message_pk) {
			dispatch(chatPatchMessageAsSeenAction(message_pk));
		}
	};

	return (
		<>
			{loading && (
				<ApiProgress
					cssStyle={{ position: 'absolute', top: '50%', left: '50%' }}
					backdropColor="#FFFFFF"
					circularColor="#0D070B"
				/>
			)}
			{!loading && session && (
				<Stack direction="column">
					<UserMainNavigationBar />
					<main className={Styles.main}>
						<Stack direction="column" className={Styles.conversationsSideBar}>
							<Stack direction="column" spacing="32px">
								<PrimaryButton
									buttonText="Retour"
									active={true}
									onClick={() => {
										router.back();
									}}
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
											{conversations &&
												conversations.results.map((data, index) => {
													const {
														pk,
														created,
														online,
														body,
														shop_avatar_thumbnail,
														shop_name,
														user_avatar,
														user_pk,
														user_last_name,
														user_first_name,
														viewed,
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
																					alt={`${shop_name ? shop_name : user_first_name + ' ' + user_last_name}`}
																					src={shop_avatar_thumbnail ? shop_avatar_thumbnail : user_avatar}
																					sx={{ width: 48, height: 48 }}
																					className={Styles.userAvatar}
																				/>
																			</Badge>
																		) : (
																			<Avatar
																				alt={`${shop_name ? shop_name : user_first_name + ' ' + user_last_name}`}
																				src={shop_avatar_thumbnail ? shop_avatar_thumbnail : user_avatar}
																				sx={{ width: 48, height: 48 }}
																				className={Styles.userAvatar}
																			/>
																		)}
																	</ThemeProvider>
																	<Stack direction="column" spacing="5px">
																		<ReactTimeAgo
																			date={Date.parse(created)}
																			locale="fr"
																			className={Styles.chatLongAgo}
																		/>
																		<span className={Styles.chatUserName}>
																			{shop_name ? shop_name : user_first_name + ' ' + user_last_name}
																		</span>
																		<span className={`${viewed ? Styles.bodyRegularMessage : Styles.bodyNewMessage}`}>
																			{body}
																		</span>
																	</Stack>
																</Stack>
																{!viewed && <Image src={NewNotificationBlueSVG} alt="" width="12" height="12" />}
															</Stack>
															<Divider orientation="vertical" flexItem className={Styles.splitDivider} />
														</Stack>
													);
												})}
										</Stack>
									)}
									{conversations && conversations.nextPage && (
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
							{isLoadingTargetInProgress ? (
								<ApiProgress
									cssStyle={{ position: 'absolute', top: '50%', left: '50%' }}
									backdropColor="#FFFFFF"
									circularColor="#0D070B"
								/>
							) : (
								<SelectedConversation />
							)}
						</Stack>
					</main>
					<CustomFooter />
				</Stack>
			)}
		</>
	);
};

export default Index;
