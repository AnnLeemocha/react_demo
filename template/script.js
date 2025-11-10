const addBtn = document.querySelector('.add-btn');
const sortBtn = document.querySelector('.sort-btn');
const modal = document.querySelector('.modal');
const closeBtn = document.querySelector('.close');
const modalTitle = document.querySelector('.modal-title');
const todoForm = document.querySelector('.todo-form');
const todoListEl = document.querySelector('.todo-list');
const todoCountEl = document.querySelector('.todo-count');
const searchInput = document.querySelector('.search-input');
const themeToggle = document.querySelector('.theme-toggle');

let todos = [
    { id: 1, title: '買牛奶', time: '2025-10-01T10:00', completed: false },
    { id: 2, title: '完成報告', time: '2025-10-03T14:00', completed: false },
    { id: 3, title: '寄信給老師', time: '2025-09-30T09:00', completed: false },
    { id: 4, title: '打掃房間', time: '2025-10-02T16:00', completed: false },
    { id: 5, title: '運動 30 分鐘', time: '2025-09-29T18:00', completed: false },
];

let editId = null;
let sortAsc = true;

// 打開/關閉彈窗
addBtn.addEventListener('click', () => openModal('新增待辦項目'));
closeBtn.addEventListener('click', () => closeModal());
window.addEventListener('click', e => {
    if (e.target === modal) closeModal();
});

function openModal(title, todo = null) {
    modalTitle.textContent = title;
    modal.style.display = 'block';
    if (todo) {
        document.querySelector('.todo-title').value = todo.title;
        document.querySelector('.todo-time').value = todo.time;
        editId = todo.id;
    } else {
        todoForm.reset();
        editId = null;
    }
}

function closeModal() {
    modal.style.display = 'none';
    editId = null;
}

// 新增/修改待辦
todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const title = todoForm.querySelector('.todo-title').value;
    const time = todoForm.querySelector('.todo-time').value;

    console.log(title, time);


    if (editId) { // 修改
        const todo = todos.find(t => t.id === editId);
        todo.title = title;
        todo.time = time;
    } else { // 新增
        const todo = { id: Date.now(), title, time, completed: false };
        todos.push(todo);
    }

    renderTodos();
    closeModal();
});

// 排序按鈕
sortBtn.addEventListener('click', () => {
    sortAsc = !sortAsc;
    sortBtn.textContent = sortAsc ? '排序: 時間升序' : '排序: 時間降序';
    renderTodos();
});

// 渲染列表（依時間排序）
function renderTodos() {
    todos.sort((a, b) => sortAsc ? new Date(a.time) - new Date(b.time) : new Date(b.time) - new Date(a.time));
    todoListEl.innerHTML = '';
    let completedCount = 0;

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        // if (todo.completed) li.classList.add('completed');

        li.innerHTML = `
            <span>
                <span class="todo-title">${todo.title}</span>
                <span class="todo-time">${todo.time}</span>
            </span>
            <span>
                <button class="edit-btn">修改</button>
                <button class="delete-btn">刪除</button>
            </span>
        `;

        // 再去操作 span:first-child
        if (todo.completed) {
            const firstSpan = li.querySelector('span:first-child');
            if (firstSpan) firstSpan.classList.add('completed');
        }

        // 點擊標題切換完成/取消
        li.addEventListener('click', e => {
            if (e.target.tagName !== 'BUTTON') {
                todo.completed = !todo.completed;
                renderTodos();
            }
        });

        // 修改按鈕
        li.querySelector('.edit-btn').addEventListener('click', e => {
            e.stopPropagation();
            openModal('修改待辦項目', todo);
        });

        // 刪除按鈕
        li.querySelector('.delete-btn').addEventListener('click', e => {
            e.stopPropagation();
            todos = todos.filter(t => t.id !== todo.id);
            renderTodos();
        });

        todoListEl.appendChild(li);
        if (todo.completed) completedCount++;
    });

    todoCountEl.textContent = `待辦清單：(${completedCount}/${todos.length})`;
}

// 搜尋功能
searchInput.addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    Array.from(todoListEl.children).forEach(li => {
        const text = li.querySelector('span:first-child').textContent.toLowerCase();
        li.style.display = text.includes(query) ? '' : 'none';
    });
});

// 切換亮暗模式
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});


// 初始渲染
renderTodos();
