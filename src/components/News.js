import React, { Component } from 'react';
import Newsitem from './Newsitem';

export class News extends Component {
  constructor() {
    super();
    console.log('Hello, I am a constructor from News component');
    this.state = {
      articles: [], // Initialize as an empty array
      loading: false,
    };
  }

  async componentDidMount() {
    try {
      let url =
        'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a6c696ced67945c8afd474b6064cab55';
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({ articles: parsedData.articles || [] }); // Ensure articles is always an array
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h2>NewsMonkey - Daily Updates</h2>
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
                    element.urlToImage || 'https://via.placeholder.com/150'
                  }
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
