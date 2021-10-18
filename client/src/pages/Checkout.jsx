import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import { useState } from "react";
import { updateUser } from "./../redux/apiCalls";
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const MainTitle = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background: ${(props) => (props.type === "filled" ? "black" : "transparent")};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const BottomL = styled.div`
  display: flex;
  flex-direction: column;
`;
const BottomLeft = styled.div`
  border: 0.5px solid lightgray;
  flex: 3;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const BottomLeft2 = styled.div`
  border: 0.5px solid lightgray;
  flex: 2;
  padding: 20px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
`;
const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Input = styled.input`
  border: none;
  width: 250px;
  height: 30px;
  border-bottom: 1px solid gray;
`;
const Left = styled.div`
  margin: 5px;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BottomRight = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Empty = styled.h1`
  font-family: "Brush Script MT", cursive;
  text-align: center;
  padding: 50px;
  font-weight: 300;
`;

const Checkout = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const cart = useSelector((state) => state.cart);
  const [inputs, setInputs] = useState({
    name: user.name,
    pn: user.pn,
    address: {
      division: "",
      district: "",
      upazila: "",
      street: "",
    },
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      ...inputs,
    };
    updateUser(user._id, updatedUser, dispatch);
  };

  const d = new Date();
  const weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  weekday[7] = "Sunday";
  weekday[8] = "Monday";
  weekday[9] = "Tuesday";
  weekday[10] = "Wednesday";
  weekday[11] = "Thursday";
  weekday[12] = "Friday";
  weekday[13] = "Saturday";
  weekday[14] = "Sunday";

  return (
    <Container>
      <Wrapper>
        <MainTitle>Checkout</MainTitle>
        {cart.products.length === 0 && (
          <Empty>Theres Noting to Checkout in Your Cart!</Empty>
        )}
        {cart.products.length > 0 && (
          <>
            <Top>
              <Link to="/">
                <TopButton>Forgot Something to Add?</TopButton>
              </Link>

              <TopButton type="filled">PLACE ORDER</TopButton>
            </Top>

            <Bottom>
              <BottomL>
                <BottomLeft>
                  <Title>SHIPPING ADDRESS</Title>
                  <Form>
                    <Left>
                      <Item>
                        <Input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={inputs.name ? inputs.name : ""}
                          onChange={handleChange}
                        />
                      </Item>
                      <Item>
                        <Input
                          type="text"
                          name="pn"
                          placeholder="Phone Number"
                          value={inputs.pn ? inputs.pn : ""}
                          onChange={handleChange}
                        />
                      </Item>
                    </Left>

                    <Right>
                      <Item>
                        <Input
                          type="text"
                          name="division"
                          placeholder="Division"
                          value={inputs.division ? inputs.division : ""}
                          onChange={handleChange}
                          required
                        />
                      </Item>
                      <Item>
                        <Input
                          type="text"
                          name="district"
                          placeholder="District"
                          value={inputs.district ? inputs.district : ""}
                          onChange={handleChange}
                          required
                        />
                      </Item>
                      <Item>
                        <Input
                          type="text"
                          name="upazila"
                          placeholder="Upazila"
                          value={inputs.upazila ? inputs.upazila : ""}
                          onChange={handleChange}
                          required
                        />
                      </Item>
                      <Item>
                        <Input
                          type="text"
                          name="street"
                          placeholder="Street Address"
                          value={inputs.street ? inputs.street : ""}
                          onChange={handleChange}
                          required
                        />
                      </Item>
                    </Right>
                  </Form>
                </BottomLeft>
                <BottomLeft2>
                  <Title>Prefered Delivery Timing</Title>
                  <Form>
                    <Left>
                      <input
                        type="radio"
                        name="date"
                        id="date"
                        value={`${d.getDate()} - ${d.getUTCMonth() + 1} - ${d.getFullYear()} ${weekday[d.getDay()]}`}
                      />
                      {`${d.getDate()} - ${d.getUTCMonth() + 1} - ${d.getFullYear()} ${weekday[d.getDay()]}`}
                      <br />
                      <input
                        type="radio"
                        name="date"
                        value={`${d.getDate() + 1} - ${d.getUTCMonth() + 1} - ${d.getFullYear()} ${weekday[d.getDay()]}`}
                      />
                      {`${d.getDate() + 1} - ${d.getUTCMonth() + 1} - ${d.getFullYear()} ${weekday[d.getDay()+1]}`}
                    </Left>
                  </Form>
                </BottomLeft2>
              </BottomL>
              <BottomRight>
                <Title>ORDER SUMMARY</Title>

                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                </SummaryItem>

                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 5</SummaryItemPrice>
                </SummaryItem>

                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ -5</SummaryItemPrice>
                </SummaryItem>

                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryTitle>Your Cart</SummaryTitle>
                {cart.products.map((product) => (
                  <Product key={product._id}>
                    <SummaryItem>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Product: </b>
                          {product.title}
                        </ProductName>
                        <ProductId>
                          <b>Quantity: </b>
                          {product.quantity}
                        </ProductId>
                        <ProductId>
                          <b>Price: </b>$ {product.price * product.quantity}
                        </ProductId>
                        <ProductSize>
                          <b>Size: </b>
                          {product.size?.toUpperCase()}
                        </ProductSize>
                      </Details>
                    </SummaryItem>
                  </Product>
                ))}
              </BottomRight>
            </Bottom>
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default Checkout;
