import React, { useEffect, useRef, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Todos from './Todos';

export default function TodoApp({ changeTheme }) {
    const [val, setVal] = useState('');
    const [todoArray, setTodoArray] = useState([]);
    const errMsgRef = useRef();
    const checkRef = useRef();

    //check Local storage
    useEffect(() => {
        checkStorage();
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

    // saving to localstorage
    function saveFunction() {
        if (val.length > 0) {
            let newTodoArray = [...todoArray, { data: val, completed: false, hide: false }];
            setTodoArray(newTodoArray);

            localStorage.setItem('todos', JSON.stringify(newTodoArray));
            setVal('');
            errMsgRef.current.classList.add('hide');
        } else {
            errMsgRef.current.classList.remove('hide');
        }
    }

    function handleKeyPress(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            saveFunction();
        }
    }

    // // checked function
    function checkedTodo(checkedIndex) {
        const checkedArray = [...todoArray];
        checkedArray[checkedIndex].completed = !checkedArray[checkedIndex].completed;
        setTodoArray(checkedArray);
        localStorage.setItem('todos', JSON.stringify(checkedArray));
    }

    // remove function
    function removeTodo(removedIndex) {
        const filteredArray = todoArray.filter((todo, index) => removedIndex !== index && todo);

        setTodoArray(filteredArray);
        localStorage.setItem('todos', JSON.stringify(filteredArray));
    }

    //filter function
    function filterFunction(filterValue) {
        switch (filterValue) {
            case 'all':
                const allArray = todoArray.map((todo) => ({
                    data: todo.data,
                    completed: todo.completed,
                    hide: false,
                }));
                setTodoArray(allArray);
                break;

            case 'active':
                const activeArray = todoArray.map((todo) => ({
                    data: todo.data,
                    completed: todo.completed,
                    hide: todo.completed || false,
                }));
                setTodoArray(activeArray);
                break;

            case 'completed':
                const completedArray = todoArray.map((todo) => ({
                    data: todo.data,
                    completed: todo.completed,
                    hide: !todo.completed && true,
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
                        errMsgRef={errMsgRef}
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
