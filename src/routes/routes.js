import MasterLayout from "../layouts/admin/MasterLayout";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Register from "../component/frontend/Register";
import Login from "../component/frontend/Login";
import Home from "../component/frontend/Home";
import PageNotFound from "../assets/frontend/404";
import swal from "sweetalert";
import AdminPrivateRoute from "../AdminPrivateRoute"
import AuthorPrivateRoute from "../AuthorPrivateRoute"
import ManagerPrivateRoute from "../ManagerPrivateRoute"  
import ViewBooks from "../component/frontend/homeFrontend/ViewBooks";
import HomeCategory from "../component/frontend/homeFrontend/HomeCategory";
import BookDetail from "../component/frontend/homeFrontend/BookDetail";
import ReadPage from "../component/frontend/homeFrontend/ReadPage"; 
import FaviourateBook from "../component/frontend/homeFrontend/FaviourateBook ";
import Profile from "../component/frontend/homeFrontend/Profile";

function routes() {
  return (
    <BrowserRouter>
          <Routes>
          <Route path='/register' element={localStorage.getItem('auth_token')?<Navigate to="/" replace={true}/>:<Register/>}/>
          <Route path='/login' element={localStorage.getItem('auth_token')?<Navigate to="/" replace={true}/>:<Login/>}/>
            <Route path="/" element={<Home/>} />
            <Route path="/category" element={<HomeCategory/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/faviourate" element={<FaviourateBook/>} />
            <Route path="/category/:slug" element={<ViewBooks/>} />
            <Route path="/category/:slug/:book" element={<BookDetail/>} />
            <Route path="/category/:slug/:book/read" element={<ReadPage/>} />
            <Route path="/admin/:type/:id" name="Admin" element={<AdminPrivateRoute />}/>
            <Route path="/admin/:type" name="Admin" element={<AdminPrivateRoute />}/>
            <Route path="/author/:type" name="Author" element={<AuthorPrivateRoute />}/>
            <Route path="/author/:type/:id" name="Author" element={<AuthorPrivateRoute />}/>
            <Route path="/manager/:type" name="Manager" element={<ManagerPrivateRoute />}/>
            <Route path="/manager/:type/:id" name="Manager" element={<ManagerPrivateRoute />}/>
            <Route path="/PageNotFound" element={<PageNotFound />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
    </BrowserRouter>
  )
}

export default routes

// <Route path="/admin/:param1" element={!localStorage.getItem('auth_token') ? <Navigate to="/" replace={true}/> : <MasterLayout/>} />