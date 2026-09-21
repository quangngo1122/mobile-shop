import styled from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`;
export const WrapperStyleHeaderDilivery = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
  margin-bottom: 4px;
`;

export const WrapperContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px);
  padding: 28px 20px 44px;
  background: linear-gradient(180deg, #f5faf9 0%, #eef5fb 100%);
`;

export const WrapperLeft = styled.div`
  width: 910px;
`;

export const OrderPageShell = styled.div`
  width: min(1080px, 100%);
  margin: 0 auto;
`;

export const PageIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 22px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: #142b38;
  font-size: clamp(26px, 3vw, 36px);
  line-height: 1.2;
`;

export const PageSubtitle = styled.p`
  margin: 0;
  color: #667985;
  font-size: 14px;
`;

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const OrderCount = styled.span`
  color: #0d6b68;
  font-size: 13px;
  font-weight: 700;
`;

export const WrapperFooterItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  width: 100%;
  padding-top: 18px;
  border-top: 1px solid #edf2f3;

  @media (max-width: 620px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const TotalBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TotalLabel = styled.span`
  color: #667985;
  font-size: 12px;
`;

export const TotalValue = styled.strong`
  color: #0d6b68;
  font-size: 20px;
`;

export const ActionGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

export const OrderAction = styled.button`
  min-width: 122px;
  height: 38px;
  padding: 0 14px;
  border: 1px solid ${({ $primary }) => ($primary ? "#0d6b68" : "#d8e3e5")};
  border-radius: 9px;
  background: ${({ $primary }) => ($primary ? "#0d6b68" : "#ffffff")};
  color: ${({ $primary }) => ($primary ? "#ffffff" : "#526773")};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(17, 54, 68, 0.1);
  }
`;

export const WrapperHeaderItem = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  min-height: 82px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f4f5;
`;

export const ProductImage = styled.img`
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
  border: 1px solid #e5edef;
  border-radius: 12px;
  padding: 3px;
  object-fit: cover;
  background: #ffffff;
`;

export const ProductInfo = styled.div`
  min-width: 0;
  flex: 1;
  margin-left: 14px;
`;

export const ProductName = styled.div`
  overflow: hidden;
  color: #243b47;
  font-size: 14px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProductQuantity = styled.div`
  margin-top: 8px;
  color: #81919a;
  font-size: 12px;
`;

export const ProductPrice = styled.span`
  align-self: center;
  margin-left: 14px;
  color: #314650;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  flex-direction: column;
  padding: 22px;
  border: 1px solid rgba(17, 54, 68, 0.08);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 16px 34px rgba(17, 54, 68, 0.07);
`;

export const WrapperStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 1px solid #edf2f3;
`;

export const StatusHeading = styled.span`
  color: #1b2f3b;
  font-size: 14px;
  font-weight: 800;
`;

export const StatusGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
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

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  padding: 30px;
  border: 1px dashed #cbdcde;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.72);
  color: #667985;
  text-align: center;

  img {
    width: 128px;
    height: 128px;
    margin-bottom: 14px;
    opacity: 0.8;
  }
`;
