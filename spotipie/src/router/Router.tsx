import { Route, Routes } from 'react-router-dom';
import { Upload } from "../pages/upload/Upload";
import { ProtectedRoute } from './ProtectedRoute';
import { Home } from '../pages/home/Home';
import { Fragment, useEffect, useState } from 'react';
import FileStorage from '../config/FileStorage';
import { NavBar } from '../pages/navbar/NavBar';
import { AxiosHttp } from '../config/AxiosHttp';
import axios from 'axios';

export function Router() {
  const axiosHttp = new AxiosHttp(axios.create({ baseURL: 'http://localhost:8080' }))
  const [isFileUpload, setIsFileUpload] = useState(false);
  const fileStorage = new FileStorage(window.localStorage);

  useEffect(() => {
    if(!isFileUpload) {
      fileStorage.deleteAll();
    } else {
      fileStorage.setItem();
    }
  }, [isFileUpload])

  return(
  <Routes>
    <Route path="/" element={<Upload axiosHttp={axiosHttp} setIsFileUpload={setIsFileUpload} />} />
    <Route path="/upload" element={<Upload axiosHttp={axiosHttp} setIsFileUpload={setIsFileUpload} />} />
    <Route
      path="/home"
      element={
        <Fragment>
          <NavBar />
          <ProtectedRoute isRouteAccessible={isFileUpload}>
          <Home axiosHttp={axiosHttp}/>
          </ProtectedRoute>
        </Fragment>
      }
    />
  </Routes>)
}