import React from 'react';
import debounce from 'lodash.debounce';

export class SearchPanel extends React.Component {
  onInput = e => {
    const value = e.target.value;
    if (value !== '' && value.trim().length !== 0) {
      this.props.changeValue(value);
    }
  };

  render() {
    const debounceHandlerInput = debounce(this.onInput, 1500);
    const { activeTab } = this.props;
    return (
      <div>
        <div className="buttonSearch">
          <button
            id="Search"
            className={activeTab === 'Search' ? 'active' : 'inactive'}
            onClick={this.props.changeTab}
          >
            Search
          </button>
          <button
            id="Rated"
            className={activeTab === 'Rated' ? 'active' : 'inactive'}
            onClick={this.props.changeTab}
          >
            Rated
          </button>
        </div>
        {activeTab === 'Search' && (
          <input type="text" placeholder="Type to search..." onInput={debounceHandlerInput} />
        )}
      </div>
    );
  }
}
