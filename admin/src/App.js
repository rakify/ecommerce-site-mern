import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const admin = useSelector((state) => state.user.currentUser.isAdmin);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/newUser">
                <NewUser />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;


// {"user":"{\"currentUser\":{\"img\":\"https://img.icons8.com/pastel-glyph/64/000000/person-male--v3.png\",\"_id\":\"61460be8f89ac4ff55b1cf7a\",\"username\":\"Admin\",\"email\":\"admin@gmail.com\",\"isAdmin\":true,\"profilePicture\":\"https://img.icons8.com/pastel-glyph/64/000000/person-male--v3.png\",\"coverPicture\":\"http://apy-ingenierie.fr/wp-content/plugins/uix-page-builder/uixpb_templates/images/UixPageBuilderTmpl/default-cover-6.jpg\",\"followers\":[],\"followings\":[],\"relationship\":\"\",\"createdAt\":\"2021-09-18T15:55:20.313Z\",\"updatedAt\":\"2021-09-18T15:55:20.313Z\",\"__v\":0,\"accessToken\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDYwYmU4Zjg5YWM0ZmY1NWIxY2Y3YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMzgxNTIyOCwiZXhwIjoxNjM0MDc0NDI4fQ.RFPwaOrTh3aH6d5_uLutaRaaf3KVr0o170fajv7jbH8\"},\"isFetching\":false,\"error\":false}","product":"{\"products\":[{\"tags\":[],\"inStock\":true,\"_id\":\"6146149916b911f477fc387d\",\"title\":\"Red Tshirt\",\"desc\":\"warm tshirt\",\"img\":\"https://i.postimg.cc/tTYdPT9C/blank-1886008-1920.png\",\"size\":[\"l\"],\"color\":[\"red\"],\"price\":100,\"createdAt\":\"2021-09-18T16:32:25.440Z\",\"updatedAt\":\"2021-09-18T16:32:25.440Z\",\"__v\":0,\"cat\":[\"tshirt\",\"man\"]},{\"tags\":[],\"inStock\":true,\"_id\":\"614618e3986cd60eca71dd09\",\"title\":\"Blue Tshirt\",\"desc\":\"warm tshirt\",\"img\":\"https://cdn.shopify.com/s/files/1/0101/4832/products/Angela_Natural_Tee.png?v=1606780388\",\"img_id\":\"image.jpg\",\"size\":[\"l\",\"m\"],\"color\":[\"blue\",\"green\"],\"price\":99,\"createdAt\":\"2021-09-18T16:50:43.259Z\",\"updatedAt\":\"2021-09-18T16:50:43.259Z\",\"__v\":0,\"cat\":[\"tshirt\",\"man\"]},{\"tags\":[],\"inStock\":true,\"_id\":\"614618e9986cd60eca71dd0b\",\"title\":\"Black Tshirt\",\"desc\":\"warm tshirt\",\"img\":\"https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png\",\"img_id\":\"image.jpg\",\"size\":[\"m\"],\"color\":[\"black\"],\"price\":80,\"createdAt\":\"2021-09-18T16:50:49.531Z\",\"updatedAt\":\"2021-09-18T16:50:49.531Z\",\"__v\":0,\"cat\":[\"tshirt\",\"man\"]},{\"tags\":[],\"inStock\":true,\"_id\":\"614618ee986cd60eca71dd0d\",\"title\":\"Green Tshirt\",\"desc\":\"warm tshirt\",\"img\":\"https://www.burdastyle.com/pub/media/catalog/product/cache/7bd3727382ce0a860b68816435d76e26/107/BUS-PAT-BURTE-1320516/1170x1470_BS_2016_05_132_front.png\",\"img_id\":\"image.jpg\",\"size\":[\"m\"],\"color\":[\"green\"],\"price\":120,\"createdAt\":\"2021-09-18T16:50:54.658Z\",\"updatedAt\":\"2021-09-18T16:50:54.658Z\",\"__v\":0,\"cat\":[\"tshirt\",\"man\"]},{\"tags\":[],\"inStock\":true,\"_id\":\"614618f4986cd60eca71dd0f\",\"title\":\"White Tshirt\",\"desc\":\"warm tshirt\",\"img\":\"https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png\",\"img_id\":\"image.jpg\",\"size\":[\"m\"],\"color\":[\"white\"],\"price\":130,\"createdAt\":\"2021-09-18T16:51:00.576Z\",\"updatedAt\":\"2021-09-18T16:51:00.576Z\",\"__v\":0,\"cat\":[\"tshirt\",\"man\"]},{\"tags\":[],\"inStock\":true,\"_id\":\"6146196c986cd60eca71dd13\",\"title\":\"Purple Tshirt\",\"desc\":\"warm tshirt\",\"img\":\"https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png\",\"img_id\":\"image.jpg\",\"size\":[\"m\"],\"color\":[\"red\"],\"price\":66,\"createdAt\":\"2021-09-18T16:53:00.622Z\",\"updatedAt\":\"2021-09-18T16:53:00.622Z\",\"__v\":0,\"cat\":[\"women\",\"tshirt\",\"man\"]},{\"tags\":[],\"_id\":\"6161d0fdd621aba47c997180\",\"title\":\"stray dogs\",\"desc\":\"lkjfljkljgf\",\"img\":\"https://firebasestorage.googleapis.com/v0/b/shop-60c8c.appspot.com/o/1633800439502main-qimg-f3224379d47adb626ab16cdef9876fb1.jpg?alt=media&token=12895d6f-420e-411c-b837-f6cd6508a845\",\"size\":[],\"color\":[],\"price\":5,\"inStock\":false,\"createdAt\":\"2021-10-09T17:27:25.337Z\",\"updatedAt\":\"2021-10-09T17:27:25.337Z\",\"__v\":0,\"cat\":[\"1\",\"2\",\"4\",\"\"]},{\"_id\":\"6161f7432cd6a59597e8fbeb\",\"title\":\"Test Product 1\",\"desc\":\"lkjfljkljgf\",\"img\":\"https://firebasestorage.googleapis.com/v0/b/shop-60c8c.appspot.com/o/1633810238119apple-1282241_1920.jpg?alt=media&token=b8b1de30-90c9-435f-89e6-b7d3ea4259a5\",\"cat\":[],\"tags\":[],\"size\":[],\"color\":[],\"price\":1,\"inStock\":false,\"createdAt\":\"2021-10-09T20:10:43.574Z\",\"updatedAt\":\"2021-10-09T21:15:37.386Z\",\"__v\":0}],\"isFetching\":false,\"error\":false}","_persist":"{\"version\":1,\"rehydrated\":true}"}