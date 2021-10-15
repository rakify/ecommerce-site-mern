import styled from "styled-components";
import Navbar from "./../components/Navbar";
import Announcement from "./../components/Announcement";
import Footer from "./../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "./../responsive";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, addCart } from "../redux/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
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
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
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

// const ProductColor = styled.div`
//   width: 20px;
//   height: 20px;
//   border-radius: 50%;
//   background: ${(props) => props.color};
// `;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmmountContainer = styled.div`
  display: flex;
  align-items: center;
`;
const ProductAmmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  margin-bottom: 20px;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

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
const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.currentUser?._id);
  const cart = useSelector((state) => state.cart);

  const emptyCart = () => {
    id && deleteCart(id, dispatch);
  };

  const handleQuantity = (type, productId, title, img, price) => {
    let productInfo = {
      productId: productId,
      title: title,
      img: img,
      price: price,
    };
    if (type === "dec") {
      productInfo.quantity = -1;
      addCart(id, productInfo, dispatch);
    } else {
      productInfo.quantity = 1;
      addCart(id, productInfo, dispatch);
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Cart</Title>
        <Top>
          <Link to="/">
            <TopButton>Continue Shopping</TopButton>
          </Link>

          <TopTexts>
            <TopText>Shopping Bag({cart.products.length})</TopText>
            <TopText>Your Wishlist(0)</TopText>
            <TopText onClick={emptyCart}>Clear Cart</TopText>
          </TopTexts>

          <TopButton type="filled">Checkout Now</TopButton>
        </Top>

        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product: </b>
                      {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID: </b>
                      {product._id}
                    </ProductId>
                    <ProductId>
                      <b>Price: </b>$ {product.price}
                    </ProductId>
                    {/* <ProductColor color={product.color} /> */}
                    <ProductSize>
                      <b>Size: </b>
                      {product.size?.toUpperCase()}
                    </ProductSize>
                  </Details>
                </ProductDetail>

                <PriceDetail>
                  <ProductAmmountContainer>
                    <Remove
                      onClick={() =>
                        handleQuantity(
                          "dec",
                          product.productId,
                          product.title,
                          product.img,
                          product.price
                        )
                      }
                    />
                    <ProductAmmount>{product.quantity}</ProductAmmount>
                    <Add
                      onClick={() =>
                        handleQuantity(
                          "inc",
                          product.productId,
                          product.title,
                          product.img,
                          product.price
                        )
                      }
                    />
                  </ProductAmmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>

          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>

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
            <SummaryButton>CHECKOUT NOW</SummaryButton>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
