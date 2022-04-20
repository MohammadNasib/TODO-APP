import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Todos from './Todos';

export default function TodoApp({ changeTheme }) {
    const [val, setVal] = useState('');
    const [todoArray, setTodoArray] = useState([]);
    const errmsgRef = useRef();
    const checkRef = useRef();

    //check Local storage
    useEffect(() => {
        checkStorage();
        console.log('rendered');
    }, []);

    function checkStorage() {
        const todos = localStorage.getItem('todos');
        if (todos !== null) {
            let tempArray = JSON.parse(todos).map((todo) => ({
                data: todo.data,
                completed: todo.completed,
                hide: false,
            }));
            setTodoArray(tempArray);
        }
    }

    // theme changer

    // saving to localstorage
    function saveFunction() {
        if (val.length > 0) {
            let newTodoArray = [...todoArray, { data: val, completed: false, hide: false }];
            setTodoArray(newTodoArray);

            localStorage.setItem('todos', JSON.stringify(newTodoArray));
            setVal('');
            errmsgRef.current.classList.add('hide');
        } else {
            errmsgRef.current.classList.remove('hide');
        }

        // console.log(checkBox);
    }

    function handleKeyPress(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            saveFunction();
        }
    }

    // // checked function
    function checkedTodo(index1) {
        const checkedArray = [...todoArray];
        checkedArray[index1].completed = !checkedArray[index1].completed;
        setTodoArray(checkedArray);
        localStorage.setItem('todos', JSON.stringify(checkedArray));
    }

    // remove function
    function removeTodo(index1) {
        const removedArray = todoArray.filter((todo, index) => index1 !== index && todo);

        setTodoArray(removedArray);
        localStorage.setItem('todos', JSON.stringify(removedArray));
        console.log(removedArray);
    }

    //filter function
    function filterFunction(filter) {
        switch (filter) {
            case 'all':
                console.log('this is all');
                const allArray = todoArray.map((todo) => ({
                    data: todo.data,
                    completed: todo.completed,
                    hide: false,
                }));
                setTodoArray(allArray);
                break;
            case 'active':
                console.log('this is active');
                const activeArray = todoArray.map((todo) => ({
                    data: todo.data,
                    completed: todo.completed,
                    hide: todo.completed ? true : false,
                }));
                setTodoArray(activeArray);
                break;
            case 'completed':
                console.log('this is completed');
                const completedArray = todoArray.map((todo) => ({
                    data: todo.data,
                    completed: todo.completed,
                    hide: todo.completed ? false : true,
                }));
                setTodoArray(completedArray);
                break;
            default:
                console.log('this is default');
        }
        localStorage.setItem('todos', JSON.stringify(todoArray));
    }

    // clear completed function
    function clearCompleted() {
        const clearedArray = todoArray.filter((todo) => !todo.completed && todo);
        setTodoArray(clearedArray);
        localStorage.setItem('todos', JSON.stringify(clearedArray));
    }

    return (
        <>
            {todoArray && (
                <>
                    <Header
                        saveFunction={saveFunction}
                        handleKeyPress={handleKeyPress}
                        val={val}
                        errmsgRef={errmsgRef}
                        setVal={setVal}
                        changeTheme={changeTheme}
                    />

                    <Todos
                        todoArray={todoArray}
                        checkedTodo={checkedTodo}
                        removeTodo={removeTodo}
                        checkRef={checkRef}
                    />
                    <Footer
                        todoArray={todoArray}
                        filterFunction={filterFunction}
                        clearCompleted={clearCompleted}
                    />
                </>
            )}
        </>
    );
}
