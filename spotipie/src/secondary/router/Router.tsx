import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { AuthContextProvider } from '../../primary/context/AuthContext';
import { AxiosHttp } from '../http/AxiosHttp';
import { Login } from '../../primary/component/login/Login';
import { NavBar } from '../../primary/component/navbar/NavBar';
import { Home } from '../../primary/component/home/Home';
import { AuthorizationAdapter } from '../authorization/AuthorizationAdapter';
import { UserAdapter } from '../user/UserAdapter';
import { Footer } from '../../primary/component/footer/Footer';
import { TermsAndConditions } from '../../primary/component/footer/termsAndConditions/TermsAndConditions';
import { PrivacyPolicy } from '../../primary/component/footer/privacyPolicy/PrivacyPolicy';

export function Router() {
	const axiosHttp = new AxiosHttp(axios.create({ baseURL: 'http://localhost:8080' }));
	const authorizationAdapter = new AuthorizationAdapter(axiosHttp);
	const userAdapter = new UserAdapter(axiosHttp);

	return(
		<AuthContextProvider>
			<Routes>
				<Route path="/" element={<Login authorizationAdapter={authorizationAdapter} userAdapter={userAdapter} />} />
				<Route path="/login" element={<Login authorizationAdapter={authorizationAdapter} userAdapter={userAdapter} />} />
				<Route
					path="/termsAndConditions"
					element={
						<Fragment>
							<NavBar />
							<TermsAndConditions />
							<Footer />
						</Fragment>
					} 
				/>
				<Route
					path="/privacyPolicy"
					element={
						<Fragment>
							<NavBar />
							<PrivacyPolicy />
							<Footer />
						</Fragment>
					} 
				/>
				<Route
					path="/home"
					element={
						<Fragment>
							<NavBar />
							<Home userAdapter={userAdapter}/>
							<Footer />
						</Fragment>
					}
				/>
			</Routes>
		</AuthContextProvider>);
}