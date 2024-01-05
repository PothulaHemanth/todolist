const todoList = require("../index");

const {all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList} = todoList();

describe('Todo List Functionality', () => {
    beforeAll(() => {
      add(
        { 
         name: 'New Task', 
         dueDate: new Date().toLocaleDateString("en-CA"),
         completed : false 
       }
     );
    }
    )
    // test that checks new todo
    test('Creating a new todo item', () => {
      const todoItemCount = all.length;
      add(
        { 
         name: 'New Task', 
         dueDate: new Date().toLocaleDateString("en-CA"),
         completed : false 
       }
     );
      expect(all.length).toBe(todoItemCount +1);
    });

    // test that checks mark a todo as complete
    test('should mark a todo as complete', () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
      });

    // tasks to check overdue tasks
    test('should mark all todos as overdue', () => {
      const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      const items = overdue();
      items.forEach(item => {
        expect(new Date(item.dueDate)).toBeLessThan(new Date(yesterday));
      });
    });


    // test to check due today tasks
    test('should mark a todo as dueToday', () => {
        const items = dueToday();
        expect(items[0].dueDate).toBe(new Date().toLocaleDateString("en-CA"));
    });

      // test to check duelater tasks
      test('should mark a todo as duelater', () => {
        const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toLocaleDateString();
        const items = dueLater();
        items.forEach(item => {
          expect(new Date(item.dueDate)).toBeGreaterThan(new Date(tomorrow));
        });
    });
      
    
  });

