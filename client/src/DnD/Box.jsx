import React from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import BoxItem from './BoxItem';
import Boxable from './Boxable';
var shortid = require('shortid');

export default class Box extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: [],
        backgroundImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEWu2OZ0FEXqAAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII="
      };
      this.elements = [
        "https://www.scottishspca.org/sites/default/files/styles/full_content/public/2019-09/Buying%20a%20cat%201000x600.jpeg?itok=nvUseKh2",
        "https://www.mercurynews.com/wp-content/uploads/2021/02/SGT-L-COL-PHS-0209.jpg",
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-girl-cat-names-1606245046.jpg"
      ]
    }
    
    handleDrop = (e) => {
      console.log('handleDrop')
      console.log(e.dragData)
      // let items = this.state.items.slice();
      // items.push({label: e.dragData.label, uid: shortid.generate(), image: e.dragData.image});
      const items = [{label: e.dragData.label, uid: shortid.generate(), image: e.dragData.image}];
      this.setState({items: items, backgroundImg: e.dragData.image});
      // if (!this.props.childs) { e.containerElem.style.visibility="hidden" };
    };
  
    swap = (fromIndex, toIndex, dragData) => {
      console.log('swap')
      let items = this.state.items.slice();
      const item = {label: dragData.label, uid: shortid.generate()};
      items.splice(toIndex, 0, item);
      this.setState({items: items});
    };
  
    kill = (uid) => {
      console.log('kill')
      if (this.props.childs) {return}
      let items = this.state.items.slice();
      const index = items.findIndex((item) => {
        return item.uid == uid
      });
      if (index !== -1) {
        items.splice(index, 1);
      }
      this.setState({items: items});
    };
  
    render() {
      /*
          Note the two layers of DropTarget. 
          This enables it to handle dropped items from 
          outside AND items dragged between boxes.
      */
      return (
        <div className="component_box">
            <DropTarget
              onHit={this.handleDrop}
              targetKey={this.props.targetKey}
              dropData={{name: this.props.name}}
            >
              <DropTarget
                onHit={this.handleDrop}
                targetKey="boxItem"
                dropData={{name: this.props.name}}
              >
                <div className="box" >
      {/*style={{background : `url("${this.state.backgroundImg}") no-repeat center center/cover`}}*/}
                  {this.props.childs && this.elements.map(el => <Boxable targetKey="box" label="pickle" image={el} style={{}}/>)}
                   {!this.props.childs && this.state.items.map((item, index) => {
                    return (
                      <BoxItem key={item.uid} index={index} kill={this.kill} swap={this.swap} uid={item.uid}
                      image={item.image}
                      > 
                      {// }
                      }
                        {item.label}
                        
                      </BoxItem>
                    )
                  })}
                
                </div>
              </DropTarget>
            </DropTarget>
        </div>
      );
    }
  }