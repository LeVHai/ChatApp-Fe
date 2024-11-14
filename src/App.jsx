import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io, { Socket } from "socket.io-client";
import { getInfoUser } from "./core/action/userAction";
import { setSocket } from "./core/action/socketAction";
import { getOnlineUser } from "./core/action/chatAction";
import MainLayout from "./Layout/MainLayout";
import Chat from "./page/Chat/Chat";
import Login from "./page/Login";
import ChatWindow from "./page/Chat/ChatWindow";

export default function App() {
  const { token } = useSelector((state) => state.authReducer);
  const { socket } = useSelector((state) => state.socketReducer);
  const { conversations } = useSelector((state) => state.chatReducer);
  const { user } = useSelector(state => state.userReducer)
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(getInfoUser());
    }
  }, [token]);

  useEffect(() => {
    if (user?._id) {
      const socket = io("http://localhost:3000", {
        query: { userId: user._id },
        transports: ["websocket"],
      });
      dispatch(setSocket(socket));

      socket.emit("join room", { user_id: user._id });

      socket.on("getOnlineUser", (onlineUser) => {
        dispatch(getOnlineUser(onlineUser));
      });

      return () => {
        socket?.off("join room");
      };
    }
  }, [user]);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRouter token={token} />}>
          <Route element={<MainLayout />}>
            <Route path="/chat" element={<Chat/>}>
            <Route path="/chat/:id" element={<ChatWindow/>}></Route>
            </Route>
          </Route>
        </Route>

        <Route element={<RejectedRouter token={token} />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const PrivateRouter = ({ token }) => {
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const RejectedRouter = ({ token }) => {
  return !token ? <Outlet /> : <Navigate to="/" />;
};
