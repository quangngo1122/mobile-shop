import { Rate } from "antd";
import React, { useEffect, useState } from "react";
import imageProductSmall1 from "../../assets/images/iphone-16-pro-max-2.webp";
import imageProductSmall2 from "../../assets/images/iphone-16-pro-max-3.webp";
import imageProductSmall3 from "../../assets/images/iphone-16-pro-max-4.webp";
import imageProductSmall4 from "../../assets/images/iphone-16-pro-max-5.webp";
import imageProductSmall5 from "../../assets/images/iphone-16-pro-max-6.webp";
import imageProductSmall6 from "../../assets/images/iphone-16-pro-max-7.webp";
import {
  CommentsSection,
  DescriptionLabel,
  ErrorLimit,
  MainProductImage,
  ProductDetailsShell,
  ProductGallery,
  ProductInfo,
  ProductMeta,
  ProductThumbnailList,
  PurchasePanel,
  QuantityButton,
  QuantityLabel,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleColImage,
  WrapperStyleDescription,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  BuyButton,
} from "./style";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct, resetOrder } from "../../redux/slides/orderSlide";
import { convertPrice, initFacebookSDK } from "../../utils";
import * as message from "../Message/Message";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";

const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const onChange = (value) => {
    const numericValue = Number(value);
    if (numericValue >= 1 && numericValue <= 50) {
      setNumProduct(numericValue);
    }
  };

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);

  useEffect(() => {
    const orderRedux = order?.orderItems?.find(
      (item) => item.product === productDetails?._id,
    );
    if (
      orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
      (!orderRedux && productDetails?.countInStock > 0)
    ) {
      setErrorLimitOrder(false);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [numProduct]);

  useEffect(() => {
    if (order.isSucessOrder) {
      message.success("Đã thêm vào giỏ hàng");
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order.isSucessOrder]);

  const handleChangeCount = (type) => {
    if (type === "increase") {
      if (numProduct < 50) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (numProduct > 1) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  const { isPending, data: productDetails } = useQuery({
    queryKey: ["product-details", idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct,
  });

  const handleAddOrderProduct = () => {
    if (!user.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      const orderRedux = order?.orderItems?.find(
        (item) => item.product === productDetails?._id,
      );
      if (
        orderRedux?.amount + numProduct <= orderRedux?.countInstock ||
        (!orderRedux && productDetails?.countInStock > 0)
      ) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInstock: productDetails?.countInStock,
            },
          }),
        );
      } else {
        setErrorLimitOrder(true);
      }
    }
  };

  return (
    <Loading isPending={isPending}>
      <ProductDetailsShell>
        <ProductGallery>
          <MainProductImage
            src={productDetails?.image}
            alt={productDetails?.name || "Sản phẩm"}
          />
          <ProductThumbnailList>
            {[
              imageProductSmall1,
              imageProductSmall2,
              imageProductSmall3,
              imageProductSmall4,
              imageProductSmall5,
              imageProductSmall6,
            ].map((image, index) => (
              <WrapperStyleColImage key={image}>
                <WrapperStyleImageSmall
                  src={image}
                  alt={`Ảnh sản phẩm ${index + 1}`}
                />
              </WrapperStyleColImage>
            ))}
          </ProductThumbnailList>
        </ProductGallery>
        <ProductInfo>
          <WrapperStyleNameProduct>
            {productDetails?.name}
          </WrapperStyleNameProduct>
          <ProductMeta>
            <Rate allowHalf value={productDetails?.rating} />
            <WrapperStyleTextSell>
              Đã bán {productDetails?.selled || 0}
            </WrapperStyleTextSell>
          </ProductMeta>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              {convertPrice(productDetails?.price)}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <DescriptionLabel>Mô tả sản phẩm</DescriptionLabel>
          <WrapperStyleDescription>
            {productDetails?.description}
          </WrapperStyleDescription>
          <LikeButtonComponent
            dataHref={"https://developers.facebook.com/docs/plugins/"}
          />
          <PurchasePanel>
            <QuantityLabel>Số lượng</QuantityLabel>
            <WrapperQualityProduct>
              <QuantityButton
                type="button"
                aria-label="Giảm số lượng"
                onClick={() => handleChangeCount("decrease")}
              >
                <MinusOutlined />
              </QuantityButton>
              <WrapperInputNumber
                onChange={onChange}
                defaultValue={1}
                min={1}
                max={productDetails?.countInStock}
                value={numProduct}
                size="small"
              />
              <QuantityButton
                type="button"
                aria-label="Tăng số lượng"
                onClick={() => handleChangeCount("increase")}
              >
                <PlusOutlined />
              </QuantityButton>
            </WrapperQualityProduct>
            <BuyButton type="button" onClick={handleAddOrderProduct}>
              Chọn mua
            </BuyButton>
            {errorLimitOrder && <ErrorLimit>Sản phẩm đã hết hàng</ErrorLimit>}
          </PurchasePanel>
        </ProductInfo>
        <CommentsSection>
          <CommentComponent
            dataHref={
              "https://developers.facebook.com/docs/plugins/comments#configurator"
            }
            width="1000"
          />
        </CommentsSection>
      </ProductDetailsShell>
    </Loading>
  );
};

export default ProductDetailsComponent;
