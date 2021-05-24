import React, { Component } from "react";

import { getEpisode } from "../../api";
import { makePromises, getDataFromResponse } from "../../utils/utils";

import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      episode: null,
      characters: [],
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };

    this.loadEpisode = this.loadEpisode.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const { episodeId } = match.params;

    this.loadEpisode(episodeId);
  }

  async loadEpisode(episodeId) {
    try {
      const episodeResponse = await getEpisode(episodeId);

      // eslint-disable-next-line compat/compat
      const charactersResponse = await Promise.all(
        makePromises(episodeResponse.data.characters),
      );

      const characters = getDataFromResponse(charactersResponse);

      this.setState({
        episode: episodeResponse.data,
        characters: characters,
        hasLoaded: true,
      });
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
      episode,
      characters,
      hasLoaded,
      hasError,
      errorMessage,
    } = this.state;

    return (
      <Layout>
        {hasLoaded && !hasError && (
          <section className="row">
            <div className="col col-12">
              <h1 className="h3">{episode.name}</h1>
            </div>
            <div className="col col-12">
              <hr />
            </div>
            <div className="col col-12">
              <div className="d-flex">
                <p className="mb-0 mr-2">{episode.episode}</p>
                <p className="mb-0 mr-2">|</p>
                <p className="mb-0">{episode.air_date}</p>
              </div>
              <div className="col col-12">
                <hr />
              </div>
            </div>
            {characters.length > 0 &&
              characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  id={character.id}
                  name={character.name}
                  image={character.image}
                  species={character.species}
                  status={character.status}
                  origin={character.origin}
                  location={character.location}
                />
              ))}
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

export default Episode;
