import React, { Component } from "react";

// import { getCharacter } from "../../api";
// import { makePromises, getDataFromResponse } from "../../utils/utils";

import Layout from "../../components/Layout";
// import EpisodeCard from "../../components/EpisodeCard";

class Character extends Component {
  constructor(props) {
    super(props);

    this.state = {
      character: null,
      episodes: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
  }

  async componentDidMount() {
    try {
      const { match } = this.props;
      const { characterId } = match.params;
      // const characterResponse = await getCharacter(characterId);
    } catch (error) {
      // this.setState({
      //   errorMessage: error.message,
      //   hasLoaded: true,
      //   hasError: true,
      // });
    }
  }

  render() {
    const {
      character,
      episodes,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;

    return (
      <Layout>
        {hasLoaded && !hasError && (
          <section className="row">
            <div className="col col-12">
              <hr />
            </div>
            <div className="col col-12">
              <h2 className="h5">Episodes</h2>
            </div>
            <div className="col col-12">
              <hr />
            </div>
            {/* {episodes.length > 0 &&
              episodes.map((episode) => (
                <EpisodeCard
                  key={episode.id}
                  id={episode.id}
                  name={episode.name}
                  airDate={episode.air_date}
                  episode={episode.episode}
                />
              ))} */}
          </section>
        )}
        {!hasLoaded && (
          <section className="row">
            <div className="col col-12">
              <h1 className="h3">Loading data...</h1>
            </div>
          </section>
        )}
        {hasError && (
          <section className="row">
            <div className="col col-12">
              <h1>Something went wrong...</h1>
              <p>{errorMessage}</p>
            </div>
          </section>
        )}
      </Layout>
    );
  }
}

export default Character;
