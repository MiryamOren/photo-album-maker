import React from 'react';
import { DragDropContainer } from 'react-drag-drop-container';

function Boxable({image, targetKey, customDragElement}){
  return (
    <div className="boxable_component" style={{display: 'inline-block'}}>
      <DragDropContainer
        targetKey={targetKey}
        dragData={{image}}
        customDragElement={customDragElement}
        onDragStart={()=>(console.log('start'))}
        onDrag={()=>(console.log('dragging'))}
        onDragEnd={()=>(console.log('end'))}
        onDrop={(e)=>(console.log(e))}
      >
        <img src={image.imageSrc} height="70px" style={{ marginLeft: 40}} alt=""/>
      </DragDropContainer>
    </div>
  );
}

export default Boxable