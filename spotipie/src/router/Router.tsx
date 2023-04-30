import React, { Fragment, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Upload } from '../primary/pages/upload/Upload';
import { ProtectedRoute } from './ProtectedRoute';
import { Home } from '../primary/pages/home/Home';
import FileStorage from '../config/FileStorage';
import { NavBar } from '../primary/pages/navbar/NavBar';
import { AxiosHttp } from '../config/AxiosHttp';
import axios from 'axios';
import { SpotifyApi } from '../secondary/SpotifyApi';

export function Router() {
	const axiosHttp = new AxiosHttp(axios.create({ baseURL: 'http://localhost:8080' }));
	const [isFileUpload, setIsFileUpload] = useState(false);
	const fileStorage = new FileStorage(window.localStorage);

	useEffect(() => {
		initIsFileUploadState();
	}, []);

	useEffect(() => {
		fileUploadStateChange();
	}, [isFileUpload]);

	function initIsFileUploadState(): void {
		if(fileStorage.isFileUpload()) {
			setIsFileUpload(true);
		}
	}

	function fileUploadStateChange(): void {
		if(isFileUpload) {
			fileStorage.setItem();
		} else {
			fileStorage.deleteAll();
		}
	}

	function hasFileBeenUpload(): boolean {
		return fileStorage.isFileUpload() || isFileUpload;
	}

	return(
		<Routes>
			<Route path="/" element={<Upload axiosHttp={axiosHttp} setIsFileUpload={setIsFileUpload} />} />
			<Route path="/upload" element={<Upload axiosHttp={axiosHttp} setIsFileUpload={setIsFileUpload} />} />
			<Route
				path="/home"
				element={
					<Fragment>
						<NavBar />
						<ProtectedRoute isRouteAccessible={hasFileBeenUpload()}>
							<Home axiosHttp={axiosHttp}/>
						</ProtectedRoute>
					</Fragment>
				}
			/>
		</Routes>);
}