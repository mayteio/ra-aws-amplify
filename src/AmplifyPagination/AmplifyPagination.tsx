import React from 'react';
import { Button } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';

import { useSelector } from 'react-redux';

export function AmplifyPagination(props: any) {
  const nextToken = useSelector<any>(state => state.nextToken);
  if (props.page === 1 && !nextToken) {
    return null;
  }

  // useEffect(() => {
  //   // setFilter((prev: any) => ({ ...prev, nextToken }));
  // }, [nextToken]);

  return (
    <Toolbar>
      {props.page > 1 && (
        <Button
          color="primary"
          key="prev"
          startIcon={<ChevronLeft />}
          onClick={() => props.setPage(props.page - 1)}
        >
          Prev
        </Button>
      )}
      {nextToken && (
        <Button
          color="primary"
          key="next"
          endIcon={<ChevronRight />}
          onClick={() => { props.setPage(props.page + 1); props.setNextToken(nextToken); }}
        >
          Next
        </Button>
      )}
    </Toolbar>
  );
}
