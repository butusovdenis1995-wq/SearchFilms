import React from 'react';
import { Pagination } from 'antd';

export class CustomPagination extends React.Component {
  render() {
    const { currentPage, data, handlePagination, activeTab, qntFilmsRated, handlePaginationRated } =
      this.props;
    return (
      <>
        {data && data.results.length !== 0 && activeTab === 'Search' && (
          <div className="Pagination">
            <Pagination
              defaultCurrent={currentPage}
              total={data.total_results}
              pageSize={20}
              showSizeChanger={false}
              align="center"
              onChange={handlePagination}
              size="large"
            />
          </div>
        )}
        {activeTab === 'Rated' && qntFilmsRated !== 0 && (
          <div className="Pagination">
            <Pagination
              defaultCurrent={currentPage}
              total={qntFilmsRated}
              pageSize={20}
              showSizeChanger={false}
              align="center"
              onChange={handlePaginationRated}
              size="large"
            />
          </div>
        )}
      </>
    );
  }
}
