import React from 'react';
import { CardFilms } from './CardFilms';

export class ListFilmsSearch extends React.Component {
  render() {
    const { films, activeTab } = this.props;
    return (
      <div className="cardListFilms">
        {films.results.map(film => (
          <CardFilms key={film.id} film={film} activeTab={activeTab} />
        ))}
      </div>
    );
  }
}
