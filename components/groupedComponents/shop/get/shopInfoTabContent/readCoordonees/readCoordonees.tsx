import React from 'react';
import Styles from './readCoordonees.module.sass';
import { Stack, Box, Divider } from '@mui/material';
import PhoneOutlinedSVG from '../../../../../../public/assets/svgs/globalIcons/phone-outlined.svg';
import WebsiteOutlinedSVG from '../../../../../../public/assets/svgs/globalIcons/website-outlined.svg';
import EmailOutlinedSVG from '../../../../../../public/assets/svgs/globalIcons/email-outlined.svg';
import FacebookCircularSVG from '../../../../../../public/assets/svgs/globalIcons/facebook-circular.svg';
import TwitterCircularSVG from '../../../../../../public/assets/svgs/globalIcons/twitter-circular.svg';
import InstagramCircularSVG from '../../../../../../public/assets/svgs/globalIcons/instagram-circular.svg';
import WhatsappCircularSVG from '../../../../../../public/assets/svgs/globalIcons/whatsapp-circular.svg';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
	phone: string | null;
	twitter_link: string | null;
	website_link: string | null;
	instagram_link: string | null;
	whatsapp: string | null;
	contact_email: string | null;
	facebook_link: string | null;
	children?: React.ReactNode;
};

const ReadCoordonees: React.FC<Props> = (props: Props) => {
	const { phone, twitter_link, website_link, instagram_link, whatsapp, contact_email, facebook_link } = props;

	return (
		<Stack direction="column" justifyContent="space-between" alignContent="space-between" spacing={2}>
			{phone ? (
				<Stack direction="row" spacing={2}>
					<Image src={PhoneOutlinedSVG} width={24} height={24} alt="" />
					<Link href={`tel:${phone}`} target="_blank" rel="noreferrer" className={Styles.link}>
						{phone}
					</Link>
				</Stack>
			) : null}
			{contact_email ? (
				<>
					<Stack direction="row" spacing={2}>
						<Image src={EmailOutlinedSVG} width={24} height={24} alt="" />
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
						<Image src={WebsiteOutlinedSVG} width={24} height={24} alt="" />
						<Box component="span">
							<Link href={website_link} target="_blank" rel="noreferrer" className={Styles.link}>
								{website_link}
							</Link>
						</Box>
					</Stack>
					<Divider orientation="horizontal" flexItem />
				</>
			) : null}

			<Stack direction="row" className={Styles.rootStackLinks}>
				{facebook_link ? (
					<Link href={facebook_link} target="_blank" rel="noreferrer" className={Styles.link}>
						<Image src={FacebookCircularSVG} width={40} height={40} alt="" />
					</Link>
				) : null}
				{twitter_link ? (
					<Link href={twitter_link} target="_blank" rel="noreferrer" className={Styles.link}>
						<Image src={TwitterCircularSVG} width={40} height={40} alt="" />
					</Link>
				) : null}
				{instagram_link ? (
					<Link href={instagram_link} target="_blank" rel="noreferrer" className={Styles.link}>
						<Image src={InstagramCircularSVG} width={40} height={40} alt="" />
					</Link>
				) : null}
				{whatsapp ? (
					<Link href={`https://web.whatsapp.com/send?phone=${whatsapp}`} target="_blank" rel="noreferrer" className={Styles.link}>
						<Image src={WhatsappCircularSVG} width={40} height={40} alt="" />
					</Link>
				) : null}
			</Stack>
		</Stack>
	);
};

export default ReadCoordonees;
