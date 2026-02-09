import React from 'react';
import { Rate } from 'antd';

export class CustomRate extends React.Component {
  handleChangeApi = async value => {
    const guestSessionId = JSON.parse(localStorage.getItem('session'));
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTY1MzQyMzdkZWYzZTRkNDc0ZDMzM2UxMDgxYjZiYSIsIm5iZiI6MTc2OTE2NTMyNS4yOTc5OTk5LCJzdWIiOiI2OTczNTIwZGI2ZDlkZGM0YTM4OTNkN2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.I5Rgu1SPzKn_sX6RAwBo_9eAFKrs55wYdQGlO0MxYwo',
        },
        body: JSON.stringify({ value: value }),
      };
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${this.props.movieId}/rating?guest_session_id=${guestSessionId.guest_session_id}`,
        options
      );
    } catch {
      console.error('Ошибка');
    }
  };
  render() {
    const { rating } = this.props;
    return <Rate onChange={this.handleChangeApi} count={10} size="small" value={rating} />;
  }
}
