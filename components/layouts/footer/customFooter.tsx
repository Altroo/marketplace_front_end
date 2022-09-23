import { List, ListItem, ListItemText, Stack } from "@mui/material";
import React from "react";
import Styles from "./customFooter.module.sass";
import Link from "next/link";
import Divider from "@mui/material/Divider";

type Props = {
	children?: React.ReactNode;
}

const CustomFooter: React.FC<Props> = (props: Props) => {

	return (
		<footer className={Styles.footer}>
			<Stack direction="column" spacing={5}>
				<Stack direction="row" justifyContent="space-between" alignItems="flex-start">
					<Stack direction="column" spacing={1}>
						<span className={Styles.header}>Qaryb</span>
						<Link passHref href="/">
							<a className={Styles.anchor}>Notre histoire</a>
						</Link>
						<Link passHref href="/">
							<a className={Styles.anchor}>Comment ça marche</a>
						</Link>
						<Link passHref href="/">
							<a className={Styles.anchor}>Nos collections</a>
						</Link>
						<Link passHref href="/">
							<a className={Styles.anchor}>Nouveautés</a>
						</Link>
					</Stack>
					<Stack direction="column" spacing={1}>
						<span className={Styles.header}>Ressources</span>
						<Link passHref href="/">
							<a className={Styles.anchor}>Guides</a>
						</Link>
						<Link passHref href="/">
							<a className={Styles.anchor}>Lexique</a>
						</Link>
						<Link passHref href="/">
							<a className={Styles.anchor}>Inspirations</a>
						</Link>
						<Link passHref href="/">
							<a className={Styles.anchor}>Communauté</a>
						</Link>
					</Stack>
					<Stack direction="column" spacing={1}>
						<span className={Styles.header}>Causes</span>
						<Link passHref href="/">
							<a className={Styles.anchor}>Creators</a>
						</Link>
						<Link passHref href="/">
							<a className={Styles.anchor}>Entrepreunariat</a>
						</Link>
						<Link passHref href="/">
							<a className={Styles.anchor}>Inclusive trade</a>
						</Link>
					</Stack>
					<Stack direction="column" spacing={1}>
						<span className={Styles.header}>Changer le monde</span>
						<Link passHref href="/">
							<a className={Styles.anchor}>Partenariat</a>
						</Link>
						<Link passHref href="/">
							<a className={Styles.anchor}>Emploi (culture)</a>
						</Link>
						<Link passHref href="/">
							<a className={Styles.anchor}>Cartes cadeaux</a>
						</Link>
						<Link passHref href="/">
							<a className={Styles.anchor}>Livraison (soon)</a>
						</Link>
					</Stack>
				</Stack>
				<Stack direction="column" spacing={2}>
					<Divider orientation="horizontal" flexItem className={Styles.divider} />
					<Stack direction="row" justifyContent="space-between">
						<span>© 2022 Qaryb</span>
						<Stack direction="row" spacing={1} divider={<span className={Styles.miniDivider}>—</span>}>
							<Link passHref href="/">
								<a className={Styles.bottomAnchor}>Confidentialité</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.bottomAnchor}>Conditions générales</a>
							</Link>
							<Link passHref href="/">
								<a className={Styles.bottomAnchor}>Infos sur l&apos;entreprise</a>
							</Link>
						</Stack>
					</Stack>
				</Stack>
			</Stack>

		</footer>
	);
};

export default CustomFooter;
