import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  height: 100%;
  overflow: hidden;
  border: 1px solid #e8edf0;
  border-radius: 16px;
  background: #fff;
  cursor: pointer;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;

  &:hover,
  &:focus-within {
    transform: translateY(-5px);
    border-color: #d7e5e8;
    box-shadow: 0 16px 34px rgba(24, 53, 68, 0.13);
  }

  .ant-card-cover {
    flex: none;
  }

  .ant-card-cover {
    margin: 0;
  }

  .ant-card-body {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 9px;
    min-height: 0;
    padding: 14px;
    box-sizing: border-box;
  }

  .ant-card-cover img {
    transition: transform 0.3s ease;
  }

  &:hover .ant-card-cover img,
  &:focus-within .ant-card-cover img {
    transform: scale(1.06);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover,
    &:focus-within {
      transform: none;
    }

    img {
      transition: none;
    }
  }
`;

export const ProductImageWrap = styled.div`
  position: relative;
  display: grid;
  height: 218px;
  box-sizing: border-box;
  place-items: center;
  overflow: hidden;
  padding: 18px;
  background: linear-gradient(145deg, #f8fafb 0%, #edf3f5 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  @media (max-width: 560px) {
    height: 190px;
    padding: 12px;
  }

  @media (max-width: 380px) {
    height: 170px;
  }
`;

export const ProductBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 5px 9px;
  border: 1px solid rgba(13, 107, 104, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  color: #0d6b68;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.04em;
  max-width: calc(50% - 20px);
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
`;

export const ProductDiscountBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 5px 8px;
  border-radius: 8px;
  background: #fff0ed;
  color: #d94835;
  font-size: 11px;
  font-weight: 700;
  max-width: calc(50% - 20px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyleNameProduct = styled.div`
  display: -webkit-box;
  min-height: 42px;
  overflow: hidden;
  color: #243b45;
  font-size: 14px;
  font-weight: 650;
  line-height: 1.5;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const WrapperReportText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 18px;
  color: #687b82;
  font-size: 11px;
`;

export const WrapperPriceText = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: auto;
  color: #cd3434;
  font-size: 16px;
  font-weight: 800;

  > span {
    white-space: nowrap;
  }
`;

export const WrapperStyleTextSell = styled.span`
  overflow: hidden;
  color: #829096;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ProductAction = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 7px;
  margin-top: 2px;
  padding: 10px 12px;
  border: 0;
  border-radius: 10px;
  background: #183544;
  color: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  transition:
    background 0.2s ease,
    gap 0.2s ease;

  &:hover {
    gap: 11px;
    background: #0d6b68;
  }

  &:focus-visible {
    outline: 3px solid rgba(13, 107, 104, 0.3);
    outline-offset: 2px;
  }
`;
