import styled from "styled-components";

export const OrderPageWrapper = styled.main`
  min-height: calc(100vh - 72px);
  padding: 34px 24px 64px;
  background: #f5f8f7;
`;

export const OrderShell = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
`;

export const OrderHeader = styled.header`
  margin-bottom: 24px;
`;

export const PageEyebrow = styled.div`
  margin-bottom: 7px;
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

export const OrderLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 350px;
  gap: 22px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const WrapperLeft = styled.section`
  min-width: 0;
`;

export const WrapperStyleHeaderDelivery = styled.div`
  margin-bottom: 12px;
  padding: 18px 20px;
  overflow-x: auto;
  border: 1px solid #e8eeee;
  border-radius: 12px;
  background: #ffffff;
`;

export const WrapperStyleHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(230px, 1fr) 100px 100px 110px 22px;
  gap: 12px;
  align-items: center;
  padding: 14px 18px;
  color: #72818a;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.2px;
  text-transform: uppercase;
  background: #ffffff;
  border: 1px solid #e8eeee;
  border-radius: 12px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr 86px 86px 20px;

    & > div span:first-child {
      display: none;
    }
  }
`;

export const WrapperListOrder = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 10px;
`;

export const WrapperItemOrder = styled.article`
  display: grid;
  grid-template-columns: minmax(230px, 1fr) 100px 100px 110px 22px;
  gap: 12px;
  align-items: center;
  padding: 16px 18px;
  border: 1px solid #e8eeee;
  border-radius: 12px;
  background: #ffffff;

  @media (max-width: 680px) {
    grid-template-columns: 1fr 86px 86px 20px;

    & > div:first-child {
      grid-column: 1 / -1;
    }
  }
`;

export const ProductIdentity = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 12px;
`;

export const ProductImage = styled.img`
  width: 72px;
  height: 72px;
  flex: 0 0 72px;
  object-fit: contain;
  border-radius: 8px;
  background: #f7f9f9;
`;

export const ProductName = styled.div`
  overflow: hidden;
  color: #263b48;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProductPrice = styled.span`
  color: #52636d;
  font-size: 13px;
`;

export const ProductTotal = styled.span`
  color: #e5484d;
  font-size: 13px;
  font-weight: 700;
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  width: 88px;
  height: 30px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #dfe7e7;
  border-radius: 6px;
`;

export const QuantityButton = styled.button`
  width: 28px;
  height: 100%;
  padding: 0;
  border: 0;
  color: #52636d;
  background: transparent;
  cursor: pointer;
`;

export const RemoveButton = styled.button`
  padding: 3px;
  border: 0;
  color: #9aa7ad;
  background: transparent;
  cursor: pointer;

  &:hover {
    color: #e5484d;
  }
`;

export const WrapperRight = styled.aside`
  position: sticky;
  top: 20px;
  padding: 20px;
  border: 1px solid #e8eeee;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 12px 30px rgba(31, 55, 78, 0.06);

  @media (max-width: 900px) {
    position: static;
  }
`;

export const SummaryTitle = styled.h2`
  margin: 0 0 18px;
  color: #172b3a;
  font-size: 18px;
  letter-spacing: 0;
`;

export const WrapperInfo = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #edf1f2;
  color: #64757e;
  font-size: 13px;
  line-height: 1.6;
`;

export const AddressValue = styled.strong`
  color: #263b48;
`;

export const ChangeAddress = styled.button`
  margin-left: 6px;
  padding: 0;
  border: 0;
  color: #0d6b68;
  background: transparent;
  cursor: pointer;
  font-weight: 700;
`;

export const PriceLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  color: #64757e;
  font-size: 14px;
`;

export const PriceValue = styled.strong`
  color: #263b48;
`;

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 0 4px;
  color: #263b48;
  font-size: 15px;
  font-weight: 700;
`;

export const TotalValue = styled.div`
  color: #e5484d;
  font-size: 23px;
  font-weight: 800;
  text-align: right;
`;

export const VatNote = styled.small`
  display: block;
  margin-top: 3px;
  color: #8a989e;
  font-size: 10px;
  font-weight: 400;
`;

export const CheckoutButton = styled.button`
  width: 100%;
  height: 48px;
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
