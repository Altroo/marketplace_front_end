export {}
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { CreateShopLeftSideBar } from '../../../components/createShopLeftSideBar/createShopLeftSideBar';
// import ShopStyles from '../../../styles/shop/shop.module.sass';
// import Styles from '../../../styles/shop/add/index.module.sass';
// import QuestionMark from '../../../public/assets/svgs/question-mark.svg';
// import { NextPage } from 'next';
// import { setShopNameAction } from '../../../store/actions/shop/shopActions';
// import TopBar from '../../../components/topBar/topBar';
// import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
//
// const ShopName: NextPage = () => {
// 	const dispatch = useAppDispatch();
// 	const shopName = useAppSelector((state) => state.shop.newShop.shop_name);
// 	let shopNameInitial = null
// 	if (shopName) {
// 		shopNameInitial = shopName;
// 	}
// 	const [storeName, setStoreName] = useState<string | null>(shopNameInitial);
//
// 	const shopNameHandler = () => {
// 		if (storeName) {
// 			dispatch(setShopNameAction(storeName));
// 		}
// 	};
//
// 	return (
// 		<>
// 			{desktopSize && <CreateShopLeftSideBar stepOne={true} contentArray={['Nom de boutique', 'Image', 'Couleur', 'Police']} />}
// 			<main className={ShopStyles.main}>
// 				<div>
// 					<TopBar backHref="/shop/add" />
// 					<div className={[Styles.displayNone, ShopStyles.steps].join(' ')}>
// 						<div className={ShopStyles.step} style={{ backgroundColor: '#0D070B' }}>
// 							&nbsp;
// 						</div>
// 						<div className={ShopStyles.step}>&nbsp;</div>
// 						<div className={ShopStyles.step}>&nbsp;</div>
// 						<div className={ShopStyles.step}>&nbsp;</div>
// 					</div>
// 					<div>
// 						{!desktopSize && (
// 							<>
// 								<div className={ShopStyles.spacerOneRem}></div>
// 								<div className={ShopStyles.spacerOneRem}></div>
// 							</>
// 						)}
// 						<div className={Styles.createStoreWrapper}>
// 							<h1 className={Styles.title}>Nommez votre boutique</h1>
// 							<div className={[ShopStyles.flex, ShopStyles.left, ShopStyles.helpWrapper].join(' ')}>
// 								<Image src={QuestionMark} width={18} height={18} alt="" />
// 								<p>Comment choisir son nom ? </p>
// 							</div>
// 						</div>
// 						<input
// 							value={storeName ? storeName : ''}
// 							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStoreName(e.target.value)}
// 							type="text"
// 							className={Styles.storeNameInput}
// 							placeholder="Ma boutique"
// 						/>
// 					</div>
// 				</div>
// 				<div className={ShopStyles.contunueButtonWrapper}>
// 					<Link href="/">
// 						<button
// 							className={ShopStyles.continueButton}
// 							onClick={shopNameHandler}
// 							style={
// 								storeName
// 									? {
// 											backgroundColor: '#0D070B',
// 											color: '#fff'
// 								}
// 									: { backgroundColor: '#F2F2F3', color: '#84848A' }
// 							}
// 							disabled={!storeName}>
// 							Continuer
// 						</button>
// 					</Link>
// 				</div>
// 			</main>
// 		</>
// 	);
// };
//
// export default ShopName;
