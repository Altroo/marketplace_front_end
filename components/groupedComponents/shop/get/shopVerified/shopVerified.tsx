import React from 'react';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import VerifiedSVG from '../../../../../public/assets/svgs/globalIcons/verified.svg';
import { Skeleton, ThemeProvider, Tooltip } from '@mui/material';
import { getDefaultTheme } from '../../../../../utils/themes';
import Styles from './shopVerified.module.sass';
import { default as ImageFuture } from 'next/future/image';

type Props = {
	avatar: string;
	shop_name: string;
	children?: React.ReactNode;
};

const ShopVerified: React.FC<Props> = (props: Props) => {
	const defaultTheme = getDefaultTheme();
	return (
		<ThemeProvider theme={defaultTheme}>
			<Tooltip disableFocusListener title="Boutique verifié.">
				<Badge
					overlap="circular"
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					badgeContent={
						<Avatar
							alt="Verified badge"
							src={VerifiedSVG.src}
							sx={{ width: 30, height: 30 }}
							className={Styles.badgeMobile}
						/>
					}
				>
					{!props.avatar ? (
						<Skeleton variant="circular" width={120} height={120} />
					) : (
						<Avatar
							alt={props.shop_name}
							src={props.avatar}
							sx={{ width: 120, height: 120 }}
							className={Styles.avatar}
						/>
					)}
				</Badge>
			</Tooltip>
		</ThemeProvider>
	);
};

export default ShopVerified;
