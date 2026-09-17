import styled from "styled-components";

export const DashboardPage = styled.main`
  min-height: calc(100vh - 70px);
  padding: 28px 20px 42px;
  background: linear-gradient(180deg, #f5faf9 0%, #eef5fb 100%);
`;

export const DashboardShell = styled.div`
  width: min(1440px, 100%);
  margin: 0 auto;
`;

export const DashboardIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 22px;
`;

export const DashboardTitle = styled.h1`
  margin: 0;
  color: #142b38;
  font-size: clamp(28px, 2.6vw, 38px);
  line-height: 1.2;
`;

export const DashboardSubtitle = styled.p`
  margin: 0;
  color: #667985;
  font-size: 14px;
`;

export const MetricGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const DashboardCard = styled.div`
  position: relative;
  display: flex;
  min-height: 132px;
  align-items: center;
  gap: 18px;
  padding: 22px;
  border: 1px solid rgba(17, 54, 68, 0.08);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(17, 54, 68, 0.07);
  overflow: hidden;
`;

export const DashboardCardBg = styled.img`
  width: 58px;
  height: 58px;
  padding: 13px;
  border-radius: 16px;
  background: #e8f6f4;
`;

export const DashboardCardTittle = styled.div`
  color: #6d7d87;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const DashboardCardData = styled.div`
  margin-top: 8px;
  color: #1b2f3b;
  font-size: 36px;
  font-weight: 800;
  letter-spacing: -0.05em;
`;

export const MetricCopy = styled.div`
  min-width: 0;
`;

export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.75fr) minmax(300px, 1fr);
  gap: 18px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartPanel = styled.section`
  min-width: 0;
  padding: 20px 20px 14px;
  border: 1px solid rgba(17, 54, 68, 0.08);
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 18px 44px rgba(17, 54, 68, 0.07);
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;

export const ChartTitle = styled.h2`
  margin: 0;
  color: #1b2f3b;
  font-size: 17px;
`;

export const ChartDescription = styled.p`
  margin: 5px 0 0;
  color: #81919a;
  font-size: 12px;
`;

export const ChartCanvas = styled.div`
  width: 100%;
  height: 320px;

  @media (max-width: 560px) {
    height: 260px;
  }
`;

export const PieCanvas = styled.div`
  width: 100%;
  height: 320px;
`;

export const CustomTooltipBox = styled.div`
  padding: 10px 12px;
  border: 1px solid #e5edef;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 10px 24px rgba(17, 54, 68, 0.1);

  p {
    margin: 0;
    color: #334e5b;
    font-size: 12px;
  }

  p + p {
    margin-top: 4px;
    color: #0d6b68;
    font-weight: 700;
  }
`;
