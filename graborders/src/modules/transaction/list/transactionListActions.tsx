import selectors from 'src/modules/transaction/list/transactionListSelectors';
import Errors from 'src/modules/shared/error/errors';
import TransactionService from 'src/modules/transaction/transactionService';

const prefix = 'TRANSACTION_LIST';

const transactionListActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,
  TOGGLE_ONE_SELECTED: `${prefix}_TOGGLE_ONE_SELECTED`,
  TOGGLE_ALL_SELECTED: `${prefix}_TOGGLE_ALL_SELECTED`,
  CLEAR_ALL_SELECTED: `${prefix}_CLEAR_ALL_SELECTED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  doClearAllSelected() {
    return {
      type: transactionListActions.CLEAR_ALL_SELECTED,
    };
  },

  doToggleAllSelected() {
    return {
      type: transactionListActions.TOGGLE_ALL_SELECTED,
    };
  },

  doToggleOneSelected(id) {
    return {
      type: transactionListActions.TOGGLE_ONE_SELECTED,
      payload: id,
    };
  },

  doReset: () => async (dispatch) => {
    dispatch({
      type: transactionListActions.RESETED,
    });

    dispatch(transactionListActions.doFetch());
  },



  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: transactionListActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(
        transactionListActions.doFetchCurrentFilter(),
      );
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: transactionListActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(transactionListActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        transactionListActions.doFetch(
          filter,
          rawFilter,
          true,
        ),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = false) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: transactionListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await TransactionService.list(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: transactionListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: transactionListActions.FETCH_ERROR,
        });
      }
    },



    doFetchByUser:
    (filter?, rawFilter?, keepPagination = false) =>
    async (dispatch, getState) => {


      try {
        dispatch({
          type: transactionListActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await TransactionService.listbyUser(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: transactionListActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: transactionListActions.FETCH_ERROR,
        });
      }
    },

};

export default transactionListActions;
