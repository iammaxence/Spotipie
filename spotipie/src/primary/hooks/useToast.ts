import { useState } from 'react';
import { Toast, ToastType } from '../component/toast/Toast';

export const useToast = () => {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const [autoClose, setAutoClose] = useState(false);
	const [autoCloseDuration, setAutoCloseDuration] = useState(5);
	const [position, setPosition] = useState('bottom-right');
  

	const showToast = (message: string, type: ToastType) => {

		const toast = {
			id: Date.now(),
			message,
			type,
		};
  
		setToasts((prevToasts) => [...prevToasts, toast]);
		if (autoClose) {
			setTimeout(() => {
				removeToast(toast.id);
			}, autoCloseDuration * 1000);
		}
	};

	const removeToast = (id: number) => {
		setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
	};

	const removeAllToasts = () => {
		setToasts([]);
	};

	return { position, removeAllToasts, removeToast, showToast, toasts };
};