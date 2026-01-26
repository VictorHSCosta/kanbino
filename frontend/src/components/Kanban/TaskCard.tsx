/**
 * Task Card Component
 * Displays individual task with drag handle and visual info
 */

import { useState } from 'react';
import type { Task } from '../../types/kanban.types';
import PriorityBadge from './PriorityBadge';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  isDragging?: boolean;
}

export default function TaskCard({
  task,
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging = false,
}: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      draggable={!!onDragStart}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer
        transition-all duration-200
        hover:shadow-md hover:border-indigo-300
        ${isDragging ? 'opacity-50' : ''}
        ${isHovered ? 'transform -translate-y-1' : ''}
      `}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-900 flex-1 pr-2">
          {task.title}
        </h4>
        <PriorityBadge priority={task.priority} />
      </div>

      {task.description && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          {task.assigneeId && (
            <div className="flex items-center">
              <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-medium text-xs">
                  {task.assigneeId.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </div>

        <span className="text-gray-400">
          {new Date(task.createdAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
          })}
        </span>
      </div>

      {onDragStart && (
        <div className="mt-2 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
