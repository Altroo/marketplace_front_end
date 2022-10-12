import React from "react";
import { NextPage } from "next";
import Styles from '../../../../styles/dashboard/dashboard.module.sass';
import UserMainNavigationBar from "../../../../components/layouts/userMainNavigationBar/userMainNavigationBar";
import DesktopDashboardLeftSideNav from "../../../../components/layouts/desktopDashboardLeftSideNav/desktopDashboardLeftSideNav";
import { Stack } from "@mui/material";

const Index: NextPage = () => {

	return (
		<Stack direction="column">
			<UserMainNavigationBar />
			<main className={Styles.main}>
				<DesktopDashboardLeftSideNav/>
				<Stack
					direction="column"
					justifyContent="space-between"
					alignItems="center"
					sx={{ height: '100vh', width: '100%' }}
				>
					<h2 className={Styles.pageTitle}>Modifier le mot de passe</h2>
				</Stack>
			</main>
		</Stack>
	);
};

export default Index;