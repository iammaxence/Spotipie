import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface GuardedRouteProps {
	isRouteAccessible?: boolean;
  children: ReactElement
}


export const ProtectedRoute = ({ isRouteAccessible, children }: GuardedRouteProps) => {
  if (!isRouteAccessible) {
    return <Navigate to="/upload" replace />;
  }

  return children;
};