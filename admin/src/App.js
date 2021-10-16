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
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Route exact path="/login">
        {user ? <Redirect to="/" /> : <Login />}
      </Route>
      {user ? <Topbar /> : <Redirect to="/login" />}
      <div className="container">
        {user && <Sidebar />}
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
