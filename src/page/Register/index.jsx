import { Button, Card, Flex, Form, Input, message, Typography } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { postUserRegister } from "../../core/action/authAction"; 
import { Link } from "react-router-dom";

const Register = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const submit = async () => {
      const values = await form.validateFields();
      dispatch(
        postUserRegister(values, (res) => {
          if (res && res.status === 200) {
            message.info("Đăng kí thành công");
            form.resetFields();
          } else if (res && res.status === 422 && res.data && res.data.error) {
            const errorFields = Object.keys(res.data.error).map((field) => ({
              name: field,
              errors: [res.data.error[field].msg], 
            }));
            form.setFields(errorFields); 
          }
        })
      );
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{ width: "100%", height: "100vh" }}
    >
      <Card style={{ width: "400px", margin: "10px" }}>
        <Typography.Title level={2}>Đăng kí</Typography.Title>
        <Form
          requiredMark={false}
          form={form}
          layout="vertical"
          onFinish={submit}
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Vui lòng nhập tên người dùng" },
            ]}
            label="Tên"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
            label="Email"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            label="Mật khẩu"
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm_password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp")
                  );
                },
              }),
            ]}
            label="Xác nhận mật khẩu"
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Đăng kí
            </Button>
          </Form.Item>
          <Flex justify="center">
            <span>
              Bạn đã có tài khoản ? <Link to={'/login'}>Đăng nhập</Link>
            </span>
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
};

export default Register;
