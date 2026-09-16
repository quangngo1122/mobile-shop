import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  margin: 0;
  color: #142b38;
  font-size: clamp(28px, 2.6vw, 38px);
  line-height: 1.2;
`;

export const AdminOrderPage = styled.main`
  min-height: calc(100vh - 70px);
  padding: 28px 20px 40px;
  background: linear-gradient(180deg, #f5faf9 0%, #eef5fb 100%);
`;

export const PageShell = styled.div`
  width: min(1600px, 100%);
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 18px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
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
  font-size: 26px;
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

  .ant-table-wrapper {
    overflow-x: auto;
  }

  .ant-table-thead > tr > th {
    color: #526773;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .ant-table-tbody > tr > td {
    color: #314650;
    font-size: 13px;
  }
`;

export const StatusTag = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 4px 10px;
  border-radius: 999px;
  background: ${({ $success }) => ($success ? "#e9f8f0" : "#fff4e5")};
  color: ${({ $success }) => ($success ? "#16804b" : "#b66a00")};
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
`;

export const PriceValue = styled.span`
  color: #0d6b68;
  font-weight: 800;
  white-space: nowrap;
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
