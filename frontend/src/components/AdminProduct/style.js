import { Upload } from "antd";
import styled from "styled-components";

export const AdminProductPage = styled.main`
  min-height: calc(100vh - 70px);
  padding: 28px 20px 40px;
  background: linear-gradient(180deg, #f5faf9 0%, #eef5fb 100%);
`;

export const PageShell = styled.div`
  width: min(1440px, 100%);
  margin: 0 auto;
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 22px;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const WrapperHeader = styled.h1`
  margin: 0;
  color: #142b38;
  font-size: clamp(28px, 2.6vw, 38px);
  line-height: 1.2;
`;

export const HeaderSubtitle = styled.p`
  margin: 0;
  color: #667985;
  font-size: 14px;
`;

export const AddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 18px;
  border: 0;
  border-radius: 12px;
  background: linear-gradient(135deg, #0d6b68 0%, #0f4d63 100%);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  box-shadow: 0 16px 30px rgba(13, 107, 104, 0.22);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
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
  border: 1px solid rgba(17, 54, 68, 0.08);
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 18px 44px rgba(17, 54, 68, 0.08);
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
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

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 20px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const FullSpan = styled.div`
  grid-column: 1 / -1;
`;

export const FormActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const CustomFormRow = styled.div`
  display: grid;
  grid-template-columns: 170px minmax(0, 1fr);
  gap: 12px 16px;
  align-items: center;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const CustomLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #1f1f1f;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
`;

export const RequiredMark = styled.span`
  color: #ff4d4f;
  margin-left: 4px;
`;

export const DoubleFieldRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 18px;
  margin-bottom: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const FormInputWrapper = styled.div`
  width: 100%;

  .ant-input,
  .ant-select-selector,
  .ant-select-selection-item,
  .ant-input-affix-wrapper {
    min-height: 40px !important;
    border-radius: 8px !important;
    border: 1px solid #d9d9d9 !important;
    background: #fff !important;
  }

  .ant-btn {
    height: 40px;
    border-radius: 8px;
  }
`;

export const ModalActionButton = styled.button`
  min-width: 150px;
  height: 42px;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #0d6b68 0%, #0f4d63 100%);
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 24px rgba(13, 107, 104, 0.2);
`;

export const PrimaryButton = styled.button`
  height: 42px;
  padding: 0 18px;
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
    width: 72px;
    height: 72px;
    border-radius: 16px;
    border: 1px dashed #b7d5d0;
    background: #f4fbfa;
  }

  & .ant-upload-list-item-container {
    display: none;
  }

  & .ant-upload {
    display: flex;
    align-items: center;
  }
`;
