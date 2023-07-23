import React, { useContext } from 'react';
import './App.css';
import { Router } from '../../../secondary/router/Router';
import { ToastList } from '../toast/ToastList';
import { ToastContext } from '../../context/ToastContext';

function App() {
	const { toasts, position, removeToast } = useContext(ToastContext);

	return (
		<div>
			<Router />
			<ToastList
				data={toasts}
				position={position}
				removeToast={removeToast}
			/>
		</div>
	);
}

export default App;
