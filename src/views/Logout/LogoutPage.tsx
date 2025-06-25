import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "antd"; 

const LogoutPage: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const handleOk = () => {
    // Xử lý đăng xuất, ví dụ xóa token
    localStorage.removeItem("token");
    // Chuyển hướng về trang đăng nhập
    navigate("/login");
  };

  const handleCancel = () => {
    setVisible(false);
    // Quay lại trang trước hoặc trang chủ
    navigate(-1);
  };

  return (
    <Modal
      title="Xác nhận đăng xuất"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Đăng xuất"
      cancelText="Hủy"
      centered
    >
      Bạn có chắc chắn muốn đăng xuất không?
    </Modal>
  );
};

export default LogoutPage;
