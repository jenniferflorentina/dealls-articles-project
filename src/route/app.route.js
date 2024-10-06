import { createBrowserRouter } from 'react-router-dom';
import Login from 'pages/auth/login';
import ProtectedRoute from './protected.route';
import ArticlesPage from 'pages/articles';
import ArticleDetailsPage from 'pages/article-details'; // Fixed typo

const AppRoute = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute />,
        children: [
            {
                index: true,
                element: <ArticlesPage />,
            },
            {
                path: '/articles/:id',
                element: <ArticleDetailsPage />,
            }
        ]
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '*', // Catch-all for undefined routes
        element: <div>404 Not Found</div>, // You can create a dedicated 404 component
    }
]);

export default AppRoute;
