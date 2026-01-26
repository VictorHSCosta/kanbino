/**
 * Priority Badge Component
 * Displays task priority with color coding
 */

import type { TaskPriority } from '../../types/kanban.types';

interface PriorityBadgeProps {
  priority: TaskPriority;
}

const priorityConfig = {
  low: {
    label: 'Baixa',
    className: 'bg-green-100 text-green-800 border-green-200',
  },
  medium: {
    label: 'Média',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  high: {
    label: 'Alta',
    className: 'bg-orange-100 text-orange-800 border-orange-200',
  },
  urgent: {
    label: 'Urgente',
    className: 'bg-red-100 text-red-800 border-red-200',
  },
};

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority];

  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded border ${config.className}`}
    >
      {config.label}
    </span>
  );
}
