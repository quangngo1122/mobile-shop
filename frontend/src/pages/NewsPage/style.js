import styled from "styled-components";

export const NewsPageShell = styled.main`
  --news-ink: #17252d;
  --news-muted: #718087;
  --news-line: #e4e9e8;
  --news-accent: #e65f35;
  background: #f7f8f5;
  color: var(--news-ink);
  min-height: 100vh;
`;

export const TopicBar = styled.nav`
  background: #17252d;
  color: #fff;
`;

export const TopicBarInner = styled.div`
  width: min(1180px, calc(100% - 48px));
  min-height: 52px;
  margin: 0 auto;
  display: flex;
  align-items: stretch;
  gap: 8px;
`;

export const TypeMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 17px;
  color: #d7dedf;
  font-size: 13px;
  cursor: pointer;
  transition:
    background 160ms ease,
    color 160ms ease;

  svg {
    width: 16px;
    height: 16px;
  }
  &:hover,
  &.active {
    color: #fff;
    background: #263942;
  }
  &.active::after {
    content: "";
    position: absolute;
    right: 16px;
    bottom: 0;
    left: 16px;
    height: 2px;
    background: #ee754f;
  }
`;

export const TypeDropdown = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  > ${TypeMenu} {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 5;
    min-width: 220px;
    padding: 8px;
    background: #fff;
    box-shadow: 0 10px 26px rgba(18, 34, 40, 0.16);
  }
  &:hover > ${TypeMenu}, &:focus-within > ${TypeMenu} {
    display: block;
  }
`;

export const TypeMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 17px;
  color: #d7dedf;
  font-size: 13px;
  cursor: pointer;
  svg {
    width: 16px;
    height: 16px;
  }
  .chevron {
    width: 14px;
    height: 14px;
    margin-left: 2px;
  }
  &:hover {
    color: #fff;
    background: #263942;
  }
`;

export const PageContent = styled.div`
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
`;

export const Breadcrumb = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 24px;
  color: #7c898d;
  font-size: 12px;
  span {
    color: #c4ccca;
  }
`;

export const Intro = styled.header`
  padding: 34px 0 30px;
  p {
    margin: 8px 0 0;
    color: var(--news-muted);
    font-size: 15px;
    line-height: 1.6;
  }
`;

export const IntroEyebrow = styled.div`
  color: var(--news-accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
`;

export const IntroTitle = styled.h1`
  margin: 8px 0 0;
  color: var(--news-ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 54px;
  font-weight: 500;
  line-height: 1.05;
  letter-spacing: 0;
  @media (max-width: 560px) {
    font-size: 38px;
  }
`;

export const LeadLayout = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.75fr) minmax(260px, 0.8fr);
  gap: 34px;
  padding: 24px;
  border: 1px solid var(--news-line);
  background: #fff;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 16px;
  }
`;

export const FeaturedStory = styled.article`
  min-width: 0;
`;

export const FeaturedImageFrame = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 8.8;
  background: #e5e9e8;
`;

export const FeaturedImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms ease;
  ${FeaturedStory}:hover & {
    transform: scale(1.025);
  }
`;

export const FeaturedLabel = styled.span`
  position: absolute;
  left: 16px;
  bottom: 16px;
  padding: 8px 11px;
  background: #e65f35;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.7px;
  text-transform: uppercase;
`;

export const FeaturedCopy = styled.div`
  padding: 20px 2px 2px;
  .featured-title {
    max-width: 650px;
    margin: 12px 0 10px;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 34px;
    line-height: 1.14;
  }
  @media (max-width: 560px) {
    .featured-title {
      font-size: 27px;
    }
  }
`;

export const ArticleMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 20px;
`;

export const ArticleCategory = styled.span`
  color: #d95532;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.65px;
  text-transform: uppercase;
`;

export const ArticleDate = styled.span`
  color: #899397;
  font-size: 11px;
  &::before {
    content: "";
    display: inline-block;
    width: 3px;
    height: 3px;
    margin: 0 10px 3px 0;
    border-radius: 50%;
    background: #aab3b3;
  }
`;

export const ArticleTitle = styled.h3`
  margin: 10px 0 8px;
  color: #1d2a31;
  font-size: 17px;
  font-weight: 650;
  line-height: 1.35;
  letter-spacing: 0;
`;

export const ArticleExcerpt = styled.p`
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: #758186;
  font-size: 13px;
  line-height: 1.65;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

export const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin: 2px 0 16px;
  color: #25343b;
  font-size: 13px;
  font-weight: 700;
  i {
    flex: 1;
    height: 1px;
    background: var(--news-line);
  }
  &.articles-heading {
    align-items: flex-end;
    margin-bottom: 22px;
  }
  &.articles-heading h2 {
    margin: 6px 0 0;
    font-family: Georgia, "Times New Roman", serif;
    font-size: 30px;
    font-weight: 500;
    line-height: 1.15;
  }
  @media (max-width: 560px) {
    align-items: flex-start;
    &.articles-heading {
      align-items: flex-start;
      flex-direction: column;
    }
  }
`;

export const SideStory = styled.article`
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: 13px;
  align-items: center;
  padding: 13px 0;
  border-bottom: 1px solid var(--news-line);
  &:last-child {
    border-bottom: 0;
  }
`;

export const SideStoryImage = styled.img`
  display: block;
  width: 104px;
  aspect-ratio: 1.55;
  object-fit: cover;
  background: #e5e9e8;
`;

export const SideStoryText = styled.div`
  display: grid;
  gap: 5px;
  strong {
    color: #26343a;
    font-size: 13px;
    font-weight: 650;
    line-height: 1.4;
  }
`;

export const ContentSection = styled.section`
  padding: 52px 0 64px;
`;

export const TopicLabel = styled.div`
  color: #7c898d;
  font-size: 12px;
  font-weight: 500;
  span {
    margin: 0 7px;
    color: #e65f35;
  }
`;

export const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 30px 22px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const ArticleCard = styled.article`
  min-width: 0;
  border-bottom: 1px solid var(--news-line);
  padding-bottom: 19px;
  &:hover img {
    transform: scale(1.04);
  }
  &:hover h3 {
    color: #d95532;
  }
`;

export const ArticleImageFrame = styled.div`
  overflow: hidden;
  aspect-ratio: 1.72;
  background: #e5e9e8;
`;

export const ArticleImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 350ms ease;
`;

export const ArticleBody = styled.div`
  padding: 16px 2px 0;
`;
