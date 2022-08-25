import React from 'react';
import Styles from './showCoordonees.module.sass';
import { Stack, Box, Divider } from '@mui/material';
import Image from 'next/image';
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

type Props = {
	children?: React.ReactNode;
};

const ShowCoordonees: React.FC<Props> = (props: Props) => {
	const { phone, twitter_link, website_link, instagram_link, whatsapp, contact_email, facebook_link } =
		useAppSelector(getShopObj);
	return (
		<Stack direction="column" justifyContent="space-between" alignContent="space-between" spacing={2}>
			{phone ? (
				<Stack direction="row" spacing={2}>
					<Image src={PhoneOutlinedSVG} width={24} height={24} alt="" />
					<Link href={`tel:${phone}`} passHref target="_blank" rel="noreferrer">
						<a href={`tel:${phone}`} target="_blank" rel="noreferrer" className={Styles.link}>
							{phone}
						</a>
					</Link>
				</Stack>
			) : null}
			{contact_email ? (
				<>
					<Stack direction="row" spacing={2}>
						<Image src={EmailOutlinedSVG} width={24} height={24} alt="" />
						<Box component="span">
							<Link href={`mailto:${contact_email}`} passHref target="_blank" rel="noreferrer">
								<a href={`mailto:${contact_email}`} target="_blank" rel="noreferrer" className={Styles.link}>
									{contact_email}
								</a>
							</Link>
						</Box>
					</Stack>
					<Divider orientation="horizontal" flexItem />
				</>
			) : null}
			{website_link ? (
				<>
					<Stack direction="row" spacing={2}>
						<Image src={WebsiteOutlinedSVG} width={24} height={24} alt="" />
						<Box component="span">
							<Link href={website_link} passHref target="_blank" rel="noreferrer">
								<a href={website_link} target="_blank" rel="noreferrer" className={Styles.link}>
									{website_link}
								</a>
							</Link>
						</Box>
					</Stack>
					<Divider orientation="horizontal" flexItem />
				</>
			) : null}

			<Stack direction="row" columnGap={2}>
				{facebook_link ? (
					<Link href={facebook_link} passHref target="_blank" rel="noreferrer">
						<a href={facebook_link} target="_blank" rel="noreferrer" className={Styles.link}>
							<Image src={FacebookCircularSVG} width={40} height={40} alt="" />
						</a>
					</Link>
				) : null}
				{twitter_link ? (
					<Link href={twitter_link} passHref target="_blank" rel="noreferrer">
						<a href={twitter_link} target="_blank" rel="noreferrer" className={Styles.link}>
							<Image src={TwitterCircularSVG} width={40} height={40} alt="" />
						</a>
					</Link>
				) : null}
				{instagram_link ? (
					<Link href={instagram_link} passHref target="_blank" rel="noreferrer">
						<a href={instagram_link} target="_blank" rel="noreferrer" className={Styles.link}>
							<Image src={InstagramCircularSVG} width={40} height={40} alt="" />
						</a>
					</Link>
				) : null}
				{whatsapp ? (
					<Link
						href={`https://web.whatsapp.com/send?phone=${whatsapp}`}
						passHref
						target="_blank"
						rel="noreferrer">
						<a href={`https://web.whatsapp.com/send?phone=${whatsapp}`} target="_blank" rel="noreferrer" className={Styles.link}>
							<Image src={WhatsappCircularSVG} width={40} height={40} alt="" />
						</a>
					</Link>
				) : null}
			</Stack>
		</Stack>
	);
};

export default ShowCoordonees;
