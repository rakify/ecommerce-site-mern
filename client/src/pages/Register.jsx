import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import app from "../firebase";
import { addUser } from "../redux/apiCalls";

const Container = styled.div`
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  ${mobile({ width: "75%" })}
`;

const NewUser = styled.div`
  flex: 4;
`;

const NewUserForm = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const NewUserItem = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 20px;
`;

const NewUserItemLabel = styled.label`
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: 600;
  color: rgb(151, 150, 150);
`;

const NewUserInput = styled.input`
  height: 20px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
`;

const NewUserGender = styled.div`
  margin-top: 15px;
  margin: 10px;
  font-size: 18px;
  color: #555;
  margin: 10px;
  font-size: 18px;
  color: #555;
`;
const NewUserSelect = styled.select`
  height: 40px;
  border-radius: 5px;
`;

const NewUserButton = styled.button`
  width: 200px;
  border: none;
  background-color: darkblue;
  color: white;
  padding: 7px 10px;
  font-weight: 600;
  border-radius: 10px;
  margin-top: 30px;
  cursor: pointer;
`;

export default function Register() {
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
          addUser(user);
        });
      }
    );
  };

  return (
    <Container>
        <NewUser>
          <h1>New User</h1>
          <NewUserForm>
            <NewUserItem>
              <NewUserItemLabel>Image</NewUserItemLabel>
              <NewUserInput
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </NewUserItem>
            <NewUserItem>
              <NewUserItemLabel>Username</NewUserItemLabel>
              <NewUserInput
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </NewUserItem>
            <NewUserItem>
              <NewUserItemLabel>Email</NewUserItemLabel>
              <NewUserInput
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </NewUserItem>
            <NewUserItem>
              <NewUserItemLabel>Password</NewUserItemLabel>
              <NewUserInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </NewUserItem>
            <NewUserButton
              onClick={
                file &&
                inputs.email &&
                inputs.username &&
                inputs.password &&
                handleClick
              }
            >
              Register
            </NewUserButton>
          </NewUserForm>
        </NewUser>
    </Container>
  );
}
