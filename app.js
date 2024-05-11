const titleElem = document.getElementById('titleNew');
const descElem = document.getElementById('descriptionNew')
const addBtn = document.getElementById('addBtn')
const clearBtn = document.getElementById('clearBtn')
const addTasxUl = document.querySelector('.addTasx')


let todoArray =[]
function addNewList(){
    let title = titleElem.value;
    let desc = descElem.value;

    if(title !='' && desc != ''){
        let newTodoObj ={
            id: todoArray.length + 1,
            title: title,
            description: desc,
            done: false
        }
    
        titleElem.value = '';
        descElem.value = '';
        titleElem.focus();
    
        todoArray.push(newTodoObj)
        setLocal(todoArray)
        todoGenerator(todoArray)
    }
    else{
        alert("Warning!!! Title or Description are Empty")
    }
    
}


function setLocal(todoList){
    localStorage.setItem('todo', JSON.stringify(todoList))
}

function todoGenerator(todoList) {
    let newLi ,newDiv, newTitle, newDesc , newBtn;
    addTasxUl.innerHTML = ''
    todoList.forEach(function(todo){
        newLi = document.createElement('li');
        newLi.className = 'liElem';

        newDiv = document.createElement('div');
        newDiv.className = 'text';

        newTitle = document.createElement('h4');
        newTitle.innerHTML = todo.title;

        newDesc = document.createElement('p');
        newDesc.innerHTML = todo.description;

        newBtn = document.createElement('button');
        newBtn.className = 'done';
        newBtn.innerHTML = 'Done';
        newBtn.setAttribute('onclick', `doneTodo(${todo.id})`)

        if (todo.done){
            newLi.className = 'notDone';
            newBtn.innerHTML = 'Not Done';
        }

        newDiv.append(newTitle,newDesc);
        newLi.append(newDiv , newBtn);
        addTasxUl.append(newLi)
    });
}

function doneTodo(todoId) {
    let localStoragetodos = JSON.parse(localStorage.getItem('todo'))
    todoArray = localStoragetodos;

    todoArray.forEach(function(todo){
        if(todo.id === todoId){
            todo.done = !todo.done
        }
    })
    setLocal(todoArray)
    todoGenerator(todoArray)
}

function getLocal(){
    let localStoragetodos = JSON.parse(localStorage.getItem('todo'));

    if(localStoragetodos){
        todoArray = localStoragetodos;
    }
    else{
        todoArray = []
    }
    todoGenerator(todoArray)
}

function clearList(){
    localStorage.removeItem('todo')
    todoArray = []
    todoGenerator(todoArray)
}





window.addEventListener('load' , getLocal)
clearBtn.addEventListener('click',clearList)
addBtn.addEventListener('click', addNewList)
descElem.addEventListener('keydown', function(e){
    if(e.code === 'Enter'){
        addNewList()
    }
})