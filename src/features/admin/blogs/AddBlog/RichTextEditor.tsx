import React, { useEffect, useState } from "react";
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
  const [joditData, setJoditData] = useState<any>("");

  const sendValue = (content: any) => {
    setValue({ ...formData, richText: joditData });
  };

  useEffect(() => {
    sendValue(joditData);
  }, [joditData]);

  useEffect(() => {
    setJoditData(formData?.richText);
  }, [formData?.richText]);

  return (
    <JoditEditor
      ref={editor}
      onChange={(content) => {
        // sendValue(content);
        setJoditData(content);
      }}
      value={joditData}
    />
  );
};

export default RichTextEditor;
