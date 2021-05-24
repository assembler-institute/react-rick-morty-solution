import React, { Component } from "react";

import { getCharacter } from "../../api";
import { makePromises, getDataFromResponse } from "../../utils/utils";

import Layout from "../../components/Layout";
import EpisodeCard from "../../components/EpisodeCard";

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
      const characterResponse = await getCharacter(characterId);

      // eslint-disable-next-line compat/compat
      const charactersResponse = await Promise.all(
        makePromises(characterResponse.data.episode),
      );

      const episodes = getDataFromResponse(charactersResponse);

      this.setState({
        character: {
          id: characterResponse.data.id,
          name: characterResponse.data.name,
          image: characterResponse.data.image,
          species: characterResponse.data.species,
          status: characterResponse.data.status,
          origin: characterResponse.data.origin,
          location: characterResponse.data.location,
        },
        episodes: episodes,
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
            <div className="col col-4">
              <img className="h3 Character__img" src={character.image} alt="" />
            </div>
            <div className="col col-8 d-flex align-items-center">
              <div className="row">
                <div className="col col-12">
                  <h1 className="h3">{character.name}</h1>
                </div>
                <div className="col col-12">
                  <hr />
                </div>
                <div className="col col-12">
                  <div className="d-flex flex-column mb-4">
                    <p className="mb-0 mr-2 text-uppercase font-weight-bold">
                      Character
                    </p>
                    <div className="d-flex">
                      <p className="mb-0 mr-2">{character.species}</p>
                      <p className="mb-0 mr-2">|</p>
                      <p className="mb-0">{character.status}</p>
                    </div>
                  </div>
                </div>
                <div className="col col-12">
                  <div className="d-flex">
                    <div className="d-flex flex-column mr-4">
                      <p className="mb-0 mr-2 text-uppercase font-weight-bold">
                        Origin
                      </p>
                      <p className="mb-0">{character.origin.name}</p>
                    </div>
                    <div className="d-flex flex-column">
                      <p className="mb-0 mr-2 text-uppercase font-weight-bold">
                        Location
                      </p>
                      <p className="mb-0">{character.location.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-12">
              <hr />
            </div>
            <div className="col col-12">
              <h2 className="h5">Episodes</h2>
            </div>
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
