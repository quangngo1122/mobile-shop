import React from "react";
import {
  AssetRow,
  FooterBottom,
  FooterColumn,
  FooterColumnStack,
  FooterGrid,
  FooterInner,
  FooterNote,
  FooterRoot,
  FooterSubheading,
  Hotline,
  ParamFooter,
  Social,
} from "./style";
import paypal from "../../assets/images/paypal.png";
import ghtk from "../../assets/images/ghtk.png";
import gojek from "../../assets/images/gojek.webp";
import facebookicon from "../../assets/images/facebookicon.png";
import tiktokicon from "../../assets/images/tiktokicon.png";
import youtubeicon from "../../assets/images/youtubeicon.png";
import instagramicon from "../../assets/images/instagramicon.png";

const FooterComponent = () => {
  return (
    <FooterRoot>
      <FooterInner>
        <FooterGrid>
          <FooterColumn>
            <h4>Hỗ trợ - dịch vụ</h4>
            <FooterColumnStack>
              <ParamFooter>Hướng dẫn mua hàng</ParamFooter>
              <ParamFooter>Chính sách bảo mật</ParamFooter>
              <ParamFooter>Chính sách đổi mới và bảo hành</ParamFooter>
            </FooterColumnStack>
          </FooterColumn>

          <FooterColumn>
            <h4>Thông tin liên hệ</h4>
            <FooterColumnStack>
              <ParamFooter>Chăm sóc khách hàng</ParamFooter>
              <ParamFooter>Tra cứu bảo hành</ParamFooter>
              <ParamFooter>Dịch vụ sửa chữa</ParamFooter>
            </FooterColumnStack>
          </FooterColumn>

          <FooterColumn>
            <h4>Thanh toán</h4>
            <AssetRow>
              <img src={paypal} alt="PayPal" />
            </AssetRow>
            <FooterSubheading>Hình thức vận chuyển</FooterSubheading>
            <AssetRow>
              <img src={ghtk} alt="Giao Hàng Tiết Kiệm" />
              <img src={gojek} alt="Gojek" />
            </AssetRow>
          </FooterColumn>

          <FooterColumn>
            <h4>Tổng đài</h4>
            <Hotline href="tel:19006868">1900.6868</Hotline>
            <FooterNote>(Từ 8h30 - 21h30)</FooterNote>
            <FooterSubheading>Kết nối với chúng tôi</FooterSubheading>
            <Social>
              <a href="/" aria-label="Facebook">
                <img src={facebookicon} alt="" />
              </a>
              <a href="/" aria-label="TikTok">
                <img src={tiktokicon} alt="" />
              </a>
              <a href="/" aria-label="YouTube">
                <img src={youtubeicon} alt="" />
              </a>
              <a href="/" aria-label="Instagram">
                <img src={instagramicon} alt="" />
              </a>
            </Social>
          </FooterColumn>
        </FooterGrid>

        <FooterBottom>
          <p>
            Địa chỉ: thành phố Cần Thơ, Việt Nam. Điện thoại: 0339870093. Chịu
            trách nhiệm nội dung: Ngô Minh Quang.
          </p>
          <p>&copy; {new Date().getFullYear()} Ngô Minh Quang.</p>
        </FooterBottom>
      </FooterInner>
    </FooterRoot>
  );
};

export default FooterComponent;
