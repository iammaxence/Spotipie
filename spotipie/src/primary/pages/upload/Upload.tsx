import React from 'react';
import { HttpPort } from '../../../config/HttpPort';
import './Upload.scss';
import { useUploadHelper } from './UploadHelper';

interface UploadProps {
  axiosHttp: HttpPort
  setIsFileUpload: (isFileUpload: boolean) => void
}

export function Upload({ axiosHttp, setIsFileUpload }: UploadProps) {

	const { uploadFileToServer, setInput } = useUploadHelper({ axiosHttp, setIsFileUpload });
  
	return (
		<div className='upload'>
			<h1 className="title">Welcome to SpotiPie</h1>
			<form className="form">
				<input
					id="myzipId"
					type="file" 
					accept=".zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
					onChange={(v) => setInput(v)}
				/>
				<button type="button" onClick={uploadFileToServer}>Submit</button>
			</form>
		</div>
	);
}