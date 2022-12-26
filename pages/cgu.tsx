import React from 'react';
import { NextPage } from 'next';
import Styles from '../styles/index/cgu.module.sass';
import { Stack } from '@mui/material';

const Cgu: NextPage = () => {
	return (
		<main className={Styles.main}>
			<Stack direction="column" spacing={3}>
				<Stack direction="column" className={Styles.headerRootStack}>
					<h1 className={Styles.header}>
						Qaryb <br /> Mise à jour des CGU <br />
						<span className={Styles.subHeader}>du 27/10/2022</span>
					</h1>
				</Stack>
				<Stack direction="column" component="section" className={Styles.bodyRoot}>
					<h2>ARTICLE 1 : Création de votre boutique en ligne.</h2>
					<Stack direction="column" component="section">
						<h3>1. Conditions générales d’utilisation.</h3>
						<p>
							Le Service est fourni suivant les CGU et ces dernières prévaudront sur toutes autres conditions figurant
							dans tout autre document, sauf dérogation préalable, expresse et écrite.
						</p>
						<p>
							Toute le Service est fourni sous réserve que le Client accepte les CGU. L’utilisation des services
							proposés par la Plateforme ou la consultation de notre site implique l’acceptation des présentes CGU et de
							la Politique de protection des données.
						</p>
						<p>
							Les présentes CGU régissent les relations contractuelles entre la Société et le Client qui les acceptent
							sans réserve.
						</p>
						<p>
							Toutes nouvelles fonctionnalités ou outils ajoutés au service actuel sont également soumis aux mêmes
							conditions.
						</p>
						<p>
							Pour la réalisation de la prestation et l’exploitation du Service, la société Qaryb est propriétaire de la
							marque «Qaryb» ainsi la société Wefind l’exploitera dans le cadre des présentes, à l’appui de la
							convention conclue entre les deux parties.
						</p>
					</Stack>
					<Stack direction="column" component="section">
						<h3>2. Service de Boutique en ligne.</h3>
						<p>
							Qaryb offre à ces utilisateurs la possibilité d’ouvrir leur Boutiques en ligne leurs permettant de
							présenter et vendre leurs produits et services en ligne.
						</p>
						<p>Cette rubrique est accessible par deux types d’utilisateurs:</p>
						<ul>
							<li>Les Utilisateurs souhaitant vendre leurs produits et services «Vendeurs».</li>
							<li>
								Les Utilisateurs souhaitant acheter les produits et services qui leurs sont offerts par les Vendeurs
								«Acheteurs».
							</li>
						</ul>
						<p>
							Les Vendeurs peuvent ouvrir leurs Boutiques en ligne en choisissant entre les deux options suivantes :
						</p>
						<p>
							La version gratuite de nos services offre l’accès à une boutique en ligne sur laquelle les vendeurs
							peuvent publier autant d’articles qu’ils veulent. Toutefois, cette version ne leur permet pas d’être
							visibles sur notre plateforme ou sur Google.
						</p>
						<p>Qaryb n’est pas tenue de vérifier le contenu et la propriété des boutiques gratuites.</p>
						<p>
							La version payante offre aux Vendeurs l’avantage de référencer leurs offres, en souscrivant à un
							abonnement annuel dont le prix varie selon le nombre d’articles qu’ils veulent référencer.
						</p>
					</Stack>
					<Stack direction="column" component="section">
						<h3>3. Abonnement à nos Services (pour les vendeurs)</h3>
						<p>
							Qaryb fixe les prix des Abonnements et se préserve le droit de revoir ses prix tant que nécessaire et sans
							conditions préalables.
						</p>
						<p>
							Les abonnements sont souscrits pour une durée d’un an et ils doivent être reconduits par les vendeurs
							chaque 12 mois, moyennant le paiement du prix de l’Abonnement annuel. En cas de non renouvellement, la
							boutique du vendeur ne sera plus référencée.
						</p>
						<p>Les abonnements souscrits par les vendeurs ne sont pas remboursables.</p>
						<p>
							L’abonnement inclut le référencement des articles sur la marketplace Qaryb et sur Google. Il permet
							également de proposer un service de livraison. Il permet enfin de bénéficier du badge « Boutique Vérifiée
							».
						</p>
					</Stack>
					<Stack direction="column" component="section">
						<h3>4. Droits et responsabilités liées à l’ouverture de Boutique en ligne.</h3>
						<p>
							Les Vendeurs ne peuvent pas utiliser le service Qaryb à des fins illégales ou réglementaires, ou à des
							fins non autorisées. Ils ne sont pas non plus autorisés à utiliser le service d&apos;une manière qui viole
							un système ou une loi, en particulier les lois sur les droits d&apos;auteur et la propriété
							intellectuelle.
						</p>
						<p>
							Qaryb a le droit de fermer / suspendre / désactiver / supprimer tout compte qui enfreint l&apos;un des
							éléments ci-dessus.
						</p>
						<p>
							Qaryb ne garantit pas que la qualité des produits ou des services, achetés ou obtenus auprès de
							l&apos;Utilisateur via la Plateforme, répondra à vos attentes ou que toute erreur dans le Service sera
							corrigée.
						</p>
						<p>
							Les vendeurs sont les seuls responsables de la livraison des Produits/Services vendus, ils sont également
							responsables de la bonne description de leurs produits et services. Ils sont tenus à préciser la
							provenance géographique de leur produit. En cas de description mensongère, Qaryb ne peut en être tenue
							responsable.
						</p>
						<p>
							En aucun cas Qaryb ne pourra être tenu responsable de tout désaccord entre les Utilisateurs causant un
							dommage direct, indirect, accessoire, spécial, consécutif, punitif ou exceptionnel ou tout autre dommage
							que ce soit résultant de l&apos;un des Services proposés ou des relations commerciales entre les
							Utilisateurs.
						</p>
						<p>
							Qaryb n’intervient pas, pour le moment, dans le processus de l’encaissement des montants payés par les
							acheteurs, ainsi le paiement se fait directement entre l’Acheteur et le Vendeur à la livraison (pour les
							produits) ou à l’exécution de la prestation (pour les services). Qaryb ne touche pas de commissions sur
							les achats effectués à travers la plateforme. A tout moment, Qaryb peut décider d’appliquer des
							commissions dont elle seule pourra définir le taux.
						</p>
						<p>
							En publiant Votre Contenu par l’intermédiaire de nos Services, vous conférez à Qaryb une licence visant à
							l’utiliser. Nous ne revendiquons pas la propriété de Votre Contenu, mais nous avons l’autorisation de
							l’utiliser pour aider Qaryb à mieux fonctionner et à se développer.
						</p>
						<p>
							L&apos;utilisateur est responsable de la sécurité de son mot de passe personnel. Qaryb n&apos;est pas
							responsable de toute perte ou dommage résultant de l&apos;oubli et du défaut de maintenir la sécurité du
							compte et du mot de passe.
						</p>
					</Stack>
					<Stack direction="column" component="section">
						<h3>5. Données Collectées</h3>
						<p>
							Afin que Qaryb puisse veiller au bon fonctionnement de ses Services, elle est autorisée à collecter et à
							utiliser, à de bonnes fins, les données suivantes :
						</p>
						<ul>
							<li>
								Pour les vendeurs : nom, prénom, nom de la boutique, informations de la boutique, horaire d’ouverture,
								numéro de téléphone, adresse email, site web, liens des réseaux sociaux, adresse du magasin.
							</li>
							<li>Pour les acheteurs : nom, prénom, adresse, numéro de téléphone, adresse email.</li>
						</ul>
						<p>
							Pour le traitement des commandes, certaines informations concernant les Acheteurs peuvent être partagées
							avec les Vendeurs, tel que le numéro de téléphone pour assurer la bonne livraison de leurs commandes.
						</p>
						<p>
							Conformément à la loi 09-08, vous disposez d’un droit d’accès, de rectification et d’opposition au
							traitement de vos données personnelles. Ce traitement a été autorisé par la CNDP sous le numéro
							D-GC-158/2016.
						</p>
					</Stack>
				</Stack>
			</Stack>
		</main>
	);
};

export default Cgu;
