import React from 'react';
import { CustomRate } from './CustomRate';
import { GenresContext } from './GenresContext';

export class CardFilms extends React.Component {
  date = date => {
    const formDate = new Date(date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return formDate.toLocaleDateString('en-US', options);
  };

  trimText = text => {
    if (text.length <= 205) {
      return text;
    }
    let textTrim = text;
    for (let i = 205; i >= 0; i--) {
      if (text[i] === ' ') {
        textTrim = text.slice(0, i) + ' ...';
        break;
      }
    }
    return textTrim;
  };
  render() {
    const { film, activeTab } = this.props;
    const colorRated =
      film.rating < 3 ? 'red' : film.rating < 5 ? 'orange' : film.rating < 7 ? 'yellow' : 'green';
    return (
      <div className="cardFilms">
        <img
          className="logoFilm"
          src={`https://image.tmdb.org/t/p/w92${film.poster_path}`}
          alt="logo"
        />
        <div className="descriptionCard">
          <h5>
            {film.title}
            {activeTab === 'Rated' && (
              <div className={`circleRated ${colorRated}`}>{film.rating}</div>
            )}
          </h5>
          <span className="dataRelease">{this.date(film.release_date)}</span>
          <GenresContext.Consumer>
            {({ genres }) => (
              <div className="genresFilm">
                {film.genre_ids.map(id => {
                  return (
                    <span key={`${film.id}+${id}`} className="genre">
                      {genres.find(el => el.id === id).name}
                    </span>
                  );
                })}
              </div>
            )}
          </GenresContext.Consumer>

          <div>{this.trimText(film.overview)}</div>
          <div className="rate">
            <CustomRate movieId={film.id} rating={film.rating} />
          </div>
        </div>
      </div>
    );
  }
}
