import "./product.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Link, useLocation } from "react-router-dom";
import app from "../../firebase";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { axios } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({
    title: product.title,
    desc: product.desc,
    inStock: product.inStock,
    price: product.price,
  });
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(product.cat);
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCat = (e) => {
    setCat(
      e.target.value
        .toLowerCase()
        .replace(/[^a-zA-Z,]/g, "")
        .split(",")
    );
  };

  const handleClickWithFile = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        const tags = inputs.title
          .toLowerCase()
          .replace(/[^a-zA-Z ]/g, "")
          .split(" ");
        const slug = inputs.title
          .toLowerCase()
          .split(" ")
          .join("-")
          .toLowerCase();
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const updatedProduct = {
            ...product,
            ...inputs,
            img: downloadURL,
            cat: cat,
            tags: tags,
            slug: slug,
          };
          updateProduct(productId, updatedProduct, dispatch);
        });
      }
    );
  };

  const handleClick = (e) => {
    e.preventDefault();
    const tags = inputs.title
      .toLowerCase()
      .replace(/[^a-zA-Z ]/g, "")
      .split(" ");
    const slug = inputs.title.toLowerCase().split(" ").join("-");
    const updatedProduct = {
      ...product,
      ...inputs,
      cat: cat,
      tags: tags,
      slug: slug,
    };
    updateProduct(productId, updatedProduct, dispatch);
  };

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  let wait = true;
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    !wait && getStats();
  }, [MONTHS, productId, wait]);

  return (
    <div className="product">
      {/* Title */}
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>

      {/* Product Top */}
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>

        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>

          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Bottom  */}
      <div className="productBottom">
        <form className="productForm">
          {/* inputs, setInputs */}
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              name="title"
              value={inputs.title ? inputs.title : ""}
              onChange={handleChange}
              required
            />
            <label>Product Description</label>
            <input
              type="text"
              name="desc"
              value={inputs.desc ? inputs.desc : ""}
              onChange={handleChange}
              required
            />
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={inputs.price ? inputs.price : ""}
              onChange={handleChange}
              required
            />
            <label>In Stock</label>
            <select name="inStock" onChange={handleChange} required>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {/* cat, setCat */}
            <label>Categories</label>
            <input
              type="text"
              name="cat"
              value={cat ? cat.join() : ""}
              onChange={handleCat}
              required
            />
            {/* tags, setTags */}
            <label>Tags:</label>
            {product?.tags}
          </div>

          {/* file, setFile */}
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={file ? URL.createObjectURL(file) : product.img}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <Publish />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </div>
            <button
              className="productButton"
              onClick={file ? handleClickWithFile : handleClick}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
