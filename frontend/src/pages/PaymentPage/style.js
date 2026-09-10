import { Radio } from "antd";
import styled from "styled-components";

export const PaymentPageWrapper = styled.main`
  min-height: calc(100vh - 72px);
  padding: 38px 24px 64px;
  background: linear-gradient(180deg, #f5faf9 0%, #eff6fa 100%);
`;

export const PaymentShell = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
`;

export const HeaderGroup = styled.header`
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
  font-size: clamp(28px, 3vw, 38px);
  line-height: 1.2;
`;

export const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 940px) {
    grid-template-columns: 1fr;
  }
`;

export const WrapperLeft = styled.section`
  display: grid;
  gap: 18px;
`;

export const WrapperRight = styled.aside`
  position: sticky;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 940px) {
    position: static;
  }
`;

export const CheckoutCard = styled.div`
  border: 1px solid rgba(17, 54, 68, 0.08);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 18px 44px rgba(17, 54, 68, 0.08);
  overflow: hidden;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 22px;
  border-bottom: 1px solid #edf2f3;
  background: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%);
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: #1a2d39;
  font-size: 18px;
`;

export const SectionTag = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  background: #edf7f3;
  color: #0d6b68;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const WrapperInfo = styled.div`
  padding: 22px;
  background: #ffffff;
`;

export const Lable = styled.span`
  display: block;
  color: #1e2f39;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.01em;
`;

export const WrapperRadio = styled(Radio.Group)`
  display: grid;
  gap: 12px;
  margin-top: 14px;

  .ant-radio-wrapper {
    display: flex;
    align-items: center;
    margin-right: 0;
    padding: 15px 16px;
    border: 1px solid #e7edf0;
    border-radius: 14px;
    background: #f9fbfc;
    transition: all 0.2s ease;

    &:hover {
      border-color: #c8e3dd;
    }
  }

  .ant-radio-wrapper-checked {
    border-color: #0d6b68;
    background: linear-gradient(135deg, #edf9f7 0%, #f8fbfb 100%);
    box-shadow: 0 12px 24px rgba(13, 107, 104, 0.09);
  }

  .ant-radio {
    top: 0;
  }

  .ant-radio-checked .ant-radio-inner {
    border-color: #0d6b68;
    background-color: #0d6b68;
  }
`;

export const DeliveryOption = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #304b5d;
  font-size: 14px;
  font-weight: 600;

  span {
    color: #eb7b1f;
    font-weight: 800;
    letter-spacing: 0.06em;
  }
`;

export const AddressBlock = styled.div`
  display: grid;
  gap: 10px;
`;

export const AddressText = styled.span`
  color: #263b48;
  font-size: 14px;
  line-height: 1.6;
  font-weight: 600;
`;

export const AddressAction = styled.button`
  padding: 0;
  border: 0;
  color: #0d6b68;
  background: transparent;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
`;

export const SummaryList = styled.div`
  display: grid;
  gap: 12px;
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #596d78;
  font-size: 14px;
`;

export const SummaryValue = styled.span`
  color: #1f3039;
  font-weight: 700;
`;

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding-top: 18px;
  border-top: 1px solid #edf2f3;
`;

export const TotalLabel = styled.span`
  color: #1f3039;
  font-size: 15px;
  font-weight: 700;
`;

export const TotalValue = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: #e65c2a;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.04em;
`;

export const TotalHint = styled.span`
  color: #697d86;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0;
`;

export const PayPalWrap = styled.div`
  width: 100%;
  padding-top: 6px;
`;

export const OrderButtonWrap = styled.div`
  width: 100%;
`;

export const SummaryCard = styled(CheckoutCard)`
  padding: 0;
`;
