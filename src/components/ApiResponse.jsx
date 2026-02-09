import React from 'react';
import { ListFilmsSearch } from './ListFilmsSearch';
import { Spin, Alert } from 'antd';
import { ListFilmsRated } from './ListFilmsRated';

export class ApiResponse extends React.Component {
  render() {
    const { data, loading, error, activeTab, changeQntFilmsRated, currentPageRated } = this.props;
    return (
      <>
        {!loading && !data && activeTab !== 'Rated' && !error && (
          <div className="notification">Что хотите посмотреть?</div>
        )}
        {loading && (
          <div className="spin">
            <Spin size="large" />
          </div>
        )}
        {data && data.results.length === 0 && (
          <div className="notification">Нет таких фильмов, попробуй еще раз</div>
        )}
        {error && (
          <div>
            {
              <Alert
                title="Оо, ошибочка! Что же делать?"
                description="This is an error message about copywriting."
                type="error"
                showIcon
              />
            }
          </div>
        )}
        {activeTab === 'Search' && data && <ListFilmsSearch films={data} activeTab={activeTab} />}
        {activeTab === 'Rated' && (
          <ListFilmsRated
            changeQntFilmsRated={qnt => changeQntFilmsRated(qnt)}
            activeTab={activeTab}
            currentPageRated={currentPageRated}
          />
        )}
      </>
    );
  }
}
