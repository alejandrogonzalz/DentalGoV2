import {
	createBrowserRouter,
	Route,
	createRoutesFromElements,
	RouterProvider,
} from 'react-router-dom';

import { Login } from './Login/Login';

export function Router() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route path='/' element={<Login />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
}
