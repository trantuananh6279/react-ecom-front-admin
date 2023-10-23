import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';
import Stats from '../pages/Stats';
import ProductsPage from '../pages/Products';
import OrdersPage from '../pages/Orders';
import ErrorPage from '../pages/Error';
import SettingsPage from '../pages/Settings';
import ProtectedRoute from '../pages/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../components/Layout';
import AddProduct from '../pages/AddProduct';
import EditProduct from '../pages/EditProduct';
import CalendarPage from '../pages/Calendar';
import NotificationPage from '../pages/Notifications';

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Stats />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="products/new" element={<AddProduct />} />
                    <Route path="products/edit/:id" element={<EditProduct />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route
                        path="notifications"
                        element={<NotificationPage />}
                    />
                    <Route path="calendars" element={<CalendarPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                </Route>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
            <ToastContainer position="top-center" />
        </Router>
    );
}

export default App;
