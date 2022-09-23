import React from 'react';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import VerifiedSVG from '../../../../../public/assets/svgs/globalIcons/verified.svg';
import { ThemeProvider, Tooltip } from '@mui/material';
import { getDefaultTheme } from '../../../../../utils/themes';

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
					badgeContent={<Avatar alt="Verified badge" src={VerifiedSVG.src} sx={{ width: 30, height: 30 }} />}
				>
					<Avatar alt={props.shop_name} src={props.avatar} sx={{ width: 120, height: 120 }} />
				</Badge>
			</Tooltip>
		</ThemeProvider>
	);
};

export default ShopVerified;
