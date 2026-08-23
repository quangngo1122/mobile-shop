import styled from "styled-components";

export const SignInPageWrapper = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  background: #f4f7fb;
  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  &::before {
    width: 420px;
    height: 420px;
    top: -210px;
    left: -120px;
    background: #dff4f0;
  }

  &::after {
    width: 360px;
    height: 360px;
    right: -140px;
    bottom: -160px;
    background: #ffe8d8;
  }
`;

export const SignInCard = styled.section`
  width: min(940px, 100%);
  min-height: 590px;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(320px, 0.92fr);
  position: relative;
  z-index: 1;
  overflow: hidden;
  border: 1px solid rgba(18, 42, 66, 0.08);
  border-radius: 24px;
  background: #ffffff;
  box-shadow: 0 24px 70px rgba(31, 55, 78, 0.14);

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

export const WrapperContainerLeft = styled.div`
  padding: 62px 64px 52px;
  display: flex;
  flex-direction: column;

  @media (max-width: 720px) {
    padding: 42px 28px 36px;
  }
`;

export const WrapperContainerRight = styled.div`
  min-height: 100%;
  padding: 42px;
  color: #ffffff;
  background: linear-gradient(145deg, #0d6b68 0%, #104f63 100%);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;

  &::before {
    content: "";
    width: 230px;
    height: 230px;
    position: absolute;
    top: -86px;
    right: -78px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50%;
  }

  @media (max-width: 720px) {
    min-height: 210px;
    padding: 30px 24px;
  }
`;

export const WrapperTextLight = styled.span`
  color: #0d6b68;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

export const BrandEyebrow = styled.span`
  margin-bottom: 20px;
  color: #0d6b68;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.4px;
  text-transform: uppercase;
`;

export const FormTitle = styled.h1`
  margin: 0 0 8px;
  color: #172b3a;
  font-size: clamp(28px, 4vw, 36px);
  line-height: 1.15;
  letter-spacing: 0;
`;

export const FormSubtitle = styled.p`
  margin: 0 0 34px;
  color: #71808c;
  font-size: 15px;
`;

export const FieldLabel = styled.label`
  margin: 0 0 8px;
  color: #344957;
  font-size: 13px;
  font-weight: 700;
`;

export const FieldGroup = styled.div`
  margin-bottom: 20px;
`;

export const PasswordField = styled.div`
  position: relative;

  .password-toggle {
    position: absolute;
    top: 50%;
    right: 14px;
    z-index: 2;
    padding: 0;
    border: 0;
    color: #78909c;
    background: transparent;
    cursor: pointer;
    transform: translateY(-50%);
  }
`;

export const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  color: #71808c;
  font-size: 14px;
`;

export const BrandMark = styled.div`
  width: 160px;
  height: 160px;
  display: grid;
  place-items: center;
  margin-bottom: 26px;
  border: 10px solid rgba(255, 255, 255, 0.14);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.11);
`;

export const BrandTitle = styled.h2`
  margin: 0 0 10px;
  font-size: 25px;
  letter-spacing: 0;
`;

export const BrandDescription = styled.p`
  max-width: 260px;
  margin: 0;
  color: rgba(255, 255, 255, 0.76);
  font-size: 14px;
  line-height: 1.6;
`;
