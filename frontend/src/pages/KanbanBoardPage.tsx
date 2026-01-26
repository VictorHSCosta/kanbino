/**
 * Kanban Board Page
 * Interactive drag-and-drop board for task management
 */

import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { Project, Task, Column, Comment } from '../types/kanban.types';
import TaskColumn from '../components/Kanban/TaskColumn';
import CreateTaskModal from '../components/Kanban/CreateTaskModal';
import TaskDetailModal from '../components/Kanban/TaskDetailModal';

interface KanbanBoardPageProps {
  onBack: () => void;
  projectId: string;
}

export default function KanbanBoardPage({ onBack, projectId }: KanbanBoardPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [taskComments, setTaskComments] = useState<Comment[]>([]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [projectData, columnsData, tasksData] = await Promise.all([
        apiService.getProject(projectId),
        apiService.getColumns(projectId),
        apiService.getTasks(projectId),
      ]);

      setProject(projectData);
      setColumns(columnsData);
      setTasks(tasksData);

      // Create default columns if none exist
      if (columnsData.length === 0) {
        await createDefaultColumns();
      }
    } catch (err) {
      console.error('Failed to load board data:', err);
      setError('Falha ao carregar dados do quadro.');
    } finally {
      setLoading(false);
    }
  };

  const createDefaultColumns = async () => {
    try {
      const defaultColumns = [
        { name: 'Backlog', status: 'backlog', order: 0 },
        { name: 'A Fazer', status: 'todo', order: 1 },
        { name: 'Em Progresso', status: 'in_progress', order: 2 },
        { name: 'Revisão', status: 'review', order: 3 },
        { name: 'Concluído', status: 'done', order: 4 },
      ];

      for (const col of defaultColumns) {
        await apiService.createColumn(projectId, col);
      }

      // Reload columns after creating defaults
      const columnsData = await apiService.getColumns(projectId);
      setColumns(columnsData);
    } catch (err) {
      console.error('Failed to create default columns:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

  const handleCreateTask = async (data: { title: string; description?: string; columnId: string; priority: string }) => {
    await apiService.createTask(projectId, data);
    await loadData();
  };

  const handleUpdateTask = async (taskId: string, updates: any) => {
    await apiService.updateTask(taskId, updates);
    await loadData();
    if (selectedTask?.id === taskId) {
      const updatedTask = await apiService.getTask(taskId);
      setSelectedTask(updatedTask as Task);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    await apiService.deleteTask(taskId);
    await loadData();
    setSelectedTask(null);
  };

  const handleMoveTask = async (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (!taskId) return;

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      // Get tasks in target column to determine order
      const columnTasks = tasks.filter((t) => t.columnId === targetColumnId);
      const newOrder = columnTasks.length > 0 ? Math.max(...columnTasks.map(t => t.order)) + 1 : 0;

      await apiService.moveTask(taskId, {
        columnId: targetColumnId,
        order: newOrder,
      });

      await loadData();
    } catch (err) {
      console.error('Failed to move task:', err);
      alert('Erro ao mover tarefa.');
    }
  };

  const handleAddComment = async (taskId: string, content: string) => {
    await apiService.addComment(taskId, { content });
    const comments = await apiService.getComments(taskId);
    setTaskComments(comments);
  };

  const handleDeleteComment = async (commentId: string) => {
    await apiService.deleteComment(commentId);
    if (selectedTask) {
      const comments = await apiService.getComments(selectedTask.id);
      setTaskComments(comments);
    }
  };

  const handleTaskClick = async (task: Task) => {
    setSelectedTask(task);
    try {
      const comments = await apiService.getComments(task.id);
      setTaskComments(comments);
    } catch (err) {
      console.error('Failed to load comments:', err);
      setTaskComments([]);
    }
  };

  const getTasksByColumn = (columnId: string) => {
    return tasks.filter((task) => task.columnId === columnId).sort((a, b) => a.order - b.order);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error && !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error}
          <button
            onClick={loadData}
            className="ml-4 text-red-800 underline font-medium"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="text-white hover:text-indigo-200 flex items-center text-sm font-medium"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Voltar
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">{project?.name}</h1>
                {project?.description && (
                  <p className="text-indigo-200 text-sm">{project.description}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowCreateTaskModal(true)}
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition-colors duration-200 shadow-md"
            >
              + Nova Tarefa
            </button>
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="p-6 overflow-x-auto">
        {columns.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhuma coluna encontrada.</p>
            <button
              onClick={createDefaultColumns}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Criar Colunas Padrão
            </button>
          </div>
        ) : (
          <div className="flex space-x-4 min-w-max">
            {columns.map((column) => (
              <TaskColumn
                key={column.id}
                column={column}
                tasks={getTasksByColumn(column.id)}
                onTaskClick={handleTaskClick}
                onAddTask={() => setShowCreateTaskModal(true)}
                onDrop={handleMoveTask}
                onDragOver={(e) => e.preventDefault()}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={showCreateTaskModal}
        onClose={() => setShowCreateTaskModal(false)}
        onSubmit={handleCreateTask}
        columns={columns}
      />

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={!!selectedTask}
        task={selectedTask}
        comments={taskComments}
        onClose={() => setSelectedTask(null)}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
      />
    </div>
  );
}
