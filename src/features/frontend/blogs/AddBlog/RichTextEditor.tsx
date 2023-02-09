import * as React from "react";
import JoditEditor from "jodit-react";

interface IRichTextEditorProps {
  setValue: Function;
  formData: object;
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
