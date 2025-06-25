import { Form, FormInstance, Modal, ModalProps } from "antd";
import { FormProps } from "antd/lib";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

export interface AppModalProps {
  data: any;
  close: () => void;
  open: (data: any) => void;
  setData: (data: any) => void;
  form: FormInstance<any>;
}

interface AppModal
  extends Omit<ModalProps, "children" | "onOk" | "afterClose"> {
  onOk?: (data: AppModalProps) => Promise<any>;
  afterClose?: (data: AppModalProps) => any;
  children: (data: AppModalProps) => React.ReactNode | React.ReactNode;
  formProps?: FormProps;
  beforeOpen?: (data: AppModalProps) => void;
}

export interface AppModalAction {
  open: (data: any) => void;
  close: () => void;
  setData: (data: any) => void;
}

const AppModal = forwardRef(
  ({ children, onOk, beforeOpen, ...modalProps }: AppModal, ref) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();
    const [form] = Form.useForm();

    const handleClose = () => {
      setIsOpen(false);
    };
    const handleOpen = () => {
      setIsOpen(true);
    };

    useEffect(() => {
      if (isOpen) {
        beforeOpen?.({
          data,
          close: handleClose,
          open: handleOpen,
          setData,
          form: form,
        });
      }
    }, [isOpen]);

    useImperativeHandle(
      ref,
      () => ({
        setData: setData,
        open: (data: any) => {
          setData(data);
          handleOpen();
        },
        close: () => {
          handleClose();
        },
      }),
      []
    );

    const content =
      typeof children == "function"
        ? children({
            data,
            close: handleClose,
            open: handleOpen,
            setData,
            form: form,
          })
        : children;

    return (
      <Modal
        onCancel={handleClose}
        confirmLoading={loading}
        onOk={() => {
          setLoading(true);
          onOk?.({
            data,
            form: form,
            close: handleClose,
            open,
            setData,
          }).finally(() => {
            setLoading(false);
          });
        }}
        {...modalProps}
        afterClose={() => {
          modalProps?.afterClose?.({
            data,
            form: form,
            close: handleClose,
            open,
            setData,
          });
        }}
        visible={isOpen}
      >
        <Form form={form}>{content}</Form>
      </Modal>
    );
  }
);

export default AppModal;
