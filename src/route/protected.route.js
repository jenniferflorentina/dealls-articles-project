import { Navigate, Outlet } from "react-router-dom";
import storageHelper from "../app/helpers/storage.helper";
import { Container } from "rsuite";
import AppNavbar from "../components/common/AppNavbar";

const ProtectedRoute = () => {
    const user = storageHelper.loadItem('user')

    if(!user) {
        return <Navigate to='/login' />
    }

    return (
        <>
            <Container>
                <AppNavbar />
                <Outlet />
            </Container>
        </>
    )
};

export default ProtectedRoute;