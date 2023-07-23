import React, { ReactElement, createContext, useMemo } from 'react';
import { useToast } from '../hooks/useToast';
import { Toast, ToastType } from '../component/toast/Toast';

export interface ToastContextType {
	toasts: Toast[];
  position: string,
  removeToast: (id: number) => void,
	showToast: (message: string, type: ToastType) => void
}

interface ToastContextProviderProps {
  children: ReactElement
}

export const ToastContext = createContext<ToastContextType>({ toasts: [], position: '', removeToast: () => '', showToast: () => '' });

export const ToastContextProvider = ({ children }: ToastContextProviderProps) => {
	const { toasts, showToast, position, removeToast } = useToast();
 
	const value = useMemo(() => ({ toasts, showToast, position, removeToast }), [toasts]);

	return (
		<ToastContext.Provider value={value}>
			{children}
		</ToastContext.Provider>
	);
};