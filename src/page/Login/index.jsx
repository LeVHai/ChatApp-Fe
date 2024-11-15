import { Button, Card, Flex, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { postUserLogin } from "../../core/action/authAction";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const submit = async () => {
    const values = await form.validateFields();
    dispatch(postUserLogin(values));
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{ width: "100%", height: "100vh" }}
    >
      <Card style={{ width: "400px", margin: "10px" }}>
        <Typography.Title level={2}>Đăng nhập</Typography.Title>
        <Form requiredMark={false} form={form} layout="vertical" onFinish={submit}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email" }]}
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
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
          <Flex justify="center">
            <span>
              Bạn chưa có tài khoản ? <Link to={"/register"}>Đăng kí</Link>
            </span>
          </Flex>
        </Form>
      </Card>
    </Flex>
  );
};

export default Login;
