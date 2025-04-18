import React, { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ChevronDown, Pencil, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import UserContext from '../../Context/UserContext';

const KanbanBoard = ({ data, onUpdateColumns, setHasAccess }) => {
  const { user } = useContext(UserContext);
  const userId = user?.id || '';

  const initialColumns = {
    'To Do': data.todo || [],
    'Under Progress': data.onprogress || [],
    'Review': data.review || [],
    'Done': data.done || [],
  };

  const [columns, setColumns] = useState(initialColumns);
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [showDropdownFor, setShowDropdownFor] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, task: null, columnKey: '', input: '' });

  // 🔐 Check access on load
  useEffect(() => {
    const allTasks = [
      ...data.todo,
      ...data.onprogress,
      ...data.review,
      ...data.done,
    ];

    const isTeamMember = allTasks.some(
      (task) => task.teamMemberID === userId || task.teamLeadID === userId
    );

    const isTeamLead = userId === data.teamLeadId;

    if (isTeamMember || isTeamLead) {
      setHasAccess(true);
    } else {
      setHasAccess(false);
    }
  }, [userId, data, setHasAccess]);

  useEffect(() => {
    setColumns(initialColumns);
  }, [data]);

  const toggleTask = (id) => {
    setExpandedTaskId((prev) => (prev === id ? null : id));
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;
    const draggedTask = columns[sourceCol][source.index];

    if (draggedTask.teamMemberID !== userId && draggedTask.teamLeadID !== userId) return;

    if (sourceCol === destCol) {
      const newTasks = Array.from(columns[sourceCol]);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, draggedTask);
      const updated = { ...columns, [sourceCol]: newTasks };
      setColumns(updated);
      onUpdateColumns(updated);
    } else {
      const sourceTasks = Array.from(columns[sourceCol]);
      const destTasks = Array.from(columns[destCol]);
      sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, draggedTask);
      const updated = {
        ...columns,
        [sourceCol]: sourceTasks,
        [destCol]: destTasks,
      };
      setColumns(updated);
      onUpdateColumns(updated);
    }
  };

  const handleDeleteTask = (taskId, columnKey) => {
    const updatedColumn = columns[columnKey].filter((task) => task._id !== taskId);
    const updatedColumns = { ...columns, [columnKey]: updatedColumn };
    setColumns(updatedColumns);
    onUpdateColumns(updatedColumns);
    setDeleteConfirm({ show: false, task: null, columnKey: '', input: '' });
  };

  const handleModifyTask = (task) => {
    setEditingTask(task);
    setShowDropdownFor(null);
  };

  const saveModifiedTask = (modifiedTask) => {
    const updatedColumns = { ...columns };
    for (const columnKey in updatedColumns) {
      const columnTasks = updatedColumns[columnKey].map((task) =>
        task._id === modifiedTask._id ? modifiedTask : task
      );
      updatedColumns[columnKey] = columnTasks;
    }
    setColumns(updatedColumns);
    onUpdateColumns(updatedColumns);
    setEditingTask(null);
  };

  const columnOrder = ['To Do', 'Under Progress', 'Review', 'Done'];

  return (
    <div className="p-6 min-h-screen">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {columnOrder.map((columnKey) => {
            let bgColor = '';
            if (columnKey === 'To Do') bgColor = 'bg-red-100';
            else if (columnKey === 'Under Progress') bgColor = 'bg-yellow-100';
            else if (columnKey === 'Review') bgColor = 'bg-blue-100';
            else if (columnKey === 'Done') bgColor = 'bg-green-100';

            return (
              <Droppable key={columnKey} droppableId={columnKey}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`p-4 kanban-column rounded-xl shadow-md min-h-[500px] overflow-y-auto max-h-[500px] transition-colors duration-300 ${snapshot.isDraggingOver ? 'bg-opacity-70' : ''} ${bgColor}`}
                  >
                    <h2 className="font-bold text-lg mb-3 text-center text-gray-700">{columnKey}</h2>

                    {columns[columnKey].map((task, index) => {
                      const isExpanded = expandedTaskId === task._id;
                      const isDraggable = task.teamMemberID === userId || userId === data.teamLeadId;
                      const showDropdown = showDropdownFor === task._id;

                      const card = (
                        <div
                          className={`relative bg-white p-3 rounded-md shadow mb-3 transition-all duration-300 ${!isDraggable ? 'opacity-80' : 'cursor-pointer'}`}
                          onClick={() => toggleTask(task._id)}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-800">{task.taskName}</h3>
                            {userId === data.teamLeadId && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowDropdownFor((prev) => (prev === task._id ? null : task._id));
                                }}
                              >
                                <ChevronDown className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                              Assigned: {task.teammemberName}
                            </span>
                            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                              Due: {task.enddate}
                            </span>
                          </div>

                          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <p className="text-sm text-gray-600 mt-2">{task.taskDesc}</p>
                          </div>

                          {showDropdown && (
                            <div className="absolute top-8 right-3 bg-white shadow-md rounded-md p-2 z-10 flex flex-col gap-2 w-28">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleModifyTask(task);
                                }}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 px-3 py-1 rounded-md"
                              >
                                <Pencil size={16} />
                                <span className="text-sm">Edit</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDeleteConfirm({ show: true, task, columnKey, input: '' });
                                  setShowDropdownFor(null);
                                }}
                                className="flex items-center gap-2 text-red-600 hover:text-red-800 hover:bg-red-100 px-3 py-1 rounded-md"
                              >
                                <Trash size={16} />
                                <span className="text-sm">Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      );

                      return isDraggable ? (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              {card}
                            </div>
                          )}
                        </Draggable>
                      ) : (
                        <div key={task._id}>{card}</div>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
