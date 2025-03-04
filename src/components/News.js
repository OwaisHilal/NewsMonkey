import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.props.category} - NewsMonkey`;
  }

  async updateNews(page) {
    try {
      this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      this.props.setProgress(30);

      let data = await fetch(url);
      let parsedData = await data.json();
      this.props.setProgress(50);
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults,
        page,
        loading: false,
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }

  componentDidMount() {
    this.updateNews(1);
  }

  handleNextClick = () => {
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      this.updateNews(this.state.page + 1);
    }
  };

  handlePreviousClick = () => {
    if (this.state.page > 1) {
      this.updateNews(this.state.page - 1);
    }
  };

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1; // Store next page number

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles || []),
      totalResults: parsedData.totalResults,
      page: nextPage, // Update state with the correct next page number
      loading: false,
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '40px 0px' }}>
          NewsMonkey - Daily Updates on {this.props.category}
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      title={
                        element.title ? element.title.slice(0, 45) : 'No Title'
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 88)
                          : 'No Description'
                      }
                      imageUrl={
                        element.urlToImage ||
                        'https://via.placeholder.com/150?text=No+Image'
                      }
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark mx-2"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-dark mx-2"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
