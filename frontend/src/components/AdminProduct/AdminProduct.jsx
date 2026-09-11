import React, { useEffect, useRef, useState } from "react";
import {
  AddButton,
  AdminProductPage,
  CustomFormRow,
  CustomLabel,
  DoubleFieldRow,
  FormActionRow,
  FormCard,
  FormInputWrapper,
  FormGrid,
  FullSpan,
  HeaderContent,
  HeaderRow,
  HeaderSubtitle,
  ModalActionButton,
  PageShell,
  PreviewImage,
  PrimaryButton,
  RequiredMark,
  StatCard,
  StatLabel,
  StatValue,
  TableBody,
  TableHeader,
  TablePanel,
  TableTitle,
  TopStats,
  UploadPreview,
  WrapperHeader,
  WrapperUploadFile,
} from "./style";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Select, Space } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64, renderOptions } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import { useSelector } from "react-redux";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);
  const initialState = () => ({
    name: "",
    image: "",
    price: "",
    type: "",
    countInStock: "",
    rating: "",
    description: "",
    newType: "",
    discount: "",
  });

  const [stateProduct, setStateProduct] = useState(initialState());
  const [stateProductDetails, setStateProductDetails] =
    useState(initialState());
  const [form] = Form.useForm();

  const mutation = useMutationHooks((data) => {
    const {
      name,
      price,
      type,
      countInStock,
      rating,
      description,
      image,
      discount,
    } = data;
    const res = ProductService.createProduct({
      name,
      price,
      type,
      countInStock,
      rating,
      description,
      image,
      discount,
    });
    return res;
  });

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    return ProductService.updateProduct(id, token, { ...rests });
  });

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    return ProductService.deleteProduct(id, token);
  });

  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    return ProductService.deleteManyProduct(ids, token);
  });

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const fetchGetDetailsProduct = async (rowId) => {
    const res = await ProductService.getDetailsProduct(rowId);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        image: res?.data?.image,
        price: res?.data?.price,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        rating: res?.data?.rating,
        description: res?.data?.description,
        discount: res?.data?.discount,
      });
    }
    setIsPendingUpdate(false);
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.setFieldsValue(stateProductDetails);
    } else {
      form.setFieldsValue(initialState());
    }
  }, [form, stateProductDetails, isModalOpen]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsPendingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  const handleDetailsProduct = () => {
    setIsOpenDrawer(true);
  };

  const handleDeleteManyProducts = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      },
    );
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    return res;
  };

  const { data, isPending, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isPending: isPendingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isPending: isPendingDeleted,
    isSuccess: isSuccessDelected,
    isError: isErrorDeleted,
  } = mutationDeleted;
  const {
    data: dataDeletedMany,
    isPending: isPendingDeletedMany,
    isSuccess: isSuccessDelectedMany,
    isError: isErrorDeletedMany,
  } = mutationDeletedMany;

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const typeProduct = useQuery({
    queryKey: ["type-product"],
    queryFn: fetchAllTypeProduct,
  });
  const { isPending: isPendingProducts, data: products } = queryProduct;

  const renderAction = () => {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <DeleteOutlined
          style={{ color: "#ef5350", fontSize: "22px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ color: "#f59e0b", fontSize: "22px", cursor: "pointer" }}
          onClick={handleDetailsProduct}
        />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
  };
  const handleReset = (clearFilters) => {
    clearFilters();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Xóa
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Giá",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        { text: ">= 50", value: ">=" },
        { text: "<= 50", value: "<=" },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record.price >= 50;
        }
        return record.price <= 50;
      },
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        { text: ">= 3", value: ">=" },
        { text: "<= 3", value: "<=" },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return Number(record.rating) >= 3;
        }
        return Number(record.rating) <= 3;
      },
    },
    { title: "Loại", dataIndex: "type", ...getColumnSearchProps("type") },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      ...getColumnSearchProps("discount"),
    },
    { title: "Thao tác", dataIndex: "action", render: renderAction },
  ];

  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return { ...product, key: product._id };
    });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessDelectedMany && dataDeletedMany?.status === "OK") {
      message.success();
    } else if (isErrorDeletedMany) {
      message.error();
    }
  }, [isSuccessDelectedMany]);

  useEffect(() => {
    if (isSuccessDelected && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDelected]);

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      image: "",
      price: "",
      type: "",
      countInStock: "",
      rating: "",
      description: "",
      discount: "",
      newType: "",
    });
    form.resetFields();
  };

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };

  const handleDeleteProduct = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      },
    );
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      image: "",
      price: "",
      type: "",
      countInStock: "",
      rating: "",
      description: "",
      discount: "",
      newType: "",
    });
    form.resetFields();
  };

  const onFinish = () => {
    const params = {
      name: stateProduct.name,
      image: stateProduct.image,
      price: stateProduct.price,
      type:
        stateProduct.type === "add_type"
          ? stateProduct.newType
          : stateProduct.type,
      countInStock: stateProduct.countInStock,
      rating: stateProduct.rating,
      description: stateProduct.description,
      discount: stateProduct.discount,
    };
    mutation.mutate(params, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };

  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateProductDetails },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      },
    );
  };

  const handleChangeSelect = (value) => {
    setStateProduct({
      ...stateProduct,
      type: value,
    });
  };

  return (
    <AdminProductPage>
      <PageShell>
        <HeaderRow>
          <HeaderContent>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <HeaderSubtitle>
              Theo dõi, quản lý và cập nhật danh mục sản phẩm nhanh chóng.
            </HeaderSubtitle>
          </HeaderContent>
          <AddButton onClick={() => setIsModalOpen(true)}>
            + Thêm sản phẩm
          </AddButton>
        </HeaderRow>

        <TopStats>
          <StatCard>
            <StatLabel>Tổng sản phẩm</StatLabel>
            <StatValue>{products?.data?.length || 0}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Danh mục</StatLabel>
            <StatValue>{typeProduct?.data?.data?.length || 0}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Trạng thái</StatLabel>
            <StatValue>Live</StatValue>
          </StatCard>
        </TopStats>

        <TablePanel>
          <TableHeader>
            <TableTitle>Danh sách sản phẩm</TableTitle>
          </TableHeader>
          <TableBody>
            <TableComponent
              handleDeleteMany={handleDeleteManyProducts}
              columns={columns}
              isPending={isPendingProducts}
              data={dataTable}
              onRow={(record) => ({
                onClick: () => {
                  setRowSelected(record._id);
                },
              })}
            />
          </TableBody>
        </TablePanel>
      </PageShell>

      <ModalComponent
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={900}
      >
        <Loading isPending={isPending}>
          <FormCard>
            <Form
              name="basic"
              onFinish={onFinish}
              autoComplete="on"
              form={form}
              layout="horizontal"
            >
              <CustomFormRow>
                <CustomLabel>
                  Tên<RequiredMark>*</RequiredMark>
                </CustomLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                    style={{ margin: 0 }}
                  >
                    <InputComponent
                      value={stateProduct["name"]}
                      onChange={handleOnChange}
                      name="name"
                    />
                  </Form.Item>
                </FormInputWrapper>
              </CustomFormRow>

              <DoubleFieldRow>
                <CustomFormRow style={{ marginBottom: 0 }}>
                  <CustomLabel>
                    Loại<RequiredMark>*</RequiredMark>
                  </CustomLabel>
                  <FormInputWrapper>
                    <Form.Item
                      name="type"
                      rules={[
                        { required: true, message: "Vui lòng nhập loại!" },
                      ]}
                      style={{ margin: 0 }}
                    >
                      <Select
                        name="type"
                        value={stateProduct.type}
                        onChange={handleChangeSelect}
                        options={renderOptions(typeProduct?.data?.data)}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </FormInputWrapper>
                </CustomFormRow>

                <CustomFormRow style={{ marginBottom: 0 }}>
                  <CustomLabel>
                    Số lượng<RequiredMark>*</RequiredMark>
                  </CustomLabel>
                  <FormInputWrapper>
                    <Form.Item
                      name="countInStock"
                      rules={[
                        { required: true, message: "Vui lòng nhập số lượng!" },
                      ]}
                      style={{ margin: 0 }}
                    >
                      <InputComponent
                        value={stateProduct.countInStock}
                        onChange={handleOnChange}
                        name="countInStock"
                      />
                    </Form.Item>
                  </FormInputWrapper>
                </CustomFormRow>
              </DoubleFieldRow>

              <DoubleFieldRow>
                <CustomFormRow style={{ marginBottom: 0 }}>
                  <CustomLabel>
                    Giá<RequiredMark>*</RequiredMark>
                  </CustomLabel>
                  <FormInputWrapper>
                    <Form.Item
                      name="price"
                      rules={[
                        { required: true, message: "Vui lòng nhập giá!" },
                      ]}
                      style={{ margin: 0 }}
                    >
                      <InputComponent
                        value={stateProduct.price}
                        onChange={handleOnChange}
                        name="price"
                      />
                    </Form.Item>
                  </FormInputWrapper>
                </CustomFormRow>

                <CustomFormRow style={{ marginBottom: 0 }}>
                  <CustomLabel>
                    Đánh giá<RequiredMark>*</RequiredMark>
                  </CustomLabel>
                  <FormInputWrapper>
                    <Form.Item
                      name="rating"
                      rules={[
                        { required: true, message: "Vui lòng nhập đánh giá!" },
                      ]}
                      style={{ margin: 0 }}
                    >
                      <InputComponent
                        value={stateProduct.rating}
                        onChange={handleOnChange}
                        name="rating"
                      />
                    </Form.Item>
                  </FormInputWrapper>
                </CustomFormRow>
              </DoubleFieldRow>

              {stateProduct.type === "add_type" && (
                <CustomFormRow>
                  <CustomLabel>
                    Loại mới<RequiredMark>*</RequiredMark>
                  </CustomLabel>
                  <FormInputWrapper>
                    <Form.Item
                      name="newType"
                      rules={[
                        { required: true, message: "Vui lòng nhập loại mới!" },
                      ]}
                      style={{ margin: 0 }}
                    >
                      <InputComponent
                        value={stateProduct.newType}
                        onChange={handleOnChange}
                        name="newType"
                      />
                    </Form.Item>
                  </FormInputWrapper>
                </CustomFormRow>
              )}

              <CustomFormRow>
                <CustomLabel>
                  Giảm giá<RequiredMark>*</RequiredMark>
                </CustomLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="discount"
                    rules={[
                      { required: true, message: "Vui lòng nhập giảm giá!" },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <InputComponent
                      value={stateProduct.discount}
                      onChange={handleOnChange}
                      name="discount"
                    />
                  </Form.Item>
                </FormInputWrapper>
              </CustomFormRow>

              <CustomFormRow>
                <CustomLabel>
                  Mô tả<RequiredMark>*</RequiredMark>
                </CustomLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="description"
                    rules={[
                      { required: true, message: "Vui lòng nhập mô tả!" },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <InputComponent
                      value={stateProduct.description}
                      onChange={handleOnChange}
                      name="description"
                    />
                  </Form.Item>
                </FormInputWrapper>
              </CustomFormRow>

              <CustomFormRow>
                <CustomLabel>
                  Hình ảnh<RequiredMark>*</RequiredMark>
                </CustomLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="image"
                    rules={[
                      { required: true, message: "Vui lòng chọn hình ảnh!" },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <WrapperUploadFile
                      onChange={handleOnchangeAvatar}
                      maxCount={1}
                    >
                      <UploadPreview>
                        <Button>Chọn file</Button>
                        {stateProduct?.image && (
                          <PreviewImage
                            src={stateProduct?.image}
                            alt="preview"
                          />
                        )}
                      </UploadPreview>
                    </WrapperUploadFile>
                  </Form.Item>
                </FormInputWrapper>
              </CustomFormRow>

              <FormActionRow>
                <ModalActionButton type="submit">
                  Tạo sản phẩm
                </ModalActionButton>
              </FormActionRow>
            </Form>
          </FormCard>
        </Loading>
      </ModalComponent>

      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="40%"
      >
        <Loading isPending={isPendingUpdate || isPendingUpdated}>
          <FormCard>
            <Form
              name="basic"
              onFinish={onUpdateProduct}
              autoComplete="on"
              form={form}
              layout="horizontal"
            >
              <CustomFormRow>
                <CustomLabel>
                  Tên<RequiredMark>*</RequiredMark>
                </CustomLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                    style={{ margin: 0 }}
                  >
                    <InputComponent
                      value={stateProductDetails["name"]}
                      onChange={handleOnChangeDetails}
                      name="name"
                    />
                  </Form.Item>
                </FormInputWrapper>
              </CustomFormRow>

              <DoubleFieldRow>
                <CustomFormRow style={{ marginBottom: 0 }}>
                  <CustomLabel>
                    Loại<RequiredMark>*</RequiredMark>
                  </CustomLabel>
                  <FormInputWrapper>
                    <Form.Item
                      name="type"
                      rules={[
                        { required: true, message: "Vui lòng nhập loại!" },
                      ]}
                      style={{ margin: 0 }}
                    >
                      <InputComponent
                        value={stateProductDetails["type"]}
                        onChange={handleOnChangeDetails}
                        name="type"
                      />
                    </Form.Item>
                  </FormInputWrapper>
                </CustomFormRow>

                <CustomFormRow style={{ marginBottom: 0 }}>
                  <CustomLabel>
                    Số lượng<RequiredMark>*</RequiredMark>
                  </CustomLabel>
                  <FormInputWrapper>
                    <Form.Item
                      name="countInStock"
                      rules={[
                        { required: true, message: "Vui lòng nhập số lượng!" },
                      ]}
                      style={{ margin: 0 }}
                    >
                      <InputComponent
                        value={stateProductDetails.countInStock}
                        onChange={handleOnChangeDetails}
                        name="countInStock"
                      />
                    </Form.Item>
                  </FormInputWrapper>
                </CustomFormRow>
              </DoubleFieldRow>

              <DoubleFieldRow>
                <CustomFormRow style={{ marginBottom: 0 }}>
                  <CustomLabel>
                    Giá<RequiredMark>*</RequiredMark>
                  </CustomLabel>
                  <FormInputWrapper>
                    <Form.Item
                      name="price"
                      rules={[
                        { required: true, message: "Vui lòng nhập giá!" },
                      ]}
                      style={{ margin: 0 }}
                    >
                      <InputComponent
                        value={stateProductDetails.price}
                        onChange={handleOnChangeDetails}
                        name="price"
                      />
                    </Form.Item>
                  </FormInputWrapper>
                </CustomFormRow>

                <CustomFormRow style={{ marginBottom: 0 }}>
                  <CustomLabel>
                    Đánh giá<RequiredMark>*</RequiredMark>
                  </CustomLabel>
                  <FormInputWrapper>
                    <Form.Item
                      name="rating"
                      rules={[
                        { required: true, message: "Vui lòng nhập đánh giá!" },
                      ]}
                      style={{ margin: 0 }}
                    >
                      <InputComponent
                        value={stateProductDetails.rating}
                        onChange={handleOnChangeDetails}
                        name="rating"
                      />
                    </Form.Item>
                  </FormInputWrapper>
                </CustomFormRow>
              </DoubleFieldRow>

              <CustomFormRow>
                <CustomLabel>
                  Giảm giá<RequiredMark>*</RequiredMark>
                </CustomLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="discount"
                    rules={[
                      { required: true, message: "Vui lòng nhập giảm giá!" },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <InputComponent
                      value={stateProductDetails.discount}
                      onChange={handleOnChangeDetails}
                      name="discount"
                    />
                  </Form.Item>
                </FormInputWrapper>
              </CustomFormRow>

              <CustomFormRow>
                <CustomLabel>
                  Mô tả<RequiredMark>*</RequiredMark>
                </CustomLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="description"
                    rules={[
                      { required: true, message: "Vui lòng nhập mô tả!" },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <InputComponent
                      value={stateProductDetails.description}
                      onChange={handleOnChangeDetails}
                      name="description"
                    />
                  </Form.Item>
                </FormInputWrapper>
              </CustomFormRow>

              <CustomFormRow>
                <CustomLabel>
                  Hình ảnh<RequiredMark>*</RequiredMark>
                </CustomLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="image"
                    rules={[
                      { required: true, message: "Vui lòng chọn hình ảnh" },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <WrapperUploadFile
                      onChange={handleOnchangeAvatarDetails}
                      maxCount={1}
                    >
                      <UploadPreview>
                        <Button>Chọn file</Button>
                        {stateProductDetails?.image && (
                          <PreviewImage
                            src={stateProductDetails?.image}
                            alt="preview"
                          />
                        )}
                      </UploadPreview>
                    </WrapperUploadFile>
                  </Form.Item>
                </FormInputWrapper>
              </CustomFormRow>

              <FormActionRow>
                <ModalActionButton type="submit">Lưu</ModalActionButton>
              </FormActionRow>
            </Form>
          </FormCard>
        </Loading>
      </DrawerComponent>

      <ModalComponent
        forceRender
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteProduct}
      >
        <Loading isPending={isPendingDeleted}>
          <div>Bạn có chắc xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
    </AdminProductPage>
  );
};

export default AdminProduct;
