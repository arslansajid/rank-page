import React, { useState, useCallback } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import Dustbin from './Dustbin'
import Box from './Box'
import { ItemTypes } from './ItemTypes'
import update from 'immutability-helper';
import { Typography, Grid, colors } from "@material-ui/core";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Container = () => {
  const [dustbins, setDustbins] = useState([
    { id: 1, accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { id: 2, accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    { id: 3, accepts: [ItemTypes.PAPER, /* NativeTypes.FILE */], lastDroppedItem: null },
    { id: 4, accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { id: 5, accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    { id: 6, accepts: [ItemTypes.PAPER, /* NativeTypes.FILE */], lastDroppedItem: null },
    { id: 7, accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { id: 8, accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    { id: 9, accepts: [ItemTypes.PAPER, /* NativeTypes.FILE */], lastDroppedItem: null },
    { id: 10, accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { id: 11, accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    { id: 12, accepts: [ItemTypes.PAPER, /* NativeTypes.FILE */], lastDroppedItem: null },
    { id: 13, accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { id: 14, accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    { id: 15, accepts: [ItemTypes.PAPER, /* NativeTypes.FILE */], lastDroppedItem: null },
    { id: 16, accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { id: 17, accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    { id: 18, accepts: [ItemTypes.PAPER, /* NativeTypes.FILE */], lastDroppedItem: null },
    { id: 19, accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { id: 20, accepts: [ItemTypes.FOOD], lastDroppedItem: null },
  ])
  const [boxes] = useState([
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER },
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER },
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER },
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER },
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER },
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER },
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
  ])
  const [droppedBoxNames, setDroppedBoxNames] = useState([])
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
  }
  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
    },
    [droppedBoxNames, dustbins],
  )

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      dustbins,
      result.source.index,
      result.destination.index
    );

    setDustbins([...items])
  }

  return (
    <>
    <Grid container>
        <Grid item xs={6}>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                {boxes.map(({ name, type }, index) => (
                <Box
                    number={index + 1}
                    name={name}
                    type={type}
                    isDropped={isDropped(name)}
                    key={index}
                />
                ))}
            </div>
        </Grid>
        <Grid item xs={6}>
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {dustbins.map(({ id, accepts, lastDroppedItem }, index) => (
                    <Draggable key={id} draggableId={String(id)} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Dustbin
                            number={id}
                            accept={accepts}
                            lastDroppedItem={lastDroppedItem}
                            onDrop={(item) => handleDrop(index, item)}
                            key={id}
                            isDragging={snapshot.isDragging}
                        />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
    </Grid>
    </>
  )
}


export default Container;