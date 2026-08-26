import React, { useEffect, useState } from "react";
import {
  BrandDescription,
  BrandEyebrow,
  BrandMark,
  BrandTitle,
  FieldGroup,
  FieldLabel,
  FormFooter,
  FormSubtitle,
  FormTitle,
  PasswordField,
  SignUpCard,
  SignUpPageWrapper,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { Image } from "antd";
import imageLogin from "../../assets/images/logo-login.png";
import {
  EyeFilled,
  EyeInvisibleFilled,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const mutation = useMutationHooks((data) => UserService.signupUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleNavigateSignIn();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword });
  };

  return (
    <SignUpPageWrapper>
      <SignUpCard>
        <WrapperContainerLeft>
          <BrandEyebrow>Phone Plaza</BrandEyebrow>
          <FormTitle>Tạo tài khoản mới</FormTitle>
          <FormSubtitle>
            Tham gia Phone Plaza để bắt đầu hành trình mua sắm.
          </FormSubtitle>
          <FieldGroup>
            <FieldLabel htmlFor="signup-email">Email</FieldLabel>
            <InputForm
              id="signup-email"
              size="large"
              prefix={<MailOutlined />}
              placeholder="name@example.com"
              value={email}
              onChange={handleOnchangeEmail}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldLabel htmlFor="signup-password">Mật khẩu</FieldLabel>
            <PasswordField>
              <InputForm
                id="signup-password"
                size="large"
                prefix={<LockOutlined />}
                placeholder="Tạo mật khẩu"
                type={isShowPassword ? "text" : "password"}
                value={password}
                onChange={handleOnchangePassword}
              />
              <button
                type="button"
                className="password-toggle"
                aria-label={isShowPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
              </button>
            </PasswordField>
          </FieldGroup>
          <FieldGroup>
            <FieldLabel htmlFor="signup-confirm-password">
              Xác nhận mật khẩu
            </FieldLabel>
            <PasswordField>
              <InputForm
                id="signup-confirm-password"
                size="large"
                prefix={<LockOutlined />}
                placeholder="Nhập lại mật khẩu"
                type={isShowConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleOnchangeConfirmPassword}
              />
              <button
                type="button"
                className="password-toggle"
                aria-label={
                  isShowConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"
                }
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              >
                {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
              </button>
            </PasswordField>
          </FieldGroup>
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isPending={isPending}>
            <ButtonComponent
              isDisabled={
                !email.length || !password.length || !confirmPassword.length
              }
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: "#0d6b68",
                height: "50px",
                width: "100%",
                border: "none",
                borderRadius: "8px",
                margin: "2px 0 20px",
                boxShadow: "0 10px 18px rgba(13, 107, 104, 0.2)",
              }}
              textbutton={"Đăng ký"}
              styletextbutton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </Loading>
          <FormFooter>
            <span>Đã có tài khoản?</span>
            <WrapperTextLight onClick={handleNavigateSignIn}>
              Đăng nhập
            </WrapperTextLight>
          </FormFooter>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <BrandMark>
            <Image
              src={imageLogin}
              preview={false}
              alt="Phone Plaza"
              height="118px"
              width="118px"
            />
          </BrandMark>
          <BrandTitle>Cùng bắt đầu hôm nay</BrandTitle>
          <BrandDescription>
            Tạo tài khoản để lưu sản phẩm yêu thích và nhận ưu đãi mới nhất.
          </BrandDescription>
        </WrapperContainerRight>
      </SignUpCard>
    </SignUpPageWrapper>
  );
};

export default SignUpPage;
