import React, { Component } from "react";

import { getEpisodes } from "../../api";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      paginationInfo: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadEpisodes = this.loadEpisodes.bind(this);
  }

  async componentDidMount() {
    const { page } = this.state;
    this.loadEpisodes(page);
  }

  async componentDidUpdate(_prevProps, prevState) {
    const { page: prevPage } = prevState;
    const { page } = this.state;

    if (prevPage !== page) {
      this.loadEpisodes(page);
    }
  }

  async loadEpisodes(page) {
    try {
      const { data } = await getEpisodes(page);

      this.setState((prevState) => ({
        paginationInfo: data.info,
        episodes: [...prevState.episodes, ...data.results],
        hasLoaded: true,
      }));
    } catch (error) {
      this.setState({
        errorMessage: error.message,
        hasLoaded: true,
        hasError: true,
      });
    }
  }

  render() {
    const {
      paginationInfo,
      episodes,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;

    return (
      <Layout>
        <section className="row">
          {hasLoaded && !hasError && (
            <div className="col col-12">
              <h1>Episodes loaded!</h1>
            </div>
          )}
          {!hasLoaded && (
            <div className="col col-12">
              <h1>Loading episodes...</h1>
            </div>
          )}
          {hasError && (
            <div className="col col-12">
              <h1 className="mb-3">Something went wrong...</h1>
              <hr />
              <p>{errorMessage}</p>
            </div>
          )}
          <div className="col col-12">
            <hr />
          </div>
          {episodes.length > 0 &&
            episodes.map((episode) => (
              <EpisodeCard
                key={episode.id}
                id={episode.id}
                name={episode.name}
                airDate={episode.air_date}
                episode={episode.episode}
              />
            ))}
          <div className="col col-12">
            <hr />
          </div>
          <div className="col col-12 d-flex justify-content-center">
            <button
              className="btn btn-primary"
              type="button"
              disabled={paginationInfo && !paginationInfo.next}
              // onClick={this.setNextPage}
            >
              Load next page
            </button>
          </div>
        </section>
      </Layout>
    );
  }
}

export default Home;
