import styled, { keyframes } from "styled-components";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import bannerBackground from "../../assets/images/banner6.jpg";

export const WrapperBanner = styled.div`
  display: flex;
  width: 100%;
  height: 360px;
  position: relative;
  background-image: url(${bannerBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export const WrapperBannerText = styled.div`
  width: 50%;
  margin-left: 60px;
`;
const moveUpDown = keyframes`
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(20px); 
    }
    100% {
        transform: translateY(0);
    }
`;

export const WrapperBannerImg = styled.div`
  padding-left: 40px;
  animation: ${moveUpDown} 2s ease-in-out infinite;
`;
export const WrapperNews = styled.div`
  width: 31%;
  margin-left: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
`;

export const HeaderNews = styled.div`
  background-color: #f47920;
  color: white;
  font-weight: bold;
  padding: 10px;
`;

export const NewsItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

export const NewsImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

export const NewsContent = styled.div`
  flex: 1;
`;

export const NewsTitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
  cursor: pointer;
  &:hover {
    color: #f18634;
    transition: 0.2s ease;
  }
`;

export const NewsDate = styled.div`
  font-size: 12px;
  color: #999;
`;

export const WrapperTypeProduct = styled.div`
  display: flex;
  margin-left: 100px;
  align-items: center;
  justify-content: flex-start;
`;
export const WrapperSubMenuType = styled.div`
  position: relative;
  padding: 14px 20px;
  cursor: pointer;
  color: #fff;
  &:hover {
    background-color: #f18634;
  }
  &:hover .subMenuType {
    display: block;
  }
`;

export const WrapperType = styled.div`
  position: relative;
  padding: 14px 20px;
  cursor: pointer;
  color: #fff;
  &:hover {
    background-color: #f18634;
  }
`;

export const SubMenuType = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.5);
  list-style: none;
  margin: 0;
  padding: 0;
  min-width: 200px;
  z-index: 10;
  &:hover {
    display: block;
  }
`;

export const WrapperButtonMore = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;
export const ButtonMore = styled(ButtonComponent)`
  width: 100%;
  align-items: center;
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
`;

export const WrapperHeaderProduct = styled.div`
  margin-top: 10px;
  margin-left: 30px;
  margin-right: 30px;
  border: 2px solid #cd1818;
  border-radius: 5px;
`;

export const HeaderProduct = styled.div`
  background-color: #cd1818;
  color: white;
  font-weight: bold;
  padding: 10px;
  position: relative;

  span {
    margin-left: 25px;
    font-size: 18px;
  }
`;

export const WrapperProducts = styled.div`
  display: flex;
  background: #efefef;
  margin-top: 10px;
  margin-left: 5px;
  gap: 10px;
  justify-content: left;
  flex-wrap: wrap;
`;

export const WrapperPromotionImg = styled.div`
  padding-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #efefef;
`;

export const WrapperRowFeature = styled.div`
  padding: 54px 24px 46px;
  border-top: 1px solid #e2ecea;
  border-bottom: 1px solid #e2ecea;
  background: linear-gradient(180deg, #f4f8f7 0%, #edf4f2 100%);

  @media (max-width: 560px) {
    padding: 38px 18px 32px;
  }
`;

export const FeatureSectionInner = styled.div`
  width: min(1280px, 100%);
  margin: 0 auto;
`;

export const FeatureSectionHeading = styled.div`
  margin-bottom: 24px;

  span {
    color: #0d6b68;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  h2 {
    margin: 7px 0 0;
    color: #183544;
    font-size: 23px;
    line-height: 1.3;
  }
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const WrapperFeature = styled.div`
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  align-content: start;
  align-items: center;
  column-gap: 13px;
  min-height: 148px;
  padding: 20px 18px;
  border: 1px solid #e3ecea;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 10px 26px rgba(24, 53, 68, 0.045);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(24, 53, 68, 0.09);
  }

  h3 {
    margin: 0;
    color: #183544;
    font-size: 14px;
    line-height: 1.4;
  }

  p {
    grid-column: 2;
    margin: 7px 0 0;
    color: #687b82;
    font-size: 12px;
    line-height: 1.65;
  }

  @media (max-width: 560px) {
    min-height: 0;
    padding: 16px;
  }
`;

export const FeatureIcon = styled.div`
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 13px;
  background: #eaf5f2;

  img {
    width: 27px;
    height: 27px;
    object-fit: contain;
  }
`;
