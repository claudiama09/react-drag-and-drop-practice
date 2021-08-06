import React, {useState, useCallback} from 'react';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {DropResult} from '@types/react-beautiful-dnd';

interface Items {
  id: string;
  content: string;
}

const getItems = (count: number) =>
  Array.from({length: count}, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.slice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result;
}

const grid = 8;

const getListStyle = (isDraggableOver) => ({
  background: isDraggableOver ? "#EFB7B7" : "#EFB7B7",
  padding: grid,
  width: 300,
})

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "#FAF2F2" : "#F1D1D1",
  ...draggableStyle
})

function App() {
  const [items, setItems] = useState<Items[]>(getItems(10))

  const onDragEnd = useCallback((result: DropResult) => {
if (!result.destination){
  return;
}

const items = reorder(items, result.source.index, result.destination.index)


  },[])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => {
          <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggableOver)}>
            {items.map((item, index) => {
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshop) => {
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.droppableProps}
                    style={getItemStyle(snapshop.isDraggingOver, provided.draggableProps.style)}>
                    {item.content}
                  </div>
                }}
              </Draggable>
            })}
            {provided.placeholder}
          </div>
        }}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
