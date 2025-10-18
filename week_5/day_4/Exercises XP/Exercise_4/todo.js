// TodoList class for managing tasks
export class TodoList {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }

    // Method to add a new task
    addTask(taskDescription) {
        if (!taskDescription || taskDescription.trim() === '') {
            throw new Error('Task description cannot be empty');
        }

        const task = {
            id: this.nextId++,
            description: taskDescription.trim(),
            completed: false,
            createdAt: new Date()
        };

        this.tasks.push(task);
        console.log(`Task added: "${task.description}" (ID: ${task.id})`);
        return task;
    }

    // Method to mark a task as complete
    markTaskComplete(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        
        if (!task) {
            throw new Error(`Task with ID ${taskId} not found`);
        }

        if (task.completed) {
            console.log(`Task "${task.description}" is already completed`);
            return task;
        }

        task.completed = true;
        task.completedAt = new Date();
        console.log(`Task marked as complete: "${task.description}" (ID: ${task.id})`);
        return task;
    }

    // Method to mark a task as incomplete
    markTaskIncomplete(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        
        if (!task) {
            throw new Error(`Task with ID ${taskId} not found`);
        }

        if (!task.completed) {
            console.log(`Task "${task.description}" is already incomplete`);
            return task;
        }

        task.completed = false;
        delete task.completedAt;
        console.log(`Task marked as incomplete: "${task.description}" (ID: ${task.id})`);
        return task;
    }

    // Method to list all tasks
    listAllTasks() {
        if (this.tasks.length === 0) {
            console.log('No tasks found. Your todo list is empty!');
            return this.tasks;
        }

        console.log('\nTodo List:');
        console.log('=' .repeat(60));

        this.tasks.forEach(task => {
            const status = task.completed ? '✅' : '⏳';
            const completedInfo = task.completed ? 
                ` (Completed: ${task.completedAt.toLocaleDateString()})` : '';
            
            console.log(`${status} [ID: ${task.id}] ${task.description}${completedInfo}`);
        });

        console.log('=' .repeat(60));
        return this.tasks;
    }

    // Method to get task statistics
    getStatistics() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(t => t.completed).length;
        const pending = total - completed;

        console.log('\nTask Statistics:');
        console.log(`   Total tasks: ${total}`);
        console.log(`   Completed: ${completed}`);
        console.log(`   Pending: ${pending}`);
        console.log(`   Completion rate: ${total > 0 ? ((completed / total) * 100).toFixed(1) : 0}%`);

        return { total, completed, pending };
    }

    // Method to delete a task
    deleteTask(taskId) {
        const taskIndex = this.tasks.findIndex(t => t.id === taskId);
        
        if (taskIndex === -1) {
            throw new Error(`Task with ID ${taskId} not found`);
        }

        const deletedTask = this.tasks.splice(taskIndex, 1)[0];
        console.log(`Task deleted: "${deletedTask.description}" (ID: ${taskId})`);
        return deletedTask;
    }

    // Method to get tasks by completion status
    getTasksByStatus(completed) {
        const filteredTasks = this.tasks.filter(task => task.completed === completed);
        const statusText = completed ? 'completed' : 'pending';
        
         console.log(`\n${statusText.charAt(0).toUpperCase() + statusText.slice(1)} Tasks:`);
        
        if (filteredTasks.length === 0) {
            console.log(`   No ${statusText} tasks found.`);
        } else {
            filteredTasks.forEach(task => {
                const status = task.completed ? '✅' : '⏳';
                console.log(`   ${status} [ID: ${task.id}] ${task.description}`);
            });
        }

        return filteredTasks;
    }
}
