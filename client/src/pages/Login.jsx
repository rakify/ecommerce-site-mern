import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./../redux/apiCalls";
import { Link } from "react-router-dom";
import {
  VisibilityTwoTone,
  VisibilityOffTwoTone,
  VpnKeyTwoTone,
  PersonOutlineTwoTone,
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

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    username.length >= 3 &&
      password.length >= 4 &&
      login(dispatch, { username, password });
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Title>Please Login to Continue</Title>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <InputContainer>
              <PersonOutlineTwoTone />
              <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <VpnKeyTwoTone />
              <Input
                placeholder="Password"
                type={visible ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!visible && (
                <VisibilityOffTwoTone onClick={() => setVisible(!visible)} />
              )}
              {visible && (
                <VisibilityTwoTone onClick={() => setVisible(!visible)} />
              )}
            </InputContainer>

            {error && <Error>{error.payload}</Error>}

            <Button disabled={isFetching}>ENTER</Button>
          </Form>

          <Link
              to="/forgot-password"
              style={{
                margin: "5px 0",
                width:"50%",
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
                width:"50%",
                fontSize: "12px",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              CREATE A NEW ACCOUNT
            </Link>
            <Hr />
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
