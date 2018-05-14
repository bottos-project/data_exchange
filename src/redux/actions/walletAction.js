export const SELECT_ACCOUNT = 'SELECT_ACCOUNT'

export function selectAccount(account) {
  return {
    type: SELECT_ACCOUNT,
    account
  };
};
