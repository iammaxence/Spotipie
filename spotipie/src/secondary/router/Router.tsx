import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { AuthContextProvider } from '../../primary/context/AuthContext';
import { AxiosHttp } from '../../config/axios/AxiosHttp';
import { Login } from '../../primary/pages/login/Login';
import { NavBar } from '../../primary/pages/navbar/NavBar';
import { Home } from '../../primary/pages/home/Home';
import { AuthorizationAdapter } from '../authorization/AuthorizationAdapter';

export function Router() {
	const axiosHttp = new AxiosHttp(axios.create({ baseURL: 'http://localhost:8080' }));
	const authorizationAdapter = new AuthorizationAdapter(axiosHttp);

	return(
		<AuthContextProvider>
			<Routes>
				<Route path="/" element={<Login authorizationAdapter={authorizationAdapter} />} />
				<Route path="/login" element={<Login authorizationAdapter={authorizationAdapter} />} />
				<Route
					path="/home"
					element={
						<Fragment>
							<NavBar />
							<Home axiosHttp={axiosHttp}/>
						</Fragment>
					}
				/>
			</Routes>
		</AuthContextProvider>);
}