import React from 'react';
import Styles from './showCoordonees.module.sass';
import { Stack, Box, Divider } from '@mui/material';
import PhoneOutlinedSVG from '../../../../../../public/assets/svgs/globalIcons/phone-outlined.svg';
import WebsiteOutlinedSVG from '../../../../../../public/assets/svgs/globalIcons/website-outlined.svg';
import EmailOutlinedSVG from '../../../../../../public/assets/svgs/globalIcons/email-outlined.svg';
import FacebookCircularSVG from '../../../../../../public/assets/svgs/globalIcons/facebook-circular.svg';
import TwitterCircularSVG from '../../../../../../public/assets/svgs/globalIcons/twitter-circular.svg';
import InstagramCircularSVG from '../../../../../../public/assets/svgs/globalIcons/instagram-circular.svg';
import WhatsappCircularSVG from '../../../../../../public/assets/svgs/globalIcons/whatsapp-circular.svg';
import { useAppSelector } from '../../../../../../utils/hooks';
import { getShopObj } from '../../../../../../store/selectors';
import Link from 'next/link';
import Image from 'next/image';

const ShowCoordonees: React.FC = () => {
	const { phone, twitter_link, website_link, instagram_link, whatsapp, contact_email, facebook_link } =
		useAppSelector(getShopObj);
	return (
		<Stack direction="column" justifyContent="space-between" alignContent="space-between" spacing={2}>
			{phone ? (
				<Stack direction="row" spacing={2}>
					<Image
								src={PhoneOutlinedSVG}
								alt=""
								width="24"
								height="24"
								sizes="100vw"
							/>
					<Link href={`tel:${phone}`} target="_blank" rel="noreferrer" className={Styles.link}>
						{phone}
					</Link>
				</Stack>
			) : null}
			{contact_email ? (
				<>
					<Stack direction="row" spacing={2}>
						<Image
								src={EmailOutlinedSVG}
								alt=""
								width="24"
								height="24"
								sizes="100vw"
							/>
						<Box component="span">
							<Link href={`mailto:${contact_email}`} target="_blank" rel="noreferrer" className={Styles.link}>
								{contact_email}
							</Link>
						</Box>
					</Stack>
					<Divider orientation="horizontal" flexItem />
				</>
			) : null}
			{website_link ? (
				<>
					<Stack direction="row" spacing={2}>
						<Image
								src={WebsiteOutlinedSVG}
								alt=""
								width="24"
								height="24"
								sizes="100vw"
							/>
						<Box component="span">
							<Link href={website_link} target="_blank" rel="noreferrer" className={Styles.link}>
								{website_link}
							</Link>
						</Box>
					</Stack>
					<Divider orientation="horizontal" flexItem />
				</>
			) : null}

			<Stack direction="row" columnGap={2}>
				{facebook_link ? (
					<Link href={facebook_link} target="_blank" rel="noreferrer" className={Styles.link}>
						<Image
							src={FacebookCircularSVG}
							alt=""
							width="40"
							height="40"
							sizes="100vw"
						/>
					</Link>
				) : null}
				{twitter_link ? (
					<Link href={twitter_link} target="_blank" rel="noreferrer" className={Styles.link}>
						<Image
							src={TwitterCircularSVG}
							alt=""
							width="40"
							height="40"
							sizes="100vw"
						/>
					</Link>
				) : null}
				{instagram_link ? (
					<Link href={instagram_link} target="_blank" rel="noreferrer" className={Styles.link}>
						<Image
							src={InstagramCircularSVG}
							alt=""
							width="40"
							height="40"
							sizes="100vw"
						/>
					</Link>
				) : null}
				{whatsapp ? (
					<Link
						href={`https://web.whatsapp.com/send?phone=${whatsapp}`}
						target="_blank"
						rel="noreferrer" className={Styles.link}>
						<Image
							src={WhatsappCircularSVG}
							alt=""
							width="40"
							height="40"
							sizes="100vw"
						/>
					</Link>
				) : null}
			</Stack>
		</Stack>
	);
};

export default ShowCoordonees;
