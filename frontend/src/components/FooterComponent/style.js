import styled from "styled-components";

export const ParamFooter = styled.p`
  margin: 0;
  color: #c6d8d6;
  font-size: 13px;
  line-height: 1.7;
  cursor: pointer;
  transition: color 0.18s ease;

  &:hover {
    color: #ffffff;
  }
`;

export const FooterRoot = styled.footer`
  width: 100%;
  margin-top: 36px;
  background: #103d3b;
  color: #ffffff;
`;

export const FooterInner = styled.div`
  width: min(1280px, 100%);
  margin: 0 auto;
  padding: 44px 24px 0;

  @media (max-width: 520px) {
    padding: 34px 18px 0;
  }
`;

export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1.1fr 1fr 1fr;
  gap: 36px;
  padding-bottom: 34px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 30px 24px;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 26px;
  }
`;

export const FooterColumn = styled.section`
  min-width: 0;

  h4 {
    margin: 0 0 16px;
    color: #ffffff;
    font-size: 14px;
    font-weight: 800;
  }

  ${ParamFooter} + ${ParamFooter} {
    margin-top: 8px;
  }
`;

export const FooterColumnStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

export const FooterSubheading = styled.h4`
  margin-top: 25px !important;
`;

export const AssetRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 9px;

  img {
    width: 76px;
    height: 34px;
    padding: 4px;
    border-radius: 6px;
    background: #ffffff;
    object-fit: contain;
  }
`;

export const Hotline = styled.a`
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 9px;
  color: #ffffff;
  font-size: 19px;
  font-weight: 800;
  text-decoration: none;

  &:hover {
    border-color: #ffffff;
    color: #ffffff;
  }
`;

export const FooterNote = styled.p`
  margin: 9px 0 0;
  color: #c6d8d6;
  font-size: 12px;
`;

export const Social = styled.div`
  display: flex;
  gap: 9px;

  a {
    display: grid;
    width: 36px;
    height: 36px;
    place-items: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.08);
    transition:
      background 0.18s ease,
      transform 0.18s ease;
  }

  a:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.16);
  }

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px 24px;
  padding: 17px 0 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  color: #c6d8d6;
  font-size: 12px;

  p {
    margin: 0;
  }

  @media (max-width: 620px) {
    flex-direction: column;
  }
`;
