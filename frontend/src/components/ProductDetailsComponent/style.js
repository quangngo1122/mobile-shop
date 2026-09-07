import { InputNumber } from "antd";
import styled from "styled-components";

export const ProductDetailsShell = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
  gap: 28px;
  padding: 28px;
  border: 1px solid #e7eeee;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 14px 40px rgba(31, 55, 78, 0.07);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;

export const ProductGallery = styled.section`
  min-width: 0;
  padding-right: 28px;
  border-right: 1px solid #edf1f2;

  @media (max-width: 760px) {
    padding-right: 0;
    padding-bottom: 22px;
    border-right: 0;
    border-bottom: 1px solid #edf1f2;
  }
`;

export const MainProductImage = styled.img`
  width: 100%;
  height: 390px;
  object-fit: contain;
  border-radius: 12px;
  background: #f8faf9;

  @media (max-width: 480px) {
    height: 280px;
  }
`;

export const ProductThumbnailList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  margin-top: 14px;
`;

export const WrapperStyleColImage = styled.div`
  min-width: 0;
`;

export const WrapperStyleImageSmall = styled.img`
  width: 100%;
  height: 68px;
  padding: 4px;
  object-fit: contain;
  border: 1px solid #e2e9e8;
  border-radius: 8px;
  background: #ffffff;
`;

export const ProductInfo = styled.section`
  min-width: 0;
`;

export const ProductMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 0 18px;
`;

export const WrapperStyleNameProduct = styled.h1`
  margin: 0;
  color: #172b3a;
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: 0;
  word-break: break-word;
`;

export const WrapperStyleTextSell = styled.span`
  color: #71808c;
  font-size: 13px;
`;

export const WrapperPriceProduct = styled.div`
  margin-bottom: 18px;
  padding: 18px 20px;
  border-radius: 10px;
  background: #f0f8f7;
`;

export const WrapperPriceTextProduct = styled.strong`
  color: #e5484d;
  font-size: 30px;
  line-height: 1.2;
`;

export const DescriptionLabel = styled.h2`
  margin: 0 0 8px;
  color: #263b48;
  font-size: 14px;
  letter-spacing: 0;
`;

export const WrapperStyleDescription = styled.p`
  margin: 0 0 20px;
  color: #71808c;
  font-size: 14px;
  line-height: 1.65;
`;

export const PurchasePanel = styled.div`
  padding-top: 20px;
  border-top: 1px solid #edf1f2;
`;

export const QuantityLabel = styled.div`
  margin-bottom: 10px;
  color: #344957;
  font-size: 14px;
  font-weight: 700;
`;

export const WrapperQualityProduct = styled.div`
  display: flex;
  width: 122px;
  height: 38px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dfe7e7;
  border-radius: 7px;
`;

export const QuantityButton = styled.button`
  width: 34px;
  height: 100%;
  padding: 0;
  border: 0;
  color: #52636d;
  background: transparent;
  cursor: pointer;
`;

export const WrapperInputNumber = styled(InputNumber)`
  &.ant-input-number.ant-input-number-sm {
    width: 52px;
    border-top: 0;
    border-bottom: 0;
    border-radius: 0;
    .ant-input-number-handler-wrap {
      display: none !important;
    }
  }
`;

export const BuyButton = styled.button`
  width: min(100%, 320px);
  height: 50px;
  margin-top: 20px;
  border: 0;
  border-radius: 8px;
  color: #ffffff;
  background: #0d6b68;
  box-shadow: 0 10px 18px rgba(13, 107, 104, 0.18);
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
`;

export const ErrorLimit = styled.div`
  margin-top: 8px;
  color: #d4380d;
  font-size: 13px;
`;

export const CommentsSection = styled.section`
  grid-column: 1 / -1;
  padding-top: 24px;
  border-top: 1px solid #edf1f2;
  overflow-x: auto;
`;
