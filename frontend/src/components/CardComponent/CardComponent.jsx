import React from "react";
import {
  ProductAction,
  ProductBadge,
  ProductDiscountBadge,
  ProductImageWrap,
  StyleNameProduct,
  WrapperCardStyle,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
} from "./style";
import { ArrowRightOutlined, StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { convertPrice } from "../../utils";

const CardComponent = (props) => {
  const {
    countInStock,
    image,
    name,
    price,
    rating,
    type,
    discount,
    selled,
    id,
  } = props;
  const navigate = useNavigate();
  const handleDetailsProduct = (id) => {
    navigate(`/product-details/${id}`);
  };
  const discountPercent = discount || 5;

  return (
    <WrapperCardStyle
      hoverable
      cover={
        <ProductImageWrap>
          <img alt={name} src={image} loading="lazy" />
          <ProductBadge>{type || "Điện thoại"}</ProductBadge>
          <ProductDiscountBadge>Giảm {discountPercent}%</ProductDiscountBadge>
        </ProductImageWrap>
      }
      onClick={() => handleDetailsProduct(id)}
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span>
          <StarFilled style={{ fontSize: "12px", color: "#f5b400" }} />{" "}
          {Number(rating) > 0 ? Number(rating).toFixed(1) : "Mới"}
        </span>
        <WrapperStyleTextSell>Đã bán {selled || 0}</WrapperStyleTextSell>
        {countInStock > 0 && (
          <WrapperStyleTextSell>• Còn hàng</WrapperStyleTextSell>
        )}
      </WrapperReportText>
      <WrapperPriceText>
        {convertPrice(price)}
      </WrapperPriceText>
      <ProductAction
        type="button"
        aria-label={`Xem chi tiết ${name}`}
        onClick={(event) => {
          event.stopPropagation();
          handleDetailsProduct(id);
        }}
      >
        Xem chi tiết <ArrowRightOutlined />
      </ProductAction>
    </WrapperCardStyle>
  );
};

export default CardComponent;
