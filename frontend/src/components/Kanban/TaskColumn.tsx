/**
 * Task Column Component
 * Displays a Kanban column with tasks
 */

import { useState } from 'react';
import type { Task, Column } from '../../types/kanban.types';
import TaskCard from './TaskCard';

interface TaskColumnProps {
  column: Column;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onAddTask: () => void;
  onDrop?: (e: React.DragEvent, columnId: string) => void;
  onDragOver?: (e: React.DragEvent) => void;
}

export default function TaskColumn({
  column,
  tasks,
  onTaskClick,
  onAddTask,
  onDrop,
  onDragOver,
}: TaskColumnProps) {
  const [draggedOver, setDraggedOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(true);
    onDragOver?.(e);
  };

  const handleDragLeave = () => {
    setDraggedOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedOver(false);
    onDrop?.(e, column.id);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        flex-shrink-0 w-80 bg-gray-50 rounded-lg p-4
        border-2 transition-colors duration-200
        ${draggedOver ? 'border-indigo-500 bg-indigo-50' : 'border-transparent'}
      `}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-semibold text-gray-900">{column.name}</h3>
          <span className="bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3 mb-4 min-h-[100px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={() => onTaskClick(task)}
            onDragStart={(e) => {
              e.dataTransfer.setData('taskId', task.id);
              e.dataTransfer.effectAllowed = 'move';
            }}
          />
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">
            Arraste tarefas para cá
          </div>
        )}
      </div>

      {/* Add Task Button */}
      <button
        onClick={onAddTask}
        className="w-full py-2 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
      >
        + Adicionar Tarefa
      </button>
    </div>
  );
}
