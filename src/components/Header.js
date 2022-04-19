import React from 'react';
import '../styles/App.css';
import '../styles/Header.css';

export default function Header({
    saveFunction,
    handleKeyPress,
    val,
    setVal,
    errmsgRef,
    changeTheme,
}) {
    return (
        <header>
            <div className='logoDiv'>
                <h1 className='logo'>T O D O</h1>
                <span className={`themeLogo pointer`} onClick={changeTheme}></span>
            </div>

            <div className={`inptDiv commonStyles`}>
                <label
                    htmlFor='focus-input'
                    className={`writeLogo pointer`}
                    onClick={saveFunction}
                ></label>

                <input
                    type='text'
                    placeholder='Create your list...'
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    onKeyUp={handleKeyPress}
                    id='focus-input'
                />
            </div>

            <div className={`errMsg hide `} ref={errmsgRef}>
                <h4>Please write something !</h4>
            </div>
        </header>
    );
}
