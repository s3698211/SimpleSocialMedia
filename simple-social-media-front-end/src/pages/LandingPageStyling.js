import styled from "styled-components";
import { Button, Container } from "react-bootstrap";
import bgImg from "../assets/images/LandingPage.jpg";
export const StyledLandingPage = {};

StyledLandingPage.Container = styled.div`
  display: flex;

  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  height: 100vh;
  fontfamily: Nunito;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${bgImg});

  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
  border-radius: 6px;
  font-size: 30px;
  border: none;
  cursor: pointer;
  background-size: 200%;

  background-image: linear-gradient(to left, #0f9b0f, #38ef7d, #11998e);
  transition: background-position 1.5s;
  &:hover {
    background-position: right;
  }
`;
