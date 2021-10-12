import "./newUser.css";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addUser } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

export default function NewUser() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
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
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = {
            ...inputs,
            img: downloadURL,
          };
          addUser(user, dispatch);
        });
      }
    );
  };

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            required
          />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input
            type="text"
            name="pn"
            placeholder="+880"
            onChange={handleChange}
          />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              onChange={handleChange}
            />
            <label for="male">Male</label>
            <input
              type="radio"
              name="gender"
              id="female"
              value="female"
              onChange={handleChange}
            />
            <label for="female">Female</label>
            <input
              type="radio"
              name="gender"
              id="other"
              value="other"
              onChange={handleChange}
            />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Account Type</label>
          <select
            className="newUserSelect"
            name="isAdmin"
            onChange={handleChange}
            required
          >
            <option value="false">Buyer</option>
            <option value="true" disabled>
              Seller
            </option>
          </select>
        </div>
        <button className="newUserButton" onClick={file && inputs.email && inputs.username && inputs.password && handleClick}>
          Create
        </button>
      </form>
    </div>
  );
}
