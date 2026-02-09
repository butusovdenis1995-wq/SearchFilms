import React from 'react';

export class ApiFetch extends React.Component {
  constructor() {
    super();
    this.state = {
      data: null,
      loading: false,
      error: false,
    };
  }
  fetchData = async () => {
    try {
      const guestSessionId = JSON.parse(localStorage.getItem('session'));
      this.setState({ loading: true });
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTY1MzQyMzdkZWYzZTRkNDc0ZDMzM2UxMDgxYjZiYSIsIm5iZiI6MTc2OTE2NTMyNS4yOTc5OTk5LCJzdWIiOiI2OTczNTIwZGI2ZDlkZGM0YTM4OTNkN2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.I5Rgu1SPzKn_sX6RAwBo_9eAFKrs55wYdQGlO0MxYwo',
        },
      };
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(this.props.searchPhrase)}&include_adult=false&language=ru-RU&page=${this.props.currentPage}&guest_session_id=${guestSessionId.guest_session_id}`,
        options
      );
      if (!response.ok) {
        throw new Error();
      }
      const listFilm = await response.json();
      this.setState({ data: listFilm, loading: false });
    } catch {
      this.setState({ loading: false, error: true });
    }
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.searchPhrase !== prevProps.searchPhrase ||
      this.props.currentPage !== prevProps.currentPage
    ) {
      this.fetchData();
    }
  }

  render() {
    return this.props.children(this.state);
  }
}
