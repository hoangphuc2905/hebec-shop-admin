import { Modal } from "antd";
import { SingleImageUpload } from "components/Upload/SingleImageUpload";
import { useCallback, useEffect, useState } from "react";

export const UploadImageModal = ({
  visible,
  onClose,
  onSubmitOk,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmitOk: (imagePath: string) => void;
}) => {
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (visible) {
      setImage("");
    }
  }, [visible]);

  const handleUploadImageOk = useCallback((path: string) => {
    setImage((prev) => path);
  }, []);

  return (
    <Modal
      maskClosable={false}
      onCancel={onClose}
      visible={visible}
      title={"Upload ảnh"}
      style={{ top: 20 }}
      width={700}
      onOk={() => {
        onSubmitOk(image);
      }}
    >
      <SingleImageUpload onUploadOk={handleUploadImageOk} imageUrl={image} />

      {/* <Input.TextArea
        onChange={(e) => setDesc(e.target.value)}
        style={{ marginTop: "5px" }}
        placeholder="Mô tả ảnh"
      /> */}
    </Modal>
  );
};
