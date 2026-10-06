import React, { useEffect, useState } from "react";
import {
  ArticleBody,
  ArticleCard,
  ArticleCategory,
  ArticleDate,
  ArticleExcerpt,
  ArticleImage,
  ArticleImageFrame,
  ArticleMeta,
  ArticleTitle,
  Breadcrumb,
  ContentSection,
  FeaturedCopy,
  FeaturedImage,
  FeaturedImageFrame,
  FeaturedLabel,
  FeaturedStory,
  Intro,
  IntroEyebrow,
  IntroTitle,
  LeadLayout,
  NewsGrid,
  NewsPageShell,
  PageContent,
  SectionHeading,
  SideStory,
  SideStoryImage,
  SideStoryText,
  TopicLabel,
} from "./style";
import {
  SubMenuType,
  WrapperSubMenuType,
  WrapperType as HomeMenuItem,
  WrapperTypeProduct,
} from "../HomePage/style";
import iconMenu1 from "../../assets/images/icons8-home-24.png";
import iconMenu2 from "../../assets/images/icons8-phone-case-50.png";
import iconMenu3 from "../../assets/images/icons8-sort-down-24.png";
import iconMenu4 from "../../assets/images/icons8-news-30.png";
import imgNews1 from "../../assets/images/samsung-galaxy-z-flip6-didongmy.jpg";
import imgNews2 from "../../assets/images/km apple.jpg";
import imgNews3 from "../../assets/images/km samsung.jpg";
import imgNews4 from "../../assets/images/km phu kien.jpg";
import imgListNews1 from "../../assets/images/thumuasac.jpg";
import imgListNews2 from "../../assets/images/listnews2.jpg";
import imgListNews3 from "../../assets/images/listnews3.png";
import imgListNews4 from "../../assets/images/listnews4.jpg";
import imgListNews5 from "../../assets/images/listnews5.png";
import imgListNews6 from "../../assets/images/listnews6.png";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { useNavigate } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const articles = [
  {
    image: imgListNews1,
    category: "Ưu đãi",
    title: "Thu sạc cũ đổi sạc mới, tiết kiệm tới 500.000đ",
    excerpt:
      "Những chiếc củ, cáp sạc cũ, hỏng, hàng nhái,... chưa bao giờ có giá trị đến thế khi tham gia chương trình “Thu sạc cũ, đổi sạc mới” của Tablet Plaza. Quý khách chỉ cần mang chúng qua hệ thống cửa hàng Tablet Plaza trên toàn quốc để được đổi sang chiếc củ,",
    date: "10/04/2026",
  },
  {
    image: imgListNews2,
    category: "Phụ kiện",
    title: "Miếng Dán Màn Hình Kaizen: Sự Bảo Vệ Tối Ưu Cho Điện Thoại Của Bạn",
    excerpt:
      'Bạn đang tìm kiếm một giải pháp hoàn hảo để bảo vệ chiếc smartphone của mình mà không làm mất đi vẻ đẹp của thiết bị? Hãy để chúng tôi giới thiệu đến bạn miếng dán màn hình Kaizen - "Siêu Đỉnh" đến từ Tablet Plaza!',
    date: "19/09/2026",
  },
  {
    image: imgListNews3,
    category: "Khuyến mãi",
    title: "Mua sắm cuối tuần, tưng bừng hàng rẻ",
    excerpt:
      "Nếu như giữa tuần mải mê với công việc mà bỏ lỡ những deal to, khuyến mãi lớn thì nhớ lên lịch “quẹo lựa” đến Tablet Plaza để có cơ hội sở hữu các sản phẩm cực xịn mà giá siêu tiết kiệm. Tablet Plaza đang có chương trình săn sale cuối tuần với vô vàn deal",
    date: "05/02/2026",
  },
  {
    image: imgListNews4,
    category: "Sự kiện",
    title:
      "Cách xem trực tiếp sự kiện Galaxy Unpacked 2026 ra mắt Galaxy S24 Series",
    excerpt:
      "Samsung sẽ giới thiệu dòng Galaxy S24 mới trong sự kiện Galaxy Unpacked 2026 diễn ra 1h sáng ngày 18/1. Samsung sẽ tổ chức sự kiện Unpacked 2026 ra mắt điện thoại Galaxy mới vào 1h sáng ngày 18/1 tại trung tâm SAP, San Jos",
    date: "17/01/2026",
  },
  {
    image: imgListNews5,
    category: "Khuyến mãi",
    title: "Giờ vàng giá sốc 26.06",
    excerpt:
      "Cùng Phone Plaza đón Siêu Sale “Giờ Vàng Giá Sốc” với hàng loạt ưu đãi dành cho các sản phẩm điện thoại Apple, Samsung, Laptop, máy tính bảng, đồng hồ thông minh, phụ kiện. Ngày 26.06.2023 hãy nhanh chân đến Tablet Plaza gần bạn để sở hữu ngay",
    date: "05/08/2026",
  },
  {
    image: imgListNews6,
    category: "Khuyến mãi",
    title: "Săn sale cuối tuần – tưng bừng giá tốt",
    excerpt:
      "Đến Phone Plaza săn sale cuối tuần với hàng loạt ưu đãi dành tặng cho khách hàng.",
    date: "05/02/2026",
  },
];

