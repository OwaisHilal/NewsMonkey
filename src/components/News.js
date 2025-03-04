import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async (page) => {
    try {
      props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);

      props.setProgress(30);

      let data = await fetch(url);
      let parsedData = await data.json();
      props.setProgress(50);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setPage(page);
      setLoading(false);

      props.setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    document.title = `${props.category} - NewsMonkey`;
    updateNews(1);
  }, []);

  // const handleNextClick = () => {
  //   if (page + 1 <= Math.ceil(totalResults / props.pageSize)) {
  //     updateNews(page + 1);
  //   }
  // };

  // const handlePreviousClick = () => {
  //   if (page > 1) {
  //     updateNews(page - 1);
  //   }
  // };}

  const fetchMoreData = async () => {
    const nextPage = page + 1; // Store next page number

    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
    setLoading(true);

    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles || []));
    setTotalResults(parsedData.totalResults);
    setPage(nextPage);
    setLoading(false);
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: '40px 0px', marginTop: '90px' }}
      >
        NewsMonkey - Daily Updates on {props.category}
      </h1>

      {/* {loading && <Spinner />} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
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
              Math.ceil(this.state.totalResults / props.pageSize)
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
};

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
