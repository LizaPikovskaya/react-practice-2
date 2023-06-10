import { Component, useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export const SearchForm = ({onSubmit}) => {
  const [value, setValue] = useState('');

  const handlerOnChange = ({ target }) => {
    setValue(target.value);
    // this.setState({ value: target.value });
  };
  const handlerOnSubmit = evt => {
    evt.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <SearchFormStyled onSubmit={handlerOnSubmit}>
      <FormBtn type="submit">
        <FiSearch size="16px" />
      </FormBtn>
      <InputSearch
        onChange={handlerOnChange}
        placeholder="What do you want to write?"
        name="search"
        required
        autoFocus
        value={value}
      />
    </SearchFormStyled>
  );
};
