import React from 'react';
import Boxable from './Boxable';
import Box from './Box';
import './DragThingsToBoxesDemo.css';


export default class DragThingsToBoxesDemo extends React.Component {
  render() {
    const imgSrc = "https://i.guim.co.uk/img/media/8a13052d4db7dcd508af948e5db7b04598e03190/0_294_5616_3370/master/5616.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=bcaa4eed2c1e6dab61c41a61e41433d9";
    return (
      <div className="drag_things_to_boxes">
        <h2>Demo: Drag things Into and Between Boxes</h2>
        You can also drag to re-order within boxes. Note &#8759; used as drag handles.
        <div className="things_to_drag">
          <Boxable targetKey="box" label="bananas"  image="./img/banana.png"/>
          <Boxable targetKey="box" label="cheeseburger"  image="img/surprise.png"/>
          <Boxable targetKey="box" label="orange" image="img/orange.png"/>
          <Boxable targetKey="box" label="pickle" image="img/pickle.png"/>
          <Boxable targetKey="box" label="gorilla" image="img/gorilla.png"/>
          <Boxable targetKey="box" label="puppy" image={imgSrc}/>
        </div>
        <div className="boxes">
          <Box targetKey="box" childs={true}/>
          <Box targetKey="box" childs={false}/>
        </div>
        <div style={{clear: 'both'}}>&nbsp;</div>

        <h3>Notes:</h3>
        When you drag an item into a box, the Box element gets info from the onHit event's dragData property
        and uses it to construct a BoxItem. You can then drag BoxItems between boxes using drag handles.
        <ul>
        <li><strong>dragHandleClassName</strong> specify that you can only drag a box by grabbing the 'x'.</li>
        <li><strong>disappearDraggedElement</strong> makes the elements in the boxes disappear when you drag them, so they no longer take up any space.</li>
        </ul>

      </div>
    )
  }
}