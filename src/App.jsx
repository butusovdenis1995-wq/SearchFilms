import React from 'react';
import { ApiFetch } from './components/ApiFetch';
import { SearchPanel } from './components/SearchPanel';
import { ApiResponse } from './components/ApiResponse';
import { CustomPagination } from './components/CustomPagination';
import { ApiGuestSession } from './components/ApiGuestSession';
import { GenresContext } from './components/GenresContext';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: null,
      currentPage: 1,
      totalPages: null,
      guestSessionID: null,
      activeTab: 'Search',
      qntFilmsRated: null,
      currentPageRated: 1,
      listGenres: null,
    };
  }

  getGenres = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTY1MzQyMzdkZWYzZTRkNDc0ZDMzM2UxMDgxYjZiYSIsIm5iZiI6MTc2OTE2NTMyNS4yOTc5OTk5LCJzdWIiOiI2OTczNTIwZGI2ZDlkZGM0YTM4OTNkN2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.I5Rgu1SPzKn_sX6RAwBo_9eAFKrs55wYdQGlO0MxYwo',
      },
    };
    const response = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?language=ru',
      options
    );
    const listGenres = await response.json();
    this.setState({ listGenres: listGenres });
  };

  handleGuestSessionId = session => {
    this.setState({ guestSessionId: session.guest_session_id, expiresAt: session.expires_at });
  };

  handlePagination = (page, pageSize) => {
    this.setState(() => {
      return (this.state.currentPage = page);
    });
  };

  changeValue = val => {
    this.setState(() => {
      return { inputValue: val };
    });
  };

  changeTab = e => {
    this.setState(({ activeTab }) => {
      if (activeTab !== e.target.id) {
        return (this.state.activeTab = e.target.id);
      }
    });
  };

  changeQntFilmsRated = qnt => {
    this.setState(() => {
      return (this.state.qntFilmsRated = qnt);
    });
  };

  handlePaginationRated = page => {
    this.setState({ currentPageRated: page });
  };

  componentDidMount() {
    this.getGenres();
  }

  render() {
    return (
      <section>
        <GenresContext.Provider value={this.state.listGenres}>
          <ApiGuestSession
            handleGuestSessionID={this.handleGuestSessionId}
            guestSessionID={this.state.guestSessionID}
          />
          <SearchPanel
            changeValue={this.changeValue}
            changeTab={e => this.changeTab(e)}
            activeTab={this.state.activeTab}
          />
          <ApiFetch
            searchPhrase={this.state.inputValue}
            currentPage={this.state.currentPage}
            guestSessionID={this.state.guestSessionID}
          >
            {({ data, loading, error }) => (
              <>
                <ApiResponse
                  data={data}
                  loading={loading}
                  error={error}
                  activeTab={this.state.activeTab}
                  changeQntFilmsRated={qnt => this.changeQntFilmsRated(qnt)}
                  currentPageRated={this.state.currentPageRated}
                />
                <CustomPagination
                  data={data}
                  currentPage={this.state.currentPage}
                  handlePagination={(page, pageSize) => this.handlePagination(page, pageSize)}
                  handlePaginationRated={page => this.handlePaginationRated(page)}
                  activeTab={this.state.activeTab}
                  qntFilmsRated={this.state.qntFilmsRated}
                />
              </>
            )}
          </ApiFetch>
        </GenresContext.Provider>
      </section>
    );
  }
}
