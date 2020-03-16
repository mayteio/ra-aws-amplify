import React from 'react';
import { Button } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Toolbar from '@material-ui/core/Toolbar';

import { connect } from 'react-redux';

function UnconnectedRaAmplifyPagination(props: any) {
  if (props.page === 1 && !props.nextToken) {
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
      {props.nextToken && (
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

const mapStateToProps = (state: any) => ({ nextToken: state.nextToken });

export const RaAmplifyPagination = connect(mapStateToProps)(
  UnconnectedRaAmplifyPagination
);
