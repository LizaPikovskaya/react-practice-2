import { Component } from 'react';
import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  componentDidMount() {
    ImageService.getImages('cat', 1).then(response => {
      console.log(response);
    });
  }
  handlerOnSubmit = value => {
    console.log(value);
  };
  render() {
    return (
      <>
        <SearchForm onSubmit={this.handlerOnSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
