import styled from "styled-components";

export const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  border-bottom: 1px solid #e9eff0;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(14px);
`;

export const WrapperHeader = styled.div`
  display: grid;
  grid-template-columns: 210px minmax(220px, 1fr) auto;
  align-items: center;
  gap: 28px;
  width: min(1280px, 100%);
  min-height: 82px;
  margin: 0 auto;
  padding: 12px 24px;

  @media (max-width: 780px) {
    grid-template-columns: 1fr auto;
    gap: 12px 18px;
    padding: 12px 18px;
  }

  @media (max-width: 480px) {
    padding: 10px 14px;
  }
`;

export const WrapperLogoHeader = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;

  img {
    display: block;
    width: 172px;
    max-width: 100%;
    height: 54px;
    object-fit: contain;
  }

  @media (max-width: 480px) {
    img {
      width: 138px;
      height: 44px;
    }
  }
`;

export const HeaderSearch = styled.div`
  min-width: 0;

  > div {
    width: 100%;
  }

  .ant-input-affix-wrapper,
  .ant-input {
    height: 44px;
    border-color: #dce7e8;
    border-radius: 11px 0 0 11px !important;
    box-shadow: none;
  }

  .ant-input:focus,
  .ant-input-affix-wrapper-focused {
    border-color: #0d6b68;
    box-shadow: 0 0 0 2px rgba(13, 107, 104, 0.1);
  }

  .ant-btn {
    height: 44px;
    border-radius: 0 11px 11px 0 !important;
    padding: 0 18px !important;
    background: #0d6b68 !important;
    border-color: #0d6b68 !important;
  }

  @media (max-width: 780px) {
    grid-column: 1 / -1;
    grid-row: 2;
  }

  @media (max-width: 480px) {
    .ant-btn {
      padding: 0 14px !important;
    }
  }
`;

export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  color: #203640;
  font-size: 13px;
  font-weight: 700;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 22px;

  @media (max-width: 780px) {
    gap: 16px;
  }

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

export const AccountTrigger = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  max-width: 175px;
  min-height: 42px;
  padding: 4px 10px 4px 5px;
  border: 1px solid transparent;
  border-radius: 12px;
  color: #203640;
  cursor: pointer;
  transition:
    background 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    border-color: #e6eeee;
    background: #f6faf9;
  }

  @media (max-width: 480px) {
    max-width: 46px;
    padding-right: 5px;
  }
`;

export const AccountAvatar = styled.img`
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  border: 2px solid #e6f1ef;
  border-radius: 50%;
  object-fit: cover;
`;

export const AccountFallback = styled.span`
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  place-items: center;
  border-radius: 50%;
  background: #e8f6f4;
  color: #0d6b68;
  font-size: 17px;
`;

export const AccountName = styled.span`
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const WrapperTextHeaderSmall = styled.span`
  color: #314650;
  font-weight: 700;
  font-size: 13px;
  white-space: nowrap;
`;

export const LoginButton = styled.button`
  min-height: 40px;
  padding: 0 14px;
  border: 1px solid #c8ddda;
  border-radius: 11px;
  background: #ffffff;
  color: #0d6b68;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;

  &:hover {
    background: #f0f8f7;
  }
`;

export const CartButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  min-height: 42px;
  padding: 0 12px;
  border: 1px solid #e5eeee;
  border-radius: 12px;
  background: #ffffff;
  color: #203640;
  cursor: pointer;
  transition:
    background 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    border-color: #c8ddda;
    background: #f6faf9;
  }

  .anticon {
    color: #0d6b68;
    font-size: 21px;
  }

  @media (max-width: 480px) {
    width: 42px;
    justify-content: center;
    padding: 0;

    .header-cart-label {
      display: none;
    }
  }
`;

export const WrapperContentPopover = styled.p`
  margin: 0;
  padding: 10px 12px;
  border-radius: 8px;
  color: #314650;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #f0f8f7;
    color: #0d6b68;
  }
`;
