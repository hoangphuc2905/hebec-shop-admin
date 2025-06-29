import React, { useImperativeHandle, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as IEditor } from "tinymce";
import { UploadImageModal } from "./components/UploadImageModal";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { $url } from "utils/url";

let editorRef: any = null;

interface IRichTextEditor {
  onChange: (content: string) => void;
  onInit: () => void;
  inputHeight?: number;
}

export const RichTextEditor = React.forwardRef(
  ({ onChange, onInit, inputHeight = 500 }: IRichTextEditor, ref) => {
    const [initValue, setInitValue] = useState("");
    useImperativeHandle(ref, () => ({
      setContent: (content: string) => {
        editorRef?.setContent(content);
        setInitValue(content);
      },
    }));

    const [visibleUploadModal, setVisibleUploadModal] = useState(false);

    return (
      <>
        <div style={{ textAlign: "right", marginBottom: 12 }}>
          <Button
            icon={<UploadOutlined />}
            onClick={() => setVisibleUploadModal(true)}
            type="primary"
          >
            Upload ảnh
          </Button>
        </div>

        <Editor
          apiKey="1s8l7u6g8q7e4hz0ljw15rbdh9g7l2pmh72hij5115qcpk2z"
          onInit={(evt, editor) => {
            editorRef = editor;
            onInit?.();
          }}
          onEditorChange={(val) => {
            onChange(val);
          }}
          initialValue={initValue}
          init={{
            entity_encoding: "numeric",
            height: inputHeight,
            menubar: false,
            convert_urls: true,
            relative_urls: false,
            remove_script_host: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount emoticons",
              "Enhanced Image",
            ],
            toolbar:
              "undo redo | formatselect | image emoticons | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | forecolor fontsizeselect | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt",
          }}
        />
        {visibleUploadModal && (
          <UploadImageModal
            onClose={() => setVisibleUploadModal(false)}
            onSubmitOk={(path) => {
              setVisibleUploadModal(false);
              editorRef.insertContent(`<img src="${$url(path)}"/>`);
            }}
            visible={visibleUploadModal}
          />
        )}
        {/* `<figure><img src="${path}"/><figcaption>${desc}</figcaption></figure><p></p>` */}
      </>
    );
  }
);
