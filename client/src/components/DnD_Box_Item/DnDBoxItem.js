import React from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import './DnDBoxItem.css'
function BoxItem({image, imageId, imgStyle, swap, index, uid, kill}) {
  console.log('in box item, image is')
  console.log(image)

  const handleDrop = (e) => {
    e.stopPropagation();
    deleteMe()
    swap(e.dragData.index, index, e.dragData);
    // e.containerElem.style.visibility="hidden";
  };

  const deleteMe = () => {
    kill(uid);
  };

  return (
    <div className="box_item_component" height="100%" width="100%">
    <DragDropContainer
        targetKey="boxItem"
        dragData={{index, image}}
        onDrop={deleteMe}
        disappearDraggedElement={true}
        dragHandleClassName="grabber"
      >
        <DropTarget
          onHit={handleDrop}
          targetKey="boxItem"
        >
          <img className="grabber" src={image.imageSrc} alt="" height="100%" width="100%" style={imgStyle}/>
      </DropTarget>
    </DragDropContainer>
  </div>
  )
}

export default BoxItem