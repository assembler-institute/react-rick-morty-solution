import React, { Component } from "react";

// import { getEpisode } from "../../api";
// import { makePromises, getDataFromResponse } from "../../utils/utils";

import Layout from "../../components/Layout";
// import CharacterCard from "../../components/CharacterCard";

class Episode extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   episode: null,
    //   characters: [],
    //   hasLoaded: false,
    //   hasError: false,
    //   errorMessage: null,
    // };

    // this.loadEpisode = this.loadEpisode.bind(this);
    console.log(this);
  }

  // async componentDidMount() {
  //   const { match } = this.props;
  //   const { episodeId } = match.params;
  //   this.loadEpisode(episodeId);
  // }

  // async loadEpisode(episodeId) {
  //   try {
  //     const episodeResponse = await getEpisode(episodeId);
  //   } catch (error) {}
  // }

  render() {
    return (
      <Layout>
        {/* {characters.map((character) => (
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
            ))} */}

        {/* <h1 className="h3">Loading data...</h1> */}

        {/* <h1>Something went wrong...</h1>
        <p>{errorMessage}</p> */}
      </Layout>
    );
  }
}

export default Episode;
