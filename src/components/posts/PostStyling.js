import styled from "styled-components";

import { StyledCreatePost } from "./CreatePostStyling";
import { Card, Button, Row, Col, Image } from "react-bootstrap";
export const StyledPosts = {};
StyledPosts.CardContainer = styled(Card)`
  border-radius: 10px;
  width: 500px;
  margin-bottom: 20px;
`;
StyledPosts.Header = styled(Card.Header)`
  text-align: left;
  background-color: #58d68d;
`;

StyledPosts.Button = styled(Button)``;
StyledPosts.Row = styled(Row)`
  padding-left: 10px;
`;
StyledPosts.Col = styled(Col)``;
StyledPosts.Image = styled(Image)``;
