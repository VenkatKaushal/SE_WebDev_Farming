import React from 'react';
import { useDrop } from 'react-dnd';

const DragDropArea = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'MODEL',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      onDrop(item, offset);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: isOver ? '#e0e0e0' : '#f9f9f9',
        border: '2px dashed #bbb',
      }}
    >
      {isOver ? 'Release to drop' : 'Drag items here'}
    </div>
  );
};

export default DragDropArea;
