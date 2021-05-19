import React, { useState, useEffect } from "react"
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import BoxItem from '../DnD_Box_Item/DnDBoxItem';
import Boxable from '../DnD_Boxable/DnDBoxable';
var shortid = require('shortid');

function DnDBox ({boxablesArr, height, width, targetKey, name, className, imgStyle}) {
  const [item, setItem] = useState(null);

  const handleDrop = (e) => {
    const newItem = { uid: shortid.generate(), image: e.dragData.image};
    console.log('in box handleDrop, event is')
    console.log(e.dragData.image)
    setItem(newItem);
  }
  const kill = () => {
    setItem(null)
  }

  const swap = (fromIndex, toIndex, dragData) => {
      // console.log('swap')
      // let items = this.state.items.slice();
      // const item = {label: dragData.label, uid: shortid.generate()};
      // items.splice(toIndex, 0, item);
      setItem(null)
      setItem({ uid: shortid.generate(), image: dragData.image})
    };

  const renderBoxable = () => {
    return (
      boxablesArr.map((el, indx) => <Boxable targetKey="box" image={el} style={{}} key={indx}/>)
    )
  }

  const renderBoxItem = () => {
    if (!item) { return null }
    console.log('in renderBoxItem, image is')
    console.log(item)
    return (
      <BoxItem 
        key={item.uid} 
        kill={kill} 
        swap={swap} 
        uid={item.uid}
        image={item.image}
        imgStyle={imgStyle}
      ></BoxItem>
      )
  }

  return(
    <div className="component_box" style={{ height:"100%", width:"100%" }}>
    <DropTarget
      onHit={handleDrop}
      targetKey={targetKey}
      dropData={{name}}
    >
      <DropTarget
        onHit={handleDrop}
        targetKey="boxItem"
        dropData={{name}}
      >
        <div className={`box ${className}`} style={{ height:"100%", width:"100%" }}>
          {boxablesArr ? renderBoxable() : renderBoxItem()}
        </div>
      </DropTarget>
    </DropTarget>
</div>
);
}

export default DnDBox;