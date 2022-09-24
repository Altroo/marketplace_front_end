{}
// export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
// 	store.dispatch(tickClock(false))
//
// 	if (!store.getState().placeholderData) {
// 		store.dispatch(loadData())
// 		store.dispatch(END)
// 	}
//
// 	await store.sagaTask.toPromise()
// })
// export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
// 	if (context.params?.offer_pk){
// 		if (!store.getState().selectedOffer){
// 			store.dispatch(placesGetCitiesAction('MA'));
// 			store.dispatch(offerGetRootAction(parseInt(context.params?.offer_pk as string)));
// 			store.dispatch(END);
// 		}
// 	}
// 	await (store as SagaStore).sagaTask?.toPromise();
// 	return {
// 		props: {
// 			selectedOffer: store.getState().offer.selectedOffer,
// 		},
// 	};
// });
// export const getStaticPaths = () => {
// 	return {
//         // false : return 404 if id requested isn't found in paths list of params
//         // true : generates a missing page by most visited ones.
//         // 'blocking': will not return 404 if next can't find the page immediately
//         fallback: false,
//         paths: [
//             {
//                 params: {
//                     offer_pk: "44",
//                 }
//             },
//         ]
//     };
// }
// export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
// 	if (context.params?.offer_pk) {
// 		// if (!store.getState().selectedOffer) {
// 		store.dispatch(offerGetRootAction(parseInt(context.params?.offer_pk as string)));
// 		store.dispatch(END);
// 		// }
// 	}
// 	await store.sagaTask?.toPromise();
//
// 	return {
// 		props: {
// 			selectedOffer: store.getState().offer.selectedOffer,
// 		},
// 	};
// });