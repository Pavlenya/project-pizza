import React from 'react';
import { setSearchValue } from '../../redux/slices/filterSlice';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns='http://www.w3.org/2000/svg'
        height='512'
        viewBox='0 0 512 512'
        width='512'
      >
        <title />
        <path d='M464,428,339.92,303.9a160.48,160.48,0,0,0,30.72-94.58C370.64,120.37,298.27,48,209.32,48S48,120.37,48,209.32s72.37,161.32,161.32,161.32a160.48,160.48,0,0,0,94.58-30.72L428,464ZM209.32,319.69A110.38,110.38,0,1,1,319.69,209.32,110.5,110.5,0,0,1,209.32,319.69Z' />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder='Поиск пиццы...'
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          xmlns='http://www.w3.org/2000/svg'
          height='512px'
          id='Layer_1'
          version='1.1'
          viewBox='0 0 512 512'
          width='512px'
        >
          <path d='M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z' />
        </svg>
      )}
    </div>
  );
};

export default Search;
