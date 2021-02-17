import { moviesApi, tvApi } from "api";
import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: true
  };
  
  handleSubmit = () => {
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm();
    }
  }

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    try {
      const {
        data: { results: movieResults }
      } = await moviesApi.search(searchTerm);
      const { 
        data: { results: tvResults }
      } = await tvApi.search(searchTerm);
      this.setState({
        movieResults: movieResults,
        tvResults: tvResults
      });
    } catch (error) {
      this.setState({
        error: "Can't fine."
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}