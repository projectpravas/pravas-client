import React from "react";
import JoditEditor from "jodit-react";
import BolgModel from "../../../../shared/models/blogModel";

interface IRichTextEditorProps {
  setValue: Function;
  formData: BolgModel;
}

const RichTextEditor: React.FunctionComponent<IRichTextEditorProps> = ({
  setValue,
  formData,
}) => {
  const editor = React.useRef(null);

  const sendValue = (content: any) => {
    setValue({ ...formData, richText: content });
  };

  return (
    <JoditEditor
      ref={editor}
      onChange={(content) => sendValue(content)}
      value=""
    />
  );
};

export default RichTextEditor;
