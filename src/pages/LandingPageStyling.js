import styled from "styled-components";
import { Button, Container } from "react-bootstrap";
import bgImg from "../assets/images/LandingPage.jpg";
export const StyledLandingPage = {};

StyledLandingPage.Container = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${bgImg});
  height: 100vh;
  background-position: center;
  background-size: cover;
`;

StyledLandingPage.Header1 = styled.h1`
  padding-top: 250px;
  color: white;
  font-size: 60px;
  font-weight: bolder;
`;

StyledLandingPage.Button = styled(Button)`
  margin-top: 70px;
  font-weight: bolder;
  border-radius: 20px;
  font-size: 30px;
  border: none;
  &:hover {
    background-color: orange;
  }
`;
