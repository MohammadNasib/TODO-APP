import { useState } from 'react';
import '../styles/App.css';
import TodoApp from './TodoApp';

function App() {
    const [theme, setTheme] = useState('dark');

    function changeTheme() {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <>
            <div className='main' data-theme={theme}>
                <TodoApp changeTheme={changeTheme} />
            </div>
        </>
    );
}

export default App;
