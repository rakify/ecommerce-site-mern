import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";

function App() {
  const TOKEN = localStorage.length>=1?JSON.parse(
    JSON.parse(localStorage?.getItem("persist:root"))?.user
  )?.currentUser?.isAdmin:0;
  
  return (
    <Router>
      <Route exact path="/login">
        {TOKEN ? <Redirect to="/" /> : <Login />}
      </Route>
      {TOKEN ? <Topbar /> : <Redirect to="/login" />}
      <div className="container">
        {TOKEN && <Sidebar />}
        <Route exact path="/" component={Home} />
        <Route path="/users" component={UserList} />
        <Route path="/user/:userId" component={User} />
        <Route path="/newUser" component={NewUser} />
        <Route path="/products" component={ProductList} />
        <Route path="/product/:productId" component={Product} />
        <Route path="/newproduct" component={NewProduct} />
      </div>
    </Router>
  );
}

export default App;
