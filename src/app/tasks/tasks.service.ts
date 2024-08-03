import { Injectable } from '@angular/core';
import { type newTaskData } from './task/task.model';
import { JsonPipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class TasksService {
  private tasks = [
    {
      id: 't1',
      userId: 'u1',
      title: 'Master Angular',
      summary:
        'Learn all the basics and advanced features of Angular and how to apply them. ',
      dueDate: '2024-09-10',
    },
    {
      id: 't2',
      userId: 'u3',
      title: 'Build First Prototype',
      summary: 'Build a first prototype of online shop website.',
      dueDate: '2024-10-18',
    },
    {
      id: 't3',
      userId: 'u3',
      title: 'Prepare issue template.',
      summary:
        'Prepare and issue an issue template which will help with the project management.',
      dueDate: '2024-12-08',
    },
  ];

  constructor() {
    const tasks = localStorage.getItem('tasks');

    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  getUserTasks(userId: string) {
    return this.tasks.filter((task) => task.userId === userId);
  }

  addTask(taskData: newTaskData, userId: string) {
    this.tasks.unshift({
      id: new Date().getTime().toString(),
      userId: userId,
      title: taskData.title,
      summary: taskData.summary,
      dueDate: taskData.date,
    });
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
