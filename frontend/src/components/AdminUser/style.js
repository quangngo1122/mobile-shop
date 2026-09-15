import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  margin: 0;
  color: #142b38;
  font-size: clamp(28px, 2.6vw, 38px);
  line-height: 1.2;
`;

export const AdminUserPage = styled.main`
  min-height: calc(100vh - 70px);
  padding: 28px 20px 40px;
  background: linear-gradient(180deg, #f5faf9 0%, #eef5fb 100%);
`;

export const PageShell = styled.div`
  width: min(1440px, 100%);
  margin: 0 auto;
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 22px;
`;

export const HeaderSubtitle = styled.p`
  margin: 0;
  color: #667985;
  font-size: 14px;
`;

export const TopStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 18px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  padding: 18px 20px;
  border: 1px solid rgba(17, 54, 68, 0.08);
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(17, 54, 68, 0.06);
`;

export const StatLabel = styled.div`
  color: #6d7d87;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const StatValue = styled.div`
  margin-top: 10px;
  color: #1b2f3b;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.04em;
`;

export const TablePanel = styled.section`
  overflow: hidden;
  border: 1px solid rgba(17, 54, 68, 0.08);
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 18px 44px rgba(17, 54, 68, 0.08);
`;

export const TableHeader = styled.div`
  padding: 18px 22px;
  border-bottom: 1px solid #edf2f3;
  background: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%);
`;

export const TableTitle = styled.h2`
  margin: 0;
  color: #1b2f3b;
  font-size: 18px;
`;

export const TableBody = styled.div`
  padding: 16px 18px 18px;
`;

export const FormCard = styled.div`
  padding: 4px 0;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 140px minmax(0, 1fr);
  gap: 12px 16px;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FormLabel = styled.label`
  color: #1f1f1f;
  font-size: 15px;
  font-weight: 600;
`;

export const FormInputWrapper = styled.div`
  width: 100%;

  .ant-input,
  .ant-input-affix-wrapper {
    min-height: 40px !important;
    border-radius: 8px !important;
    border: 1px solid #d9d9d9 !important;
    background: #fff !important;
  }
`;

export const FormActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const PrimaryButton = styled.button`
  min-width: 100px;
  height: 42px;
  border: 0;
  border-radius: 10px;
  background: linear-gradient(135deg, #0d6b68 0%, #0f4d63 100%);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`;

export const UploadPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const PreviewImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  object-fit: cover;
  border: 1px solid #e7edf0;
  background: #f5f8fa;
`;

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  & .ant-upload-list-item-container {
    display: none;
  }
  & .ant-upload {
    display: flex;
    align-items: center;
  }
`;
