import React, { useEffect, useRef } from 'react';
import { Toast } from './Toast';
import './ToastList.scss';

interface Props {
  data: Toast[],
  position: any,
  removeToast: (id: number) => void
}

export function ToastList({ data, position, removeToast }: Props) {
	const listRef = useRef(null);

	const sortedData = position.includes('bottom')
		? [...data].reverse()
		: [...data];

	const handleScrolling = (el: any) => {
		const isTopPosition = ['top-left', 'top-right'].includes(position);
		if (isTopPosition) {
			el?.scrollTo(0, el.scrollHeight);
		} else {
			el?.scrollTo(0, 0);
		}
	};

	useEffect(() => {
		handleScrolling(listRef.current);
	}, [position, data]);
  
	return(
		<div
			className={`toast-list toast-list--${position}`}
			aria-live="assertive"
		>
			{sortedData.map((toast) => (
				<Toast
					key={toast.id}
					message={toast.message}
					type={toast.type}
					onClose={() => removeToast(toast.id)}
				/>
			))}
		</div>
	);
}