import React, { useEffect, useState } from "react";
import { NextPage, GetStaticPropsContext } from 'next';
import Styles from './index.module.sass';
import { allowAnyInstance } from '../../../utils/helpers';
import { getApi } from '../../../store/services/_init/_initAPI';
import { NOT_FOUND_404 } from '../../../utils/routes';
import { router } from 'next/client';
import {
	SeoPagesGetDefaultSeoSlugsResponseType,
	SeoPagesGetSingleSeoDataResponseType,
} from '../../../types/seo-pages/seoPagesTypes';
import { DefaultSeoPageClass } from '../../../models/seo-data/DefaultSeoPageClass';
import { Box, Stack } from '@mui/material';
import { ApiErrorResponseType } from '../../../types/_init/_initTypes';
import UserMainNavigationBar from "../../../components/layouts/userMainNavigationBar/userMainNavigationBar";
import { NextSeo } from "next-seo";
import CustomFooter from "../../../components/layouts/footer/customFooter";
import ShopTabContent from "../../../components/groupedComponents/shop/get/shopTabContent/shopTabContent";
import MobileFilterWhiteSVG from "../../../public/assets/svgs/globalIcons/mobile-filter-white.svg";
import MobileOffersFilterButton
	from "../../../components/mobile/buttons/mobileOffersFilterButton/mobileOffersFilterButton";
import DefaultSeoTextContent from "../../../components/groupedComponents/collections/defaultSeoTextContent/defaultSeoTextContent";
import { data } from "dom7";
import DefaultSeoOffersContent
	from "../../../components/groupedComponents/collections/defaultSeoOffersContent/defaultSeoOffersContent";

type IndexProps = {
	pageProps: {
		data: DefaultSeoPageClass;
	};
};
const Index: NextPage<IndexProps> = (props: IndexProps) => {
	const { pk, title, page_meta_description, header, paragraphe, tags } = props.pageProps.data;


	return (
		<>
			<NextSeo title={title} description={page_meta_description}/>
			<Stack direction="column">
				<UserMainNavigationBar />
				<main className={Styles.main}>
					<DefaultSeoTextContent title={title} header={header} paragraphe={paragraphe} tags={tags} filterMargin={true}/>
					{/* Add endpoint ID or change compo - gap 75px between filter & offers */}
					<DefaultSeoOffersContent page_pk={pk}/>
				</main>
				<CustomFooter />
			</Stack>
		</>
	);
};

export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	const url = `${process.env.NEXT_PUBLIC_SEO_PAGES_ROOT}/`;
	const instance = allowAnyInstance();
	const response: SeoPagesGetDefaultSeoSlugsResponseType = await getApi(url, instance);
	if (response.status === 200) {
		const paths = response.data.map((seo_page) => ({
			params: { page_url: seo_page.page_url },
		}));
		return { paths, fallback: 'blocking' };
	}
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const params = context.params;
	const url = `${process.env.NEXT_PUBLIC_SEO_PAGES_ROOT}/${params?.page_url}/`;
	try {
		const instance = allowAnyInstance();
		const response: SeoPagesGetSingleSeoDataResponseType = await getApi(url, instance);
		if (response.status === 200) {
			return {
				props: {
					data: response.data,
				},
			};
		}
	} catch (e) {
		return {
			redirect: {
				permanent: false,
				destination: NOT_FOUND_404,
			},
		};
	}
}

export default Index;
