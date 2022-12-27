import React from 'react';
import { NextPage } from 'next';
import Styles from '../styles/index/referencer-vos-articles.module.sass';
import UserMainNavigationBar from '../components/layouts/userMainNavigationBar/userMainNavigationBar';
import { Stack } from '@mui/material';
import CustomFooter from '../components/layouts/footer/customFooter';
import GoogleSearchIllu from '../public/assets/images/footer_illu/google-search-illu.svg';
import ReferencementArticleIllu from '../public/assets/images/footer_illu/referencement-articles-illu.svg';
import ChangerArticleIllu from '../public/assets/images/footer_illu/changer-article-illu.svg';
import Image from 'next/image';
import Link from 'next/link';
import { DASHBOARD, DASHBOARD_SUBSCRIPTION } from "../utils/routes";
import TextButton from "../components/htmlElements/buttons/textButton/textButton";
import { useRouter } from 'next/router';

type Props = {
	subHeader: string;
	illustration?: string;
	illuWidth?: number;
	illuHeight?: number;
	children: React.ReactNode;
};
const ReferencerVosArticlesSection: React.FC<Props> = (props: Props) => {
	return (
		<Stack direction="column" spacing="24px" component="section">
			<h2 className={Styles.subHeader}>{props.subHeader}</h2>
			{props.children}
			{props.illustration && props.illuWidth && props.illuHeight && (
				<Image
					src={props.illustration}
					alt=""
					width={props.illuWidth}
					height={props.illuHeight}
					sizes="100vw"
					className={Styles.sectionImage}
				/>
			)}
		</Stack>
	);
};

const ReferencerVosArticles: NextPage = () => {
	const router = useRouter();

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={Styles.main}>
				<Stack direction="column" spacing="48px">
					<h1 className={Styles.header}>
						Comment <br /> référencer vos articles
					</h1>
					<ReferencerVosArticlesSection
						subHeader="Quoi"
						illustration={GoogleSearchIllu}
						illuWidth={400}
						illuHeight={268}
					>
						<p className={Styles.paragraphe}>
							Nos abonnements vous permettent de choisir le nombre de produits ou services que vous désirez{' '}
							<span className={Styles.markedBlack}>référencer sur Google</span> et{' '}
							<span className={Styles.markedBlack}>Qaryb</span>.
						</p>
					</ReferencerVosArticlesSection>
					<ReferencerVosArticlesSection
						subHeader="Comment"
						illustration={ReferencementArticleIllu}
						illuWidth={562}
						illuHeight={232}
					>
						<p className={Styles.paragraphe}>
							Prenons un exemple: si vous avez une boutique dédiée à l’univers du Yoga, et que vous avez souscrit à un
							abonnement de 4 articles, alors vous pouvez référencer dans{' '}
							<Link href={DASHBOARD} target="_blank" rel="noreferrer" className={Styles.link}>
								votre dashboard
							</Link>{' '}
							:
						</p>
						<ol className={Styles.paragraphe}>
							<li>des pantalons leggings;</li>
							<li>des shorts leggings;</li>
							<li>des tapis de Yoga;</li>
							<li>des cours de Yoga;</li>
						</ol>
					</ReferencerVosArticlesSection>
					<ReferencerVosArticlesSection
						subHeader="Changer ses articles"
						illustration={ChangerArticleIllu}
						illuWidth={562}
						illuHeight={232}
					>
						<p className={Styles.paragraphe}>
							Vous pouvez <span className={Styles.markedBlack}>à tout moment</span> remplacer l’un de vos produits. Par
							exemple, si vous ne voulez plus vendre de shorts leggings, vous pouvez les retirer et mettre à leur place
							un nouvel article comme des bougies aux huiles essentielles ou des tee-shirts amples.
						</p>
					</ReferencerVosArticlesSection>
					<ReferencerVosArticlesSection subHeader="Ajouter plus d'articles">
						<p className={Styles.paragraphe}>
							Enfin, si vous désirez augmenter le nombre d’articles à référencer, vous pouvez upgrader votre abonnement
							en ne payant que la différence de tarifs entre les deux plans.
						</p>
						<TextButton buttonText="Changer mon abonnement" onClick={() => router.push(DASHBOARD_SUBSCRIPTION)} cssClass={Styles.textButton}/>
					</ReferencerVosArticlesSection>
				</Stack>
			</main>
			<CustomFooter />
		</Stack>
	);
};

export default ReferencerVosArticles;
