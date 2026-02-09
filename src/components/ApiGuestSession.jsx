import React from 'react';

export class ApiGuestSession extends React.Component {
  componentDidMount() {
    const session = JSON.parse(localStorage.getItem('session'));
    if (!session) {
      this.createNewSession();
    } else if (new Date(session.expires_at) >= new Date()) {
      this.props.handleGuestSessionID(session);
    } else {
      this.createNewSession();
    }
  }
  createNewSession = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTY1MzQyMzdkZWYzZTRkNDc0ZDMzM2UxMDgxYjZiYSIsIm5iZiI6MTc2OTE2NTMyNS4yOTc5OTk5LCJzdWIiOiI2OTczNTIwZGI2ZDlkZGM0YTM4OTNkN2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.I5Rgu1SPzKn_sX6RAwBo_9eAFKrs55wYdQGlO0MxYwo',
        },
      };
      const response = await fetch(
        `https://api.themoviedb.org/3/authentication/guest_session/new?`,
        options
      );
      if (!response.ok) {
        throw new Error('Не ок');
      }
      const guestSessionId = await response.json();
      localStorage.setItem('session', JSON.stringify(guestSessionId));
      this.props.handleGuestSessionID(JSON.parse(localStorage.getItem('session')));
    } catch {
      console.error('Не удалось создать сессию');
    }
  };
  render() {
    return null;
  }
}
