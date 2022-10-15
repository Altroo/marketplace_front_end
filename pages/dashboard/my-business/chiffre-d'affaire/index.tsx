import React from "react";
import { GetServerSidePropsContext, NextPage } from "next";

const Index: NextPage = () => {

	return (
		<>
			<h1>Chiffre d&apos;affaire page</h1>
		</>
	);
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
// 	/*
// 	return {
// 		props: {},
// 	};
// 	 */
// 	/*
// 	return {
// 			redirect: {
// 				permanent: false,
// 				destination: NOT_FOUND_404,
// 			},
// 		};
// 	 */
// }

export default Index;