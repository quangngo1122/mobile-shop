import styled from "styled-components";

export const DetailsOrderLayout = styled.main`
  min-height: calc(100vh - 70px);
  padding: 28px 20px 44px;
  background: linear-gradient(180deg, #f5faf9 0%, #eef5fb 100%);
`;

export const DetailsOrderShell = styled.div`
  width: min(1120px, 100%);
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

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 18px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

export const InfoCard = styled.section`
  min-height: 154px;
  padding: 18px;
  border: 1px solid rgba(17, 54, 68, 0.08);
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 16px 34px rgba(17, 54, 68, 0.06);
`;

export const InfoLabel = styled.h2`
  margin: 0 0 16px;
  color: #526773;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const InfoContent = styled.div`
  color: #667985;
  font-size: 13px;
  line-height: 1.7;

  .name-info {
    color: #1b2f3b;
    font-size: 15px;
    font-weight: 800;
    text-transform: uppercase;
  }

  span {
    color: #81919a;
  }
`;

export const AccentText = styled.span`
  color: #0d6b68 !important;
  font-weight: 800;
`;

export const OrderContent = styled.section`
  overflow: hidden;
  border: 1px solid rgba(17, 54, 68, 0.08);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 18px 44px rgba(17, 54, 68, 0.07);
`;

export const OrderContentHeader = styled.div`
  padding: 20px 22px;
  border-bottom: 1px solid #edf2f3;
`;

export const OrderContentTitle = styled.h2`
  margin: 0;
  color: #1b2f3b;
  font-size: 18px;
`;

export const ProductTable = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const ProductTableHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 1fr) 130px 100px 130px;
  min-width: 680px;
  padding: 13px 22px;
  background: #f8fbfb;
  color: #81919a;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export const ProductRow = styled.div`
  display: grid;
  grid-template-columns: minmax(260px, 1fr) 130px 100px 130px;
  align-items: center;
  min-width: 680px;
  padding: 14px 22px;
  border-bottom: 1px solid #f0f4f5;
`;

export const ProductCell = styled.div`
  color: #314650;
  font-size: 13px;
  font-weight: ${({ $strong }) => ($strong ? 700 : 500)};
`;

export const ProductIdentity = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 14px;
`;

export const ProductImage = styled.img`
  width: 62px;
  height: 62px;
  flex: 0 0 62px;
  border: 1px solid #e5edef;
  border-radius: 12px;
  padding: 3px;
  object-fit: cover;
  background: #ffffff;
`;

export const ProductName = styled.div`
  overflow: hidden;
  color: #243b47;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Summary = styled.div`
  width: min(430px, 100%);
  margin-left: auto;
  padding: 18px 22px 22px;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 9px 0;
  color: #667985;
  font-size: 13px;
`;

export const TotalRow = styled(SummaryRow)`
  margin-top: 6px;
  padding-top: 16px;
  border-top: 1px dashed #cbdcde;
  color: #1b2f3b;
  font-size: 16px;
  font-weight: 800;
`;

export const TotalValue = styled.span`
  color: #0d6b68;
  font-size: 22px;
`;
