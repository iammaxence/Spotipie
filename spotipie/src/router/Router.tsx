import { Route, Routes } from 'react-router-dom';
import { Upload } from "../pages/upload/Upload";
import { ProtectedRoute } from './ProtectedRoute';
import { Home } from '../pages/home/Home';
import { Fragment, useEffect, useState } from 'react';
import FileStorage from '../config/FileStorage';
import { NavBar } from '../pages/navbar/NavBar';

export function Router() {
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
    <Route path="/" element={<Upload setIsFileUpload={setIsFileUpload} />} />
    <Route path="/upload" element={<Upload setIsFileUpload={setIsFileUpload} />} />
    <Route
      path="/home"
      element={
        <Fragment>
          <NavBar />
          <ProtectedRoute isRouteAccessible={isFileUpload}>
          <Home />
          </ProtectedRoute>
        </Fragment>
      }
    />
  </Routes>)
}