import React from 'react'
import Example from './Container';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const dragandDrop = () => {
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <Example />
            </DndProvider>
        </div>
    )
}

export default dragandDrop