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
  };

  componentDidUpdate(_, prevState) {
    const { query, page, images } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages(query, page);
    }

    if (prevState.images !== images) {
      setTimeout(() => {
        window.scrollBy({
          top: 140 * 3,
          behavior: 'smooth',
        });
      }, 500);
    }
  }

  getImages = (query, page) => {
    this.setState({ isLoading: true });
    ImageService.getImages(query, page)
      .then(response => {
        const { page: currentPage, per_page, photos, total_results } = response;
        console.log(response);

        if (!photos.length) {
          this.setState({ isEmpty: true });
          return;
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...photos],
          isShowBtn: currentPage < Math.ceil(total_results / per_page),
        }));
      })
      .catch(e => this.setState({ error: e.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handlerOnSubmit = value => {
    console.log(value);
    this.setState({
      query: value,
      page: 1,
      images: [],
      isShowBtn: false,
      isEmpty: false,
      error: null,
    });
  };

  handleClickBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, isLoading, isEmpty, isShowBtn } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handlerOnSubmit} />
        <Grid>
          {images.map(({ id, src: { small }, alt }) => {
            return (
              <GridItem key={id}>
                <CardItem>
                  <img src={small} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>

        {isShowBtn && <Button onClick={this.handleClickBtn}>Load more</Button>}
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {isLoading && <Text textAlign="center">Loading ... </Text>}
      </>
    );
  }
}
