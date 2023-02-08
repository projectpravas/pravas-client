import * as React from "react";
import JoditEditor from "jodit-react";

interface IRichTextEditorProps {
  setValue: Function;
}

const RichTextEditor: React.FunctionComponent<IRichTextEditorProps> = ({
  setValue,
}) => {
  const editor = React.useRef(null);

  const sendValue = (content: any) => {
    setValue(content);
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
