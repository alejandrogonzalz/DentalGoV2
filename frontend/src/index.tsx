import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from './router';
import { AuthProvider } from './app/auth/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<Router />
		</AuthProvider>
	</React.StrictMode>
);
