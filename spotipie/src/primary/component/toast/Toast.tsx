import React from 'react';
import './Toast.scss';
import ErrorLogo from '../../../assets/error-icon.svg';

export enum ToastType {
  error='ERROR'
}

export interface Toast {
  id: number,
  message: string,
  type: ToastType,
}

interface Props {
  type: ToastType,
  message: string,
  onClose: () => void
}
export function Toast({ message, onClose }: Props) {

	return (
		<div className="toast" role="alert">
			<div className="toast-message">
				<img className='toast--failure' src={ErrorLogo} width={25} height={25} alt="error-logo" />
				<p>{ message }</p>
			</div>
			<button className="toast-close-btn" onClick={onClose}>
				<span className="icon">x</span>
			</button>
		</div>
	);
}