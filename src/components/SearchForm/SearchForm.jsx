import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    value: '',
  };
  handlerOnChange = ({ target }) => {
    this.setState({ value: target.value });
  };
  handlerOnSubmit = (evt) => {
    evt.preventDefault();
    this.props.onSubmit(this.state.value)
    this.setState({value: ''})
  }

  render() {
    return (
      <SearchFormStyled onSubmit={this.handlerOnSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          onChange={this.handlerOnChange}
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          value={this.state.value}
        />
      </SearchFormStyled>
    );
  }
}
