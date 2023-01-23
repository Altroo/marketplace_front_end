import React from "react";
import { GetServerSidePropsContext, NextPage } from "next";
import Styles from "../../../styles/messages/receiver_pk/index.module.sass";
import { getServerSideCookieTokens, isAuthenticatedInstance } from "../../../utils/helpers";
import {
	ChatGetMessagesOfTargetInterface,
	ChatGetMessagesOfTargetResponseType
} from "../../../types/messages/messagesTypes";
import { AUTH_LOGIN, CHAT_INDEX, NOT_FOUND_404 } from "../../../utils/routes";
import { getApi } from "../../../store/services/_init/_initAPI";

type IndexProps = {
	pageProps: {
		data: ChatGetMessagesOfTargetInterface;
	}
}
const Index: NextPage<IndexProps> = (props: IndexProps) => {
	return (
		<>

		</>
	);
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { receiver_pk } = context.query;
	const appToken = getServerSideCookieTokens(context);
	if (!receiver_pk) {
		return {
			redirect: {
				permanent: false,
				destination: CHAT_INDEX,
			},
		};
	}
	const url = `${process.env.NEXT_PUBLIC_CHAT_MESSAGE}?target=${receiver_pk}`;
	try {
		if (appToken.tokenType === 'TOKEN' && appToken.initStateToken.access_token !== null) {
			const instance = isAuthenticatedInstance(appToken.initStateToken);
			const response: ChatGetMessagesOfTargetResponseType = await getApi(url, instance);
			if (response.status === 200) {
				return {
					props: {
						data: response.data,
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