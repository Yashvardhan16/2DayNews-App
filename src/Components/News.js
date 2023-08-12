import React, { useState } from "react";
import Loadingspin from "./Loadingspin";
import PropTypes from "prop-types";
import Newsitem from "./Newsitem";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "react-bootstrap";
import LoadingBar from "react-top-loading-bar";

const News = (props) => {
  const { country = "in", pageSize = 6, category = "general" } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [progress, setProgress] = useState(0);

  const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const updater = async () => {
    setLoading(true);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=e52cf277cbfb49a1b14eefa22b1fb823&page=${page}&pageSize=${pageSize}`;

    let data = await fetch(url);
    let parseddata = await data.json();
    setArticles((prevArticles) => prevArticles.concat(parseddata.articles));
    setTotalResults(parseddata.totalResults);
    setLoading(false);
  };

  const fetchMoreData = async () => {
    setProgress(50); // You can update the loading bar progress as needed
    setPage((prevPage) => prevPage + 1);
    await updater();
    setProgress(100); // Set loading bar to complete when more data is fetched
  };

  React.useEffect(() => {
    document.title = `${capitalize(props.category)} - Newsmokey`;
    updater();
  }, []); // Run this effect only once on mount

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMoreData}
      hasMore={articles.length !== totalResults}
      loader={<Loadingspin />}
    >
      <div className="container my-3">
        <h2
          className="text-center"
          style={{ marginTop: "35px", textAlign: "center" }}
        >
          2DayNews- {capitalize(category)} Headlines
        </h2>
        {/* You can use the 'progress' state here for displaying the loading bar */}
        <LoadingBar color="#f11946" progress={progress} />

        <hr />

        <div className="row">
          {articles.map((Element) => {
            return (
              <div className="col-md-4" key={Element.url}>
                <Newsitem
                  title={Element.title ? Element.title.slice(0, 45) : " "}
                  imgUrl={Element.urlToImage}
                  description={
                    Element.description ? Element.description.slice(0, 90) : " "
                  }
                  newsUrl={Element.url}
                  author={Element.author}
                  publishedAt={Element.publishedAt}
                  source={Element.source.name}
                />
              </div>
            );
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
