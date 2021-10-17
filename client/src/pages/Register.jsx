import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import app from "../firebase";
import { login } from "./../redux/apiCalls";
import axios from "axios";
import {
  PersonOutlineTwoTone,
  VpnKeyTwoTone,
  EmailTwoTone,
  ImageTwoTone,
} from "@material-ui/icons";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: darkcyan;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 20px;
  background: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #374669;
  border-radius: 5px;
  align-items: center;
  overflow: hidden;
  margin: 10px 0 10px 0;
`;
const Input = styled.input`
  flex: 1;
  margin: 10px 0;
  padding: 5px;
  border: none;
  outline: none;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 10px 15px;
  background: darkcyan;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  animation: blinker 3s linear infinite;
  animation-timing-function: ease-in-out;
  color: red;
  margin-bottom: 10px;
  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

const Hr = styled.hr`
  background: #eee;
  border: none;
  height: 1px;
  width: 50%;
`;

export default function Register() {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const addUser = async (user) => {
    try {
      await axios.post(`/auth/register`, user);
      login(dispatch, { username: user.username, password: user.password });
    } catch (err) {
      setError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      ...inputs,
    };
    addUser(user);
  };
  const handleSubmitWithFile = (e) => {
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
      (error) => {},
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
      <Wrapper>
        <Title>Create a New Account</Title>
        <Form
          onSubmit={(e) => (file ? handleSubmitWithFile(e) : handleSubmit(e))}
        >
          <InputContainer>
            <PersonOutlineTwoTone />
            <Input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              minLength="3"
              maxLength="30"
              required
            />
          </InputContainer>
          <InputContainer>
            <EmailTwoTone />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </InputContainer>
          <InputContainer>
            <VpnKeyTwoTone />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              minLength="4"
              required
            />
          </InputContainer>
          <InputContainer>
            <ImageTwoTone />
            <Input
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </InputContainer>

          {error && <Error>Email or Username already exists</Error>}

          <Button>Register</Button>
        </Form>

        <Link
          to="/forgot-password"
          style={{
            margin: "5px 0",
            width: "50%",
            fontSize: "12px",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          FORGOT PASSWORD?
        </Link>
        <Hr />
        <Link
          to="/register"
          style={{
            margin: "5px 0",
            width: "50%",
            fontSize: "12px",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          LOGIN HERE
        </Link>
        <Hr />
      </Wrapper>
    </Container>
  );
}
