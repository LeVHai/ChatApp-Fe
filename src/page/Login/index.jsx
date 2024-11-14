import { Button, Card, Flex, Form, Input, Typography } from "antd";
import React, { useState } from "react";
import { postUserLogin } from "../../core/action/authAction";
import { useDispatch } from "react-redux";
const Login = () => {
    const [form] = Form.useForm();
const dispatch = useDispatch()
    const submit = async () => {
        const values = await form.validateFields();
            dispatch(postUserLogin(values))
    };

    return (
        <Flex
            align="center"
            justify="center"
            style={{ width: "100%", height: "100vh" }}
        >
            <Card style={{ width: "400px", margin: "10px" }}>
                <Typography.Title level={2}>Login</Typography.Title>
                <Form form={form} layout="vertical" onFinish={submit}>
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
                        label="Password"
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">Login</Button>
                    </Form.Item>
                </Form>
            </Card>
        </Flex>
    );
};

export default Login;
