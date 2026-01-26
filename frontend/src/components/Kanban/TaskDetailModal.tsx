/**
 * Task Detail Modal Component
 * Displays detailed task information with comments
 */

import { useState, useEffect } from 'react';
import type { Task, Comment, UpdateTaskDto } from '../../types/kanban.types';
import PriorityBadge from './PriorityBadge';

interface TaskDetailModalProps {
  isOpen: boolean;
  task: Task | null;
  comments: Comment[];
  onClose: () => void;
  onUpdateTask: (id: string, data: UpdateTaskDto) => Promise<void>;
  onDeleteTask: (id: string) => Promise<void>;
  onAddComment: (taskId: string, content: string) => Promise<void>;
  onDeleteComment: (commentId: string) => Promise<void>;
  currentUserId?: string;
}

export default function TaskDetailModal({
  isOpen,
  task,
  comments,
  onClose,
  onUpdateTask,
  onDeleteTask,
  onAddComment,
  onDeleteComment,
  currentUserId,
}: TaskDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPriority, setEditedPriority] = useState(task?.priority);
  const [isSaving, setIsSaving] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    if (task) {
      setEditedTitle(task.title);
      setEditedDescription(task.description || '');
      setEditedPriority(task.priority);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSave = async () => {
    if (!editedTitle.trim()) return;

    setIsSaving(true);
    try {
      await onUpdateTask(task.id, {
        title: editedTitle.trim(),
        description: editedDescription.trim() || undefined,
        priority: editedPriority,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
      alert('Erro ao atualizar tarefa.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;

    try {
      await onDeleteTask(task.id);
      onClose();
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Erro ao excluir tarefa.');
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setIsSubmittingComment(true);
    try {
      await onAddComment(task.id, newComment.trim());
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
      alert('Erro ao adicionar comentário.');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Tem certeza que deseja excluir este comentário?')) return;

    try {
      await onDeleteComment(commentId);
    } catch (error) {
      console.error('Failed to delete comment:', error);
      alert('Erro ao excluir comentário.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 pr-4">
              {isEditing ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full text-xl font-semibold text-gray-900 border-b-2 border-indigo-500 focus:outline-none pb-1"
                  maxLength={200}
                />
              ) : (
                <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <PriorityBadge priority={task.priority} />
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            {isEditing ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                placeholder="Descrição da tarefa..."
                maxLength={1000}
              />
            ) : (
              <p className="text-gray-600 whitespace-pre-wrap">
                {task.description || 'Sem descrição'}
              </p>
            )}
          </div>

          {/* Priority (editable) */}
          {isEditing && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Prioridade</label>
              <select
                value={editedPriority}
                onChange={(e) => setEditedPriority(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
                <option value="urgent">Urgente</option>
              </select>
            </div>
          )}

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <span className="font-medium text-gray-700">Status:</span>
              <span className="ml-2 text-gray-600 capitalize">{task.status.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Criada em:</span>
              <span className="ml-2 text-gray-600">
                {new Date(task.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Atualizada em:</span>
              <span className="ml-2 text-gray-600">
                {new Date(task.updatedAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mb-6 pb-6 border-b">
            <div>
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={isSaving || !editedTitle.trim()}
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isSaving ? 'Salvando...' : 'Salvar'}
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditedTitle(task.title);
                      setEditedDescription(task.description || '');
                      setEditedPriority(task.priority);
                    }}
                    disabled={isSaving}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Editar
                </button>
              )}
            </div>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-300 rounded-md hover:bg-red-50"
            >
              Excluir
            </button>
          </div>

          {/* Comments Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Comentários</h3>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                placeholder="Adicione um comentário..."
                maxLength={1000}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingComment || !newComment.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isSubmittingComment ? 'Enviando...' : 'Comentar'}
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">Nenhum comentário ainda.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-medium text-sm">
                            {comment.userId.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">Usuário</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">
                          {new Date(comment.createdAt).toLocaleString('pt-BR')}
                        </span>
                        {comment.userId === currentUserId && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-600 hover:text-red-800 text-xs"
                          >
                            Excluir
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
