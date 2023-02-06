//drag and drop

import { useRef } from "react";

const useDnD = () => {
  const dragItem: any = useRef();
  const dragItem2: any = useRef();
  const dragOverItem: any = useRef();
  const dragOverItem2: any = useRef();

  const dragStart = (e: any, position: number) => {
    dragItem.current = position;
    dragItem2.current = position;
    // console.log(e.target.innerHTML);
  };

  const dragEnter = (e: any, position: number) => {
    dragOverItem.current = position;
    dragOverItem2.current = position;
    // console.log(e.target.innerHTML);
  };

  const drop = (
    e: any,
    arr1: Array<any>,
    setArr1: Function,
    arr2?: Array<any>,
    setArr2?: Function
  ) => {
    const copyListItems = [...arr1];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setArr1(copyListItems);
    if (arr2 && setArr2) {
      const copyListItems2 = [...arr2];
      const dragItemContent2 = copyListItems2[dragItem2.current];
      copyListItems2.splice(dragItem2.current, 1);
      copyListItems2.splice(dragOverItem2.current, 0, dragItemContent2);
      dragItem2.current = null;
      dragOverItem2.current = null;
      setArr2(copyListItems2);
    }
  };

  return { dragStart, dragEnter, drop };
};

export default useDnD;
