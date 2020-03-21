import React from 'react';
import { Button } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';

import { useSelector } from 'react-redux';

export function AmplifyPagination(props: any) {
  const nextToken: any = useSelector<any>(
    state => state.nextTokens[`list${props.resource}s`]
  );
  // need to somehow know

  if (props.page === 1 && !nextToken) {
    return null;
  }

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
          onClick={() => props.setPage(props.page + 1)}
        >
          Next
        </Button>
      )}
    </Toolbar>
  );
}
