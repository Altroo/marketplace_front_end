import React from 'react';
import { GetStaticPropsContext, NextPage } from 'next';
import Styles from '../../../styles/blog/blogPageUrl.module.sass';
import { allowAnyInstance } from '../../../utils/helpers';
import { getApi } from '../../../store/services/_init/_initAPI';
import { NOT_FOUND_404 } from '../../../utils/routes';
import { BlogPageDetailsDataResponseType, BlogPageSlugsResponseType } from '../../../types/blog/blogTypes';
import { BlogClass } from '../../../models/blog/BlogClass';
import { NextSeo } from 'next-seo';
import UserMainNavigationBar from '../../../components/layouts/userMainNavigationBar/userMainNavigationBar';
import CustomFooter from '../../../components/layouts/footer/customFooter';
import { Box, Stack, ThemeProvider } from '@mui/material';
import Image from 'next/image';
import { getDateStringFromFormatedDate } from '../../../utils/rawData';
import { ReadOnlyChipsTheme } from '../../../utils/themes';
import Chip from '@mui/material/Chip';

type IndexProps = {
	pageProps: {
		data: BlogClass;
	};
};
const Index: NextPage<IndexProps> = (props: IndexProps) => {
	const { title, page_meta_description, background_image, background_image_alt, header, content, tags, created_date } =
		props.pageProps.data;

	return (
		<>
			<NextSeo title={title} description={page_meta_description} />
			<Stack direction="column">
				<UserMainNavigationBar />
				<main className={Styles.main}>
					<Stack direction="column" spacing="24px">
						<Image
							src={background_image}
							alt={background_image_alt}
							width="0"
							height="0"
							sizes="100vw"
							className={Styles.backgroundImage}
						/>
						<Box className={Styles.rootBoxContent} component="article">
							<span className={Styles.date}>{getDateStringFromFormatedDate(created_date)}</span>
							<h1 className={Styles.header}>{header}</h1>
							<ThemeProvider theme={ReadOnlyChipsTheme()}>
								<Stack direction="row" flexWrap="wrap" className={Styles.rootChipStack}>
									{tags.map((tag, index) => {
										return <Chip key={index} label={tag} variant="filled" />;
									})}
								</Stack>
							</ThemeProvider>
						</Box>
						<div className={Styles.rootDivContent} dangerouslySetInnerHTML={{ __html: content }} />
					</Stack>
				</main>
				<CustomFooter />
			</Stack>
		</>
	);
};

export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	const url = `${process.env.NEXT_PUBLIC_BLOG_ROOT}/`;
	const instance = allowAnyInstance();
	const response: BlogPageSlugsResponseType = await getApi(url, instance);
	if (response.status === 200) {
		const paths = response.data.map((blog_page) => ({
			params: { page_url: blog_page.page_url },
		}));
		return { paths, fallback: 'blocking' };
	}
}

export async function getStaticProps(context: GetStaticPropsContext) {
	const params = context.params;
	const url = `${process.env.NEXT_PUBLIC_BLOG_ROOT}/${params?.page_url}/`;
	try {
		const instance = allowAnyInstance();
		const response: BlogPageDetailsDataResponseType = await getApi(url, instance);
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
