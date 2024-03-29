import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './primary/component/app/App';
import './styles.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContextProvider } from './primary/context/ToastContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ToastContextProvider>
				<App />
			</ToastContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
