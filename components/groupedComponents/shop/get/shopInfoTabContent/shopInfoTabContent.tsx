import React from 'react';
import Styles from './shopInfoTabContent.module.sass';
import { Box, Stack } from '@mui/material';
import { ShopInfoDataType } from '../../../../../pages/shop/[shop_link]';
import ReadShopHoraire from './readShopHoraire/readShopHoraire';
import ReadCoordonees from './readCoordonees/readCoordonees';
import ReadAdresse from './readAdresse/readAdresse';

type Props = {
	shopInfoData: ShopInfoDataType;
	children?: React.ReactNode;
};

const ShopInfoTabContent: React.FC<Props> = (props: Props) => {
	const {
		shop_name,
		bio,
		address_name,
		zone_by,
		km_radius,
		latitude,
		longitude,
		morning_hour_from,
		morning_hour_to,
		phone,
		twitter_link,
		instagram_link,
		facebook_link,
		afternoon_hour_from,
		afternoon_hour_to,
		contact_email,
		website_link,
		whatsapp,
		opening_days,
	} = props.shopInfoData;
	return (
		<>
			<Stack
				direction="row"
				spacing={5}
				justifyContent="space-between"
				alignItems="flex-start"
				className={Styles.BothSidesWrapper}
			>
				<Stack className={Styles.leftSideWrapper} direction="column" spacing={2} justifyContent="space-between">
					<Stack direction="row" spacing={1} justifyContent="space-between" alignItems="baseline">
						<Box component="span" className={Styles.stackTitle}>
							Horaire
						</Box>
					</Stack>
					{opening_days.length > 0 ? (
						<ReadShopHoraire
							afternoon_hour_from={afternoon_hour_from}
							afternoon_hour_to={afternoon_hour_to}
							morning_hour_from={morning_hour_from}
							morning_hour_to={morning_hour_to}
							opening_days={opening_days}
						/>
					) : (
						<span className={Styles.infoNotFound}>{shop_name} n&apos;a pas encore renseigné ses horaires</span>
					)}
					<Stack direction="row" spacing={1} justifyContent="space-between" alignItems="baseline">
						<Box component="span" className={Styles.stackTitle}>
							Coordonées
						</Box>
					</Stack>
					{phone || contact_email || website_link || facebook_link || instagram_link || twitter_link || whatsapp ? (
						<ReadCoordonees
							instagram_link={instagram_link}
							twitter_link={twitter_link}
							whatsapp={whatsapp}
							website_link={website_link}
							facebook_link={facebook_link}
							contact_email={contact_email}
							phone={phone}
						/>
					) : (
						<span className={Styles.infoNotFound}>{shop_name} n&apos;a pas encore renseigné ses coordonnées</span>
					)}
					{address_name && longitude && latitude && km_radius && (
						<Stack direction="row" spacing={1} justifyContent="space-between" alignItems="baseline">
							<ReadAdresse
								zone_by={zone_by}
								latitude={latitude}
								longitude={longitude}
								km_radius={km_radius}
								address_name={address_name}
							/>
						</Stack>
					)}
				</Stack>
				<Stack className={Styles.rightSideWrapper} direction="column" spacing={2} justifyContent="space-between">
					<Stack direction="row" spacing={1} justifyContent="space-between" alignItems="baseline">
						<Box component="span" className={Styles.stackTitle}>
							Bio
						</Box>
					</Stack>
					{bio.length > 0 ? (
						<Stack direction="column" spacing={2} sx={{ wordWrap: 'break-word' }}>
							<span className={Styles.spanParagraphe}>{bio}</span>
						</Stack>
					) : (
						<span className={Styles.infoNotFound}>{shop_name} n&apos;a pas encore renseigné sa bio</span>
					)}
				</Stack>
			</Stack>
		</>
	);
};

export default ShopInfoTabContent;
