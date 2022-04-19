/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import '../styles/App.css';
import '../styles/Todos.css';

export default function Todos({ todoArray, checkedTodo, removeTodo, show, checkRef }) {
    return (
        <>
            <section className='content'>
                {todoArray.length > 0 ? (
                    todoArray.map((todo, index) => (
                        <div
                            className={`dataDiv commonStyles ${todo.hide ? 'hide' : null} `}
                            key={index}
                        >
                            <span
                                className={`customCheckbox ${todo.completed ? 'checkedbox' : null}`}
                                id={index}
                                ref={checkRef}
                                onClick={() => checkedTodo(index)}
                            ></span>

                            <span className={`data ${todo.completed ? 'checkedData' : null} `}>
                                {todo.data}
                            </span>

                            <span
                                className='remove'
                                id={index}
                                onClick={() => removeTodo(index)}
                            ></span>
                        </div>
                    ))
                ) : (
                    <h2>Lets create a TODO list .</h2>
                )}
            </section>
        </>
    );
}
