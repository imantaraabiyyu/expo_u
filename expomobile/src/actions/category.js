import { FIND_CATEGORY_REQUEST } from './constants';

export function findCategories(data) {
  return {
    type: FIND_CATEGORY_REQUEST,
    data: data
  };
}
