import React from 'react';
import { CardFilms } from './CardFilms';

export class ListFilmsRated extends React.Component {
  constructor() {
    super();
    this.state = {
      films: null,
    };
  }

  apiFetchRated = async () => {
    const guestSessionId = JSON.parse(localStorage.getItem('session'));
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTY1MzQyMzdkZWYzZTRkNDc0ZDMzM2UxMDgxYjZiYSIsIm5iZiI6MTc2OTE2NTMyNS4yOTc5OTk5LCJzdWIiOiI2OTczNTIwZGI2ZDlkZGM0YTM4OTNkN2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.I5Rgu1SPzKn_sX6RAwBo_9eAFKrs55wYdQGlO0MxYwo',
      },
    };
    const response = await fetch(
      `https://api.themoviedb.org/3/guest_session/${guestSessionId.guest_session_id}/rated/movies?language=ru-RU&page=${this.props.currentPageRated}`,
      options
    );
    if (!response.ok) {
      throw new Error();
    }
    const listFilmRated = await response.json(response);
    const qntFilms = listFilmRated.total_results;
    this.setState({ films: listFilmRated.results });
    this.props.changeQntFilmsRated(qntFilms);
  };

  componentDidMount() {
    this.apiFetchRated();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentPageRated !== prevProps.currentPageRated) {
      this.apiFetchRated();
    }
  }

  render() {
    console.log('ListFilmsRatedRender');
    const { films } = this.state;
    return (
      <>
        {films && (
          <div className="cardListFilms">
            {films.map(film => (
              <CardFilms key={film.id} film={film} activeTab={this.props.activeTab} />
            ))}
          </div>
        )}
      </>
    );
  }
}
