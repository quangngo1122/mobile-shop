import React, { useEffect, useRef, useState } from "react";
import {
  AdminUserPage,
  FormActionRow,
  FormCard,
  FormInputWrapper,
  FormLabel,
  FormRow,
  HeaderContent,
  HeaderSubtitle,
  PageShell,
  PreviewImage,
  PrimaryButton,
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
import { Button, Form, Space } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import ModalComponent from "../ModalComponent/ModalComponent";
import { getBase64 } from "../../utils";
import * as message from "../../components/Message/Message";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { useQuery } from "@tanstack/react-query";

const AdminUser = () => {
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isPendingUpdate, setIsPendingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user);
  const searchInput = useRef(null);

  const [stateUserDetails, setStateUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    isAdmin: false,
    createdAt: "",
    avatar: "",
    address: "",
    city: "",
  });

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = UserService.updateUser(id, { ...rests }, token);
    return res;
  });

  const mutationDeletedMany = useMutationHooks((data) => {
    const { token, ...ids } = data;
    const res = UserService.deleteManyUser(ids, token);
    return res;
  });

  const mutationDeleted = useMutationHooks((data) => {
    const { id, token } = data;
    const res = UserService.deleteUser(id, token);
    return res;
  });

  const getAllUser = async () => {
    const res = await UserService.getAllUser(user?.access_token);
    return res;
  };

  const fetchGetDetailsUser = async (rowSelected) => {
    const res = await UserService.getDetailsUser(rowSelected);
    if (res?.data) {
      setStateUserDetails({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        isAdmin: res?.data?.isAdmin,
        createdAt: res?.data?.createdAt,
        address: res?.data?.address,
        avatar: res?.data?.avatar,
        city: res?.data?.city,
      });
    }
    setIsPendingUpdate(false);
  };

  useEffect(() => {
    form.setFieldsValue(stateUserDetails);
  }, [form, stateUserDetails]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsPendingUpdate(true);
      fetchGetDetailsUser(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);

  const handleDetailsUser = () => {
    setIsOpenDrawer(true);
  };

  const handleDeleteManyUsers = (ids) => {
    mutationDeletedMany.mutate(
      { ids: ids, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      },
    );
  };

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

  const queryUser = useQuery({ queryKey: ["users"], queryFn: getAllUser });
  const { isPending: isPendingUsers, data: users } = queryUser;
  const renderAction = () => {
    return (
      <div>
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
        <EditOutlined
          style={{ color: "orange", fontSize: "30px", cursor: "pointer" }}
          onClick={handleDetailsUser}
        />
      </div>
    );
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
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
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
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
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      sorter: (a, b) => a.createdAt - b.createdAt,
      ...getColumnSearchProps("createdAt"),
    },
    {
      title: "Chức vụ",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    users?.data?.length &&
    users?.data?.map((user) => {
      return {
        ...user,
        key: user._id,
        isAdmin: user.isAdmin ? "Quản lý" : "Người dùng",
      };
    });

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
    setStateUserDetails({
      name: "",
      email: "",
      phone: "",
      isAdmin: false,
      createdAt: "",
      city: "",
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

  const handleDeleteUser = () => {
    mutationDeleted.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      },
    );
  };

  const handleOnChangeDetails = (e) => {
    setStateUserDetails({
      ...stateUserDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetails({
      ...stateUserDetails,
      avatar: file.preview,
    });
  };
  const onUpdateUser = () => {
    mutationUpdate.mutate(
      { id: rowSelected, token: user?.access_token, ...stateUserDetails },
      {
        onSettled: () => {
          queryUser.refetch();
        },
      },
    );
  };
  return (
    <AdminUserPage>
      <PageShell>
        <HeaderContent>
          <WrapperHeader>Quản lý người dùng</WrapperHeader>
          <HeaderSubtitle>
            Theo dõi tài khoản, vai trò và thông tin khách hàng trong hệ thống.
          </HeaderSubtitle>
        </HeaderContent>

        <TopStats>
          <StatCard>
            <StatLabel>Tổng tài khoản</StatLabel>
            <StatValue>{users?.data?.length || 0}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Quản lý</StatLabel>
            <StatValue>
              {users?.data?.filter((item) => item.isAdmin).length || 0}
            </StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Trạng thái</StatLabel>
            <StatValue>Live</StatValue>
          </StatCard>
        </TopStats>

        <TablePanel>
          <TableHeader>
            <TableTitle>Danh sách người dùng</TableTitle>
          </TableHeader>
          <TableBody>
            <TableComponent
              handleDeleteMany={handleDeleteManyUsers}
              columns={columns}
              isPending={isPendingUsers}
              data={dataTable}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setRowSelected(record._id);
                  },
                };
              }}
            />
          </TableBody>
        </TablePanel>
      </PageShell>
      <DrawerComponent
        title="Chi tiết người dùng"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="40%"
      >
        <Loading isPending={isPendingUpdate || isPendingUpdated}>
          <FormCard>
            <Form
              name="basic"
              onFinish={onUpdateUser}
              autoComplete="on"
              form={form}
            >
              <FormRow>
                <FormLabel>Tên</FormLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                    style={{ margin: 0 }}
                  >
                    <InputComponent
                      value={stateUserDetails["name"]}
                      onChange={handleOnChangeDetails}
                      name="name"
                    />
                  </Form.Item>
                </FormInputWrapper>
              </FormRow>
              <FormRow>
                <FormLabel>Email</FormLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email!" },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <InputComponent
                      value={stateUserDetails.email}
                      onChange={handleOnChangeDetails}
                      name="email"
                    />
                  </Form.Item>
                </FormInputWrapper>
              </FormRow>
              <FormRow>
                <FormLabel>Số điện thoại</FormLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại!",
                      },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <InputComponent
                      value={stateUserDetails.phone}
                      onChange={handleOnChangeDetails}
                      name="phone"
                    />
                  </Form.Item>
                </FormInputWrapper>
              </FormRow>
              <FormRow>
                <FormLabel>Địa chỉ</FormLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="address"
                    rules={[
                      { required: true, message: "Vui lòng nhập địa chỉ!" },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <InputComponent
                      value={stateUserDetails.address}
                      onChange={handleOnChangeDetails}
                      name="address"
                    />
                  </Form.Item>
                </FormInputWrapper>
              </FormRow>
              <FormRow>
                <FormLabel>Thành phố</FormLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="city"
                    rules={[
                      { required: true, message: "Vui lòng nhập thành phố!" },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <InputComponent
                      value={stateUserDetails.city}
                      onChange={handleOnChangeDetails}
                      name="city"
                    />
                  </Form.Item>
                </FormInputWrapper>
              </FormRow>
              <FormRow>
                <FormLabel>Ảnh đại diện</FormLabel>
                <FormInputWrapper>
                  <Form.Item
                    name="avatar"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ảnh đại diện!",
                      },
                    ]}
                    style={{ margin: 0 }}
                  >
                    <WrapperUploadFile
                      onChange={handleOnchangeAvatarDetails}
                      maxCount={1}
                    >
                      <UploadPreview>
                        <Button>Chọn file</Button>
                        {stateUserDetails?.avatar && (
                          <PreviewImage
                            src={stateUserDetails?.avatar}
                            alt="avatar"
                          />
                        )}
                      </UploadPreview>
                    </WrapperUploadFile>
                  </Form.Item>
                </FormInputWrapper>
              </FormRow>
              <FormActionRow>
                <PrimaryButton type="submit">Lưu thay đổi</PrimaryButton>
              </FormActionRow>
            </Form>
          </FormCard>
        </Loading>
      </DrawerComponent>
      <ModalComponent
        forceRender
        title="Xóa người dùng"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOk={handleDeleteUser}
      >
        <Loading isPending={isPendingDeleted}>
          <div>Bạn có chắc xóa tài khoản này không?</div>
        </Loading>
      </ModalComponent>
    </AdminUserPage>
  );
};

export default AdminUser;
