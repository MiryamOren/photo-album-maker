// import React, { useState } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const finalSpaceCharacters = [
//   {
//     id: 'gary',
//     name: 'Gary Goodspeed',
//     thumb: '/images/gary.png'
//   },
//   {
//     id: 'cato',
//     name: 'Little Cato',
//     thumb: '/images/cato.png'
//   },
//   {
//     id: 'kvn',
//     name: 'KVN',
//     thumb: '/images/kvn.png'
//   },
//   {
//     id: 'mooncake',
//     name: 'Mooncake',
//     thumb: '/images/mooncake.png'
//   },
//   {
//     id: 'quinn',
//     name: 'Quinn Ergon',
//     thumb: '/images/quinn.png'
//   }
// ]

// function DragAndDrop() {
//   const [characters, updateCharacters] = useState(finalSpaceCharacters);

//   function handleOnDragEnd(result) {
//     if (!result.destination) return;

//     const items = Array.from(characters);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     updateCharacters(items);
//   }

//   return (
//     <div className="App">
//         <h1>Final Space Characters</h1>
//         <DragDropContext onDragEnd={handleOnDragEnd}>
//           <Droppable droppableId="characters">
//             {(provided) => (
//               <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
//                 {characters.map(({id, name, thumb}, index) => {
//                   return (
//                     <Draggable key={id} draggableId={id} index={index}>
//                       {(provided) => (
//                         <li  ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                           <p style={{color:"black"}}>
//                             { name }
//                           </p>
//                         </li>
                        
//                       )}
//                     </Draggable>
//                   );
//                 })}
//                 <Draggable key={100} draggableId={100} index={100}>
//                 {(provided) => (
//                   <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                   <div className="my-div" style={{backgroundColor:"red", height: "100px", width:"600px"}} >txt</div>
//                   </li>)}
//                 </Draggable>
                
//                 {provided.placeholder}
//               </ul>
              
//             )}

//           </Droppable>
//         </DragDropContext>
//       <p>
//         Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
//       </p>
//     </div>
//   );
// }

// export default DragAndDrop;

import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
function DragAndDrop() {
  return (
    <div>
      <DragDropContainer targetKey="foo" >
          <div>Drag Me!</div>
      </DragDropContainer>

      <DropTarget targetKey="foo">
          <p style={{backgroundColor: "yellow", height:"500px"}}>I'm a valid drop target for the object above since we both have the same targetKey!</p>
      </DropTarget>
    </div>
  )
}

export default DragAndDrop