const NewsPage = () => {
  const navigate = useNavigate();
  const [typeProducts, setTypeProducts] = useState([]);

  const handleNavigateNews = () => {
    navigate("/news");
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  return (
    <NewsPageShell>
      <div style={{ width: "100%", margin: "0 auto", background: "#183544" }}>
        <WrapperTypeProduct>
          <HomeMenuItem onClick={() => navigate("/")}>
            <img
              style={{
                width: "18px",
                height: "18px",
                position: "absolute",
                left: "3px",
                top: "13px",
              }}
              src={iconMenu1}
              alt="iconMenu1"
            />
            <span style={{ paddingLeft: "5px" }}>Trang Chủ</span>
          </HomeMenuItem>
          <WrapperSubMenuType>
            <img
              style={{
                width: "16px",
                height: "16px",
                position: "absolute",
                left: "3px",
                top: "13px",
              }}
              src={iconMenu2}
              alt="iconMenu2"
            />
            <span style={{ paddingLeft: "5px" }}>Điện Thoại</span>
            <img
              style={{
                width: "22px",
                height: "22px",
                position: "absolute",
                right: "0",
                top: "10px",
              }}
              src={iconMenu3}
              alt="iconMenu3"
            />
            <SubMenuType className="subMenuType">
              {typeProducts.map((item) => (
                <TypeProduct name={item} key={item} />
              ))}
            </SubMenuType>
          </WrapperSubMenuType>
          <HomeMenuItem onClick={handleNavigateNews}>
            <img
              style={{
                width: "16px",
                height: "16px",
                position: "absolute",
                left: "3px",
                top: "13px",
              }}
              src={iconMenu4}
              alt="iconMenu4"
            />
            <span style={{ paddingLeft: "5px" }}>Tin Tức</span>
          </HomeMenuItem>
        </WrapperTypeProduct>
      </div>

      <PageContent>
        <Breadcrumb>
          Trang chủ <span>/</span> Tin tức
        </Breadcrumb>
        <Intro>
          <IntroEyebrow>Tạp chí công nghệ</IntroEyebrow>
          <IntroTitle>Tin mới, chọn đúng.</IntroTitle>
          <p>Cập nhật công nghệ, mẹo hay và ưu đãi đáng chú ý dành cho bạn.</p>
        </Intro>

        <LeadLayout>
          <FeaturedStory>
            <FeaturedImageFrame>
              <FeaturedImage
                src={imgNews1}
                alt="Samsung Galaxy Z Fold6 và Z Flip6"
              />
              <FeaturedLabel>Tâm điểm công nghệ</FeaturedLabel>
            </FeaturedImageFrame>
            <FeaturedCopy>
              <ArticleMeta>
                <ArticleCategory>Thiết bị mới</ArticleCategory>
                <ArticleDate>06/01/2026</ArticleDate>
              </ArticleMeta>
              <ArticleTitle className="featured-title">
                Mua Samsung Galaxy Z Fold6 và Z Flip6 ở đâu?
              </ArticleTitle>
              <ArticleExcerpt>
                Z Flip 6 được đồn đoán với những sắc màu mới như Mint, bạc và
                vàng. Cùng khám phá thiết kế, màu sắc và những điểm đáng chú ý
                trên bộ đôi gập mới của Samsung.
              </ArticleExcerpt>
            </FeaturedCopy>
          </FeaturedStory>

          <aside aria-label="Tin nổi bật">
            <SectionHeading>
              <span>Đang được quan tâm</span>
              <i />
            </SectionHeading>
            <SideStory>
              <SideStoryImage src={imgNews2} alt="Chương trình ưu đãi Apple" />
              <SideStoryText>
                <ArticleCategory>Ưu đãi Apple</ArticleCategory>
                <strong>Ưu đãi dành riêng cho tín đồ Apple</strong>
              </SideStoryText>
            </SideStory>
            <SideStory>
              <SideStoryImage
                src={imgNews3}
                alt="Chương trình ưu đãi Samsung"
              />
              <SideStoryText>
                <ArticleCategory>Ưu đãi Samsung</ArticleCategory>
                <strong>Chọn Galaxy mới, nhận quà hấp dẫn</strong>
              </SideStoryText>
            </SideStory>
            <SideStory>
              <SideStoryImage src={imgNews4} alt="Ưu đãi phụ kiện điện thoại" />
              <SideStoryText>
                <ArticleCategory>Phụ kiện</ArticleCategory>
                <strong>Nâng cấp phụ kiện, trọn trải nghiệm</strong>
              </SideStoryText>
            </SideStory>
          </aside>
        </LeadLayout>

        <ContentSection>
          <SectionHeading className="articles-heading">
            <div>
              <IntroEyebrow>Đọc và khám phá</IntroEyebrow>
              <h2>Tin tức mới nhất</h2>
            </div>
            <TopicLabel>
              Góc nhìn công nghệ <span>•</span> Mua sắm thông minh
            </TopicLabel>
          </SectionHeading>
          <NewsGrid>
            {articles.map((article) => (
              <ArticleCard key={article.title}>
                <ArticleImageFrame>
                  <ArticleImage
                    src={article.image}
                    alt={article.title}
                    loading="lazy"
                  />
                </ArticleImageFrame>
                <ArticleBody>
                  <ArticleMeta>
                    <ArticleCategory>{article.category}</ArticleCategory>
                    <ArticleDate>{article.date}</ArticleDate>
                  </ArticleMeta>
                  <ArticleTitle>{article.title}</ArticleTitle>
                  <ArticleExcerpt>{article.excerpt}</ArticleExcerpt>
                </ArticleBody>
              </ArticleCard>
            ))}
          </NewsGrid>
        </ContentSection>
      </PageContent>
      <FooterComponent />
    </NewsPageShell>
  );
};

export default NewsPage;
