import styled from "styled-components";

export const OrderSuccessWrapper = styled.main`
  min-height: calc(100vh - 72px);
  padding: 42px 24px 64px;
  background: linear-gradient(180deg, #f4f8fb 0%, #eef6f4 100%);
`;

export const OrderSuccessShell = styled.div`
  width: min(1120px, 100%);
  margin: 0 auto;
`;

export const SuccessHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 26px;
`;

export const SuccessBadge = styled.div`
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, #def7ec 0%, #b7ead9 100%);
  box-shadow: 0 12px 28px rgba(24, 137, 93, 0.18);
`;

export const SuccessTitle = styled.h1`
  margin: 0;
  color: #122b32;
  font-size: clamp(28px, 3vw, 38px);
  line-height: 1.2;
`;

export const SuccessSubtitle = styled.p`
  margin: 8px 0 0;
  color: #5d6d77;
  font-size: 15px;
  line-height: 1.6;
`;

export const SuccessGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(280px, 0.8fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
  }
`;

export const Panel = styled.section`
  border: 1px solid rgba(17, 54, 68, 0.08);
  border-radius: 20px;
  background: #ffffff;
  box-shadow: 0 20px 48px rgba(17, 54, 68, 0.08);
`;

export const InfoPanel = styled(Panel)`
  overflow: hidden;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  border-bottom: 1px solid #edf2f3;
  background: linear-gradient(180deg, #ffffff 0%, #fbfcfd 100%);
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: #1b2f3b;
  font-size: 18px;
`;

export const SectionBadge = styled.span`
  padding: 6px 10px;
  border-radius: 999px;
  background: #ebf9f4;
  color: #0d6b68;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const MetaList = styled.div`
  display: grid;
  gap: 14px;
  padding: 22px;
`;

export const MetaRow = styled.div`
  display: flex;
  gap: 14px;
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: 14px;
  border-bottom: 1px solid #eef3f4;

  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  @media (max-width: 560px) {
    flex-direction: column;
    gap: 6px;
  }
`;

export const MetaLabel = styled.span`
  color: #60727d;
  font-size: 13px;
  font-weight: 600;
`;

export const MetaValue = styled.span`
  color: #1e2f39;
  font-size: 14px;
  font-weight: 700;
  text-align: right;

  @media (max-width: 560px) {
    text-align: left;
  }
`;

export const ValueHighlight = styled(MetaValue)`
  color: #eb7b1f;
`;

export const ProductList = styled.div`
  display: grid;
  gap: 14px;
  padding: 20px 22px 24px;
`;

export const ProductCard = styled.article`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 14px;
  border: 1px solid #edf2f3;
  border-radius: 14px;
  background: #fbfcfd;

  @media (max-width: 560px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProductThumb = styled.img`
  width: 82px;
  height: 82px;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #edf2f3;
  background: #f5f8fa;
`;

export const ProductBody = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;

  @media (max-width: 560px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ProductName = styled.div`
  min-width: 0;
  color: #1d2f3a;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProductMetaGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  color: #61717c;
  font-size: 12px;

  @media (max-width: 560px) {
    gap: 6px 10px;
  }
`;

export const ProductMetaLabel = styled.span`
  color: #5d6d77;
  font-weight: 600;
`;

export const ProductMetaValue = styled.span`
  color: #1e2f39;
  font-weight: 700;
`;

export const SidePanel = styled(Panel)`
  padding: 22px;
`;

export const SideTitle = styled.h3`
  margin: 0 0 16px;
  color: #162d38;
  font-size: 18px;
`;

export const AmountSummary = styled.div`
  display: grid;
  gap: 12px;
  padding: 14px 0 18px;
  border-top: 1px solid #edf2f3;
  border-bottom: 1px solid #edf2f3;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  color: #526370;
  font-size: 14px;
`;

export const SummaryValue = styled.span`
  color: #1d2f3a;
  font-weight: 700;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-top: 18px;
  color: #1d2f3a;
  font-size: 15px;
  font-weight: 700;
`;

export const TotalValue = styled.span`
  color: #e65c2a;
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.04em;
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 22px;

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const ActionButton = styled.button`
  height: 46px;
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
`;

export const PrimaryButton = styled(ActionButton)`
  border-color: #0d6b68;
  background: linear-gradient(135deg, #0d6b68 0%, #0f4d63 100%);
  color: #ffffff;
`;

export const SecondaryButton = styled(ActionButton)`
  border-color: #dfe8eb;
  background: #ffffff;
  color: #1d2f3a;
`;
