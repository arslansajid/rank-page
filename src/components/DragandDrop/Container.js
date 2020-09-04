import React, { useState, useCallback, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import Dustbin from './Dustbin'
import Box from './Box'
import { ItemTypes } from './ItemTypes'
import update from 'immutability-helper';
import { Typography, Grid, colors } from "@material-ui/core";
import { setPostOrder, setPostId } from "../../actions/SelectedPostAction";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {connect} from "react-redux"
import { makeStyles } from '@material-ui/core/styles';

const Container = (props) => {
  const classes = useStyles();
  const {listItems} = props;
  const [dustbins, setDustbins] = useState([
    { id: 1, accepts: [ItemTypes.LIST], lastDroppedItem: null },
    { id: 2, accepts: [ItemTypes.LIST], lastDroppedItem: null },
    { id: 3, accepts: [ItemTypes.LIST, /* NativeTypes.FILE */], lastDroppedItem: null },
    { id: 4, accepts: [ItemTypes.LIST], lastDroppedItem: null },
    { id: 5, accepts: [ItemTypes.LIST], lastDroppedItem: null },
  ])
  const [boxes, setBoxes] = useState([
    { name: 'Bottle', type: ItemTypes.LIST },
    { name: 'Banana', type: ItemTypes.LIST },
    { name: 'Magazine', type: ItemTypes.LIST },
    { name: 'Bottle', type: ItemTypes.LIST },
    { name: 'Banana', type: ItemTypes.LIST },
  ])
  const [droppedBoxNames, setDroppedBoxNames] = useState([])
  const isMobile = window.innerWidth < 500;
  console.log("isMobile", isMobile)

  useEffect(() => {
    //setting post id in store
    if(!!props.match.params.postId) {
      props.dispatch(setPostId(props.match.params.postId));
    }
    const BOXES = listItems.map((item, index) => {
      return {
        name: item.title,
        image: item.image,
        id: item.id,
        type: ItemTypes.LIST,
      }
    })
    const DUSTBINS = listItems.map((item, index) => {
      return {
        id: item.id,
        accepts: [ItemTypes.LIST],
        image: item.image,
        lastDroppedItem: null
      }
    })
    setDustbins([...DUSTBINS]);
    setBoxes([...BOXES])
  }, [])

  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
  }

  const handleDrop = useCallback((index, item) => {
    window.alert("on drop")
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
    console.log("########", dustbins),
    // updateOrderInStore(dustbins)
  )

  useEffect(() => {
    if(!isMobile) {
      updateOrderInStore(dustbins);
    }
  }, [dustbins])

  const updateOrderInStore = (items) => {
    let reorderString = "";
    items.forEach((item, index) => {
      if(!!item.lastDroppedItem) {
        reorderString = reorderString + item.id;
        if(!!dustbins[index + 1] && dustbins[index + 1].lastDroppedItem) {
          reorderString = reorderString + ","
        }
      }
    })
    props.dispatch(setPostOrder(reorderString))
  }

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

    let reorderString = "";
    [...items].forEach((item, index) => {
      reorderString = reorderString + item.id;
      if(index + 1 < items.length) {
        reorderString = reorderString + ","
      }
    })
    props.dispatch(setPostOrder(reorderString))
  }

  return (
    <>
    <Grid className={classes.web} container>
        <Grid item xs={6}>
            <div style={{ overflow: 'hidden', clear: 'both' }}>
                {boxes.length > 0 && boxes.map(({ name, type, image }, index) => (
                <Box
                    number={index + 1}
                    name={name}
                    image={image}
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
                  {dustbins.length > 0 && dustbins.map(({ id, accepts, lastDroppedItem }, index) => (
                    <Draggable key={id} draggableId={String(id)} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Dustbin
                            // number={id}
                            number={index + 1}
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

    {/* for mobiles only */}
    <Grid className={classes.mobile} container>
      <Grid item xs={12}>
          <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {boxes.length > 0 && boxes.map(({ name, type, image }, index)=> (
                    <Draggable key={index} draggableId={String(index)} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Box
                            number={index + 1}
                            name={name}
                            image={image}
                            type={type}
                            isDropped={isDropped(name)}
                            key={index}
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

const useStyles = makeStyles((theme) => ({
  web: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
  mobile: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    }
  }
}))

function mapStateToProps(state) {
	return {
		selectedPost: state.selectedPost,
	};
}

export default withRouter(connect(mapStateToProps)(Container));
