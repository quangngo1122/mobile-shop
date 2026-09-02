import { Upload } from "antd";
import styled from "styled-components";

export const ProfilePageWrapper = styled.main`
  min-height: calc(100vh - 72px);
  padding: 42px 24px 64px;
  background: #f5f8f7;
`;

export const ProfileShell = styled.div`
  width: min(1040px, 100%);
  margin: 0 auto;
`;

export const WrapperHeader = styled.header`
  margin-bottom: 26px;
`;

export const PageEyebrow = styled.div`
  margin-bottom: 8px;
  color: #0d6b68;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.4px;
  text-transform: uppercase;
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: #172b3a;
  font-size: 30px;
  line-height: 1.2;
  letter-spacing: 0;
`;

export const PageSubtitle = styled.p`
  margin: 9px 0 0;
  color: #71808c;
  font-size: 15px;
`;

export const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  overflow: hidden;
  border: 1px solid rgba(18, 42, 66, 0.08);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 18px 45px rgba(31, 55, 78, 0.08);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const ProfileAside = styled.aside`
  padding: 34px 28px;
  color: #ffffff;
  background: linear-gradient(145deg, #0d6b68 0%, #104f63 100%);
  text-align: center;
`;

export const AvatarFrame = styled.div`
  width: 132px;
  height: 132px;
  display: grid;
  place-items: center;
  margin: 0 auto 20px;
  overflow: hidden;
  border: 8px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const AvatarPlaceholder = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 44px;
  font-weight: 800;
`;

export const ProfileName = styled.h2`
  margin: 0 0 8px;
  font-size: 21px;
  letter-spacing: 0;
`;

export const ProfileEmail = styled.p`
  margin: 0;
  overflow-wrap: anywhere;
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
`;

export const AvatarHint = styled.p`
  margin: 24px 0 16px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  line-height: 1.5;
`;

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload-list-item-container {
    display: none;
  }
`;

export const ProfileForm = styled.section`
  padding: 34px 40px 38px;

  @media (max-width: 520px) {
    padding: 28px 22px 30px;
  }
`;

export const FormSectionTitle = styled.h3`
  margin: 0 0 22px;
  color: #172b3a;
  font-size: 18px;
  letter-spacing: 0;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px 20px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div`
  min-width: 0;
`;

export const WrapperLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #344957;
  font-size: 13px;
  font-weight: 700;
`;

export const WrapperInput = styled.div`
  min-width: 0;
`;

export const AddressSection = styled.div`
  margin-top: 30px;
  padding-top: 28px;
  border-top: 1px solid #edf1f2;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;

export const SaveButton = styled.button`
  min-width: 148px;
  height: 46px;
  padding: 0 22px;
  border: 0;
  border-radius: 8px;
  color: #ffffff;
  background: #0d6b68;
  box-shadow: 0 10px 18px rgba(13, 107, 104, 0.18);
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
`;

export const StatusMessage = styled.span`
  display: block;
  margin-top: 18px;
  color: #d4380d;
  font-size: 13px;
`;
