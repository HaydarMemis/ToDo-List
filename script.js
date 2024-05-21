document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskButton = document.getElementById('addTaskButton');
  const categorySelect = document.getElementById('categorySelect');
  const dateInput = document.getElementById('dateInput');
  const workTaskList = document.getElementById('workTaskList');
  const personalTaskList = document.getElementById('personalTaskList');
  const themeToggle = document.getElementById('themeToggle');
  const languageSelect = document.getElementById('languageSelect');

  addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      const category = categorySelect.value;
      const dueDate = dateInput.value;
      if (taskText !== '') {
          addTask(taskText, category, dueDate);
          taskInput.value = '';
          dateInput.value = '';
      }
  });

  document.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete')) {
          e.target.closest('li').remove();
      }
      if (e.target.classList.contains('edit')) {
          const li = e.target.closest('li');
          const span = li.querySelector('span.task-text');
          const input = document.createElement('input');
          input.type = 'text';
          input.value = span.textContent;
          li.insertBefore(input, span);
          li.removeChild(span);
          e.target.textContent = 'Save';
          e.target.classList.remove('edit');
          e.target.classList.add('save');
      } else if (e.target.classList.contains('save')) {
          const li = e.target.closest('li');
          const input = li.querySelector('input[type="text"]');
          const span = document.createElement('span');
          span.textContent = input.value;
          span.className = 'task-text';
          li.insertBefore(span, input);
          li.removeChild(input);
          e.target.textContent = 'Edit';
          e.target.classList.remove('save');
          e.target.classList.add('edit');
      } else if (e.target.classList.contains('add-subtask')) {
          const subtaskInput = e.target.previousElementSibling;
          const subtaskText = subtaskInput.value.trim();
          if (subtaskText !== '') {
              addSubtask(subtaskInput.closest('li'), subtaskText);
              subtaskInput.value = '';
          }
      } else if (e.target.classList.contains('toggle-reminder')) {
          e.target.closest('li').classList.toggle('reminder');
      }
  });

  themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  });

  languageSelect.addEventListener('change', () => {
      const language = languageSelect.value;
      setLanguage(language);
  });

  function addTask(taskText, category, dueDate) {
      const li = document.createElement('li');

      const taskHeader = document.createElement('div');
      taskHeader.className = 'task-header';

      const span = document.createElement('span');
      span.textContent = taskText;
      span.className = 'task-text';

      const taskActions = document.createElement('div');
      taskActions.className = 'task-actions';

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.className = 'edit';

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete';

      const reminderButton = document.createElement('button');
      reminderButton.textContent = 'Reminder';
      reminderButton.className = 'toggle-reminder';

      taskActions.appendChild(editButton);
      taskActions.appendChild(deleteButton);
      taskActions.appendChild(reminderButton);

      taskHeader.appendChild(span);
      taskHeader.appendChild(taskActions);

      const taskDetails = document.createElement('div');
      taskDetails.className = 'task-details';

      const dueDateSpan = document.createElement('span');
      dueDateSpan.textContent = `Due: ${dueDate}`;
      taskDetails.appendChild(dueDateSpan);

      const subtaskInput = document.createElement('input');
      subtaskInput.type = 'text';
      subtaskInput.placeholder = 'Add a subtask...';
      taskDetails.appendChild(subtaskInput);

      const addSubtaskButton = document.createElement('button');
      addSubtaskButton.textContent = 'Add Subtask';
      addSubtaskButton.className = 'add-subtask';
      taskDetails.appendChild(addSubtaskButton);

      const subtasks = document.createElement('ul');
      subtasks.className = 'subtask-list';
      taskDetails.appendChild(subtasks);

      li.appendChild(taskHeader);
      li.appendChild(taskDetails);

      if (category === 'work') {
          workTaskList.appendChild(li);
      } else {
          personalTaskList.appendChild(li);
      }
  }

  function addSubtask(taskLi, subtaskText) {
      const subtaskLi = document.createElement('li');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';

      const span = document.createElement('span');
      span.textContent = subtaskText;

      subtaskLi.appendChild(checkbox);
      subtaskLi.appendChild(span);

      const subtasks = taskLi.querySelector('.subtask-list');
      subtasks.appendChild(subtaskLi);
  }

  function setLanguage(language) {
      const translations = {
          en: {
              title: 'To-Do List',
              addTaskPlaceholder: 'Add a new task...',
              workTitle: 'Work',
              personalTitle: 'Personal',
              addTaskButton: 'Add',
              editButton: 'Edit',
              deleteButton: 'Delete',
              reminderButton: 'Reminder',
              addSubtaskButton: 'Add Subtask'
          },
          tr: {
              title: 'Yapılacaklar Listesi',
              addTaskPlaceholder: 'Yeni görev ekle...',
              workTitle: 'İş',
              personalTitle: 'Kişisel',
              addTaskButton: 'Ekle',
              editButton: 'Düzenle',
              deleteButton: 'Sil',
              reminderButton: 'Hatırlatıcı',
              addSubtaskButton: 'Alt Görev Ekle'
          }
      };

      const elementsToTranslate = {
          title: document.getElementById('title'),
          taskInput: document.getElementById('taskInput'),
          workTitle: document.getElementById('workTitle'),
          personalTitle: document.getElementById('personalTitle'),
          addTaskButton: document.getElementById('addTaskButton'),
      };

      const currentTranslations = translations[language];
      elementsToTranslate.title.textContent = currentTranslations.title;
      elementsToTranslate.taskInput.placeholder = currentTranslations.addTaskPlaceholder;
      elementsToTranslate.workTitle.textContent = currentTranslations.workTitle;
      elementsToTranslate.personalTitle.textContent = currentTranslations.personalTitle;
      elementsToTranslate.addTaskButton.textContent = currentTranslations.addTaskButton;

      document.querySelectorAll('.edit').forEach(btn => btn.textContent = currentTranslations.editButton);
      document.querySelectorAll('.delete').forEach(btn => btn.textContent = currentTranslations.deleteButton);
      document.querySelectorAll('.toggle-reminder').forEach(btn => btn.textContent = currentTranslations.reminderButton);
      document.querySelectorAll('.add-subtask').forEach(btn => btn.textContent = currentTranslations.addSubtaskButton);
  }

  // Set default language on page load
  setLanguage(languageSelect.value);
});
