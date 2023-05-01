import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../primary/pages/Login/Login';
import { ProtectedRoute } from './ProtectedRoute';
import { Home } from '../primary/pages/home/Home';
import { NavBar } from '../primary/pages/navbar/NavBar';
import { AxiosHttp } from '../config/AxiosHttp';
import axios from 'axios';

export function Router() {
	const axiosHttp = new AxiosHttp(axios.create({ baseURL: 'http://localhost:8080' }));

	return(
		<Routes>
			<Route path="/" element={<Login axiosHttp={axiosHttp} />} />
			<Route path="/login" element={<Login axiosHttp={axiosHttp} />} />
			<Route
				path="/home"
				element={
					<Fragment>
						<NavBar />
						<ProtectedRoute isRouteAccessible={true}>
							<Home axiosHttp={axiosHttp}/>
						</ProtectedRoute>
					</Fragment>
				}
			/>
		</Routes>);
}