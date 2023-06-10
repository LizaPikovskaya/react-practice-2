import { Component } from 'react';
import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    isShowBtn: false,
    isEmpty: false,
    error: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      this.getImages(query, page)
    }
  }
  getImages = (query, page) => {
     ImageService.getImages(query, page).then(response => {
       console.log(response);
       this.setState({ images: response.photos });
    });
  }
  handlerOnSubmit = value => {
    console.log(value);
    this.setState({ query: value });
  };
  render() {
    const { images } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handlerOnSubmit} />
        <Grid>
          {images.map(({ id, src:{small}, alt, }) => {
            return (
              <GridItem key={id}>
                <CardItem >
                  <img src={small} alt={alt} />
                </CardItem>
              </GridItem>
            )
          })
          }
        </Grid>
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
