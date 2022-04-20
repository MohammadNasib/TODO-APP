import React from 'react';
import '../styles/App.css';
import '../styles/Footer.css';

export default function Footer({ todoArray, filterFunction, clearCompleted }) {
    return (
        <div>
            <div className='bottomItems'>
                <div className='leftItemBtn'>
                    <span>{todoArray.length}</span> items
                </div>

                <span className={`clearBtn pointer`} onClick={clearCompleted}>
                    Clear Completed
                </span>

                <div className='filter'>
                    <label>
                        <input
                            type='radio'
                            name='filter'
                            id='all'
                            defaultChecked={'all'}
                            onChange={() => filterFunction('all')}
                        />
                        <span>All</span>
                    </label>

                    <label>
                        <input
                            type='radio'
                            name='filter'
                            id='active'
                            onChange={() => filterFunction('active')}
                        />
                        <span>Active</span>
                    </label>
                    <label>
                        <input
                            type='radio'
                            name='filter'
                            id='completed'
                            onChange={() => filterFunction('completed')}
                        />
                        <span>Completed</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
