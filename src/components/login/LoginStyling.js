import styled from "styled-components";
import { StyledRegister } from "../register/RegisterStyling";
import { StyledLandingPage } from "../../pages/LandingPageStyling";
export const StyledLogin = {};

StyledLogin.Container = styled(StyledLandingPage.Container)`
  fontfamily: Nunito;
  padding-top: 250px;
`;

StyledLogin.Button = styled(StyledRegister.Button)``;

StyledLogin.FormControl = styled(StyledRegister.FormControl)``;
StyledLogin.ErrorMessage = styled(StyledRegister.ErrorMessage)``;
StyledLogin.Form = styled(StyledRegister.Form)``;
