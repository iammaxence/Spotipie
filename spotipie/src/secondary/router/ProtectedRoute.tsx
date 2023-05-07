import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface GuardedRouteProps {
	isRouteAccessible?: boolean;
  children: ReactElement
}


export const ProtectedRoute = ({ isRouteAccessible, children }: GuardedRouteProps) => {
	console.log('isRouteAccessible :' + isRouteAccessible);
	if (!isRouteAccessible) {
		return <Navigate to="/login" replace />;
	}

	return children;
};