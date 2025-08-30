import { CheckCircle2, Circle, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, getPriorityColor, formatDate } from '@/lib/utils';
import type { Task } from '@/types';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onRemoveTask: (taskId: string) => void;
  onClearCompleted: () => void;
  completedCount: number;
  pendingCount: number;
  className?: string;
}

export function TaskList({
  tasks,
  onToggleTask,
  onRemoveTask,
  onClearCompleted,
  completedCount,
  pendingCount,
  className
}: TaskListProps) {
  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Tasks</h2>
          <div className="text-sm text-gray-500">
            {pendingCount} pending, {completedCount} done
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="max-h-96 overflow-y-auto">
        {tasks.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Plus className="h-8 w-8 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">No tasks yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Say "Add [task name] to my tasks" to get started
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {/* Active Tasks */}
            {activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={() => onToggleTask(task.id)}
                onRemove={() => onRemoveTask(task.id)}
              />
            ))}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <>
                {activeTasks.length > 0 && (
                  <div className="px-4 py-2 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        Completed ({completedCount})
                      </span>
                      {completedCount > 0 && (
                        <Button
                          onClick={onClearCompleted}
                          variant="ghost"
                          size="sm"
                          className="text-xs text-gray-500 hover:text-red-600"
                        >
                          Clear All
                        </Button>
                      )}
                    </div>
                  </div>
                )}
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={() => onToggleTask(task.id)}
                    onRemove={() => onRemoveTask(task.id)}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      {completedCount > 0 && activeTasks.length > 0 && (
        <div className="p-3 border-t border-gray-200 bg-gray-50">
          <Button
            onClick={onClearCompleted}
            variant="outline"
            size="sm"
            className="w-full text-sm"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear {completedCount} completed task{completedCount !== 1 ? 's' : ''}
          </Button>
        </div>
      )}
    </div>
  );
}

interface TaskItemProps {
  task: Task;
  onToggle: () => void;
  onRemove: () => void;
}

function TaskItem({ task, onToggle, onRemove }: TaskItemProps) {
  return (
    <div
      className={cn(
        "p-4 hover:bg-gray-50 transition-colors group",
        task.completed && "opacity-60"
      )}
    >
      <div className="flex items-start space-x-3">
        <button
          onClick={onToggle}
          className="flex-shrink-0 mt-0.5 transition-colors hover:scale-110"
          aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {task.completed ? (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-sm font-medium leading-5",
              task.completed
                ? "text-gray-500 line-through"
                : "text-gray-900"
            )}
          >
            {task.text}
          </p>
          
          <div className="flex items-center mt-1 space-x-2">
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
                getPriorityColor(task.priority)
              )}
            >
              {task.priority}
            </span>
            <span className="text-xs text-gray-500">
              {formatDate(task.createdAt)}
            </span>
          </div>
        </div>

        <button
          onClick={onRemove}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
          aria-label="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}