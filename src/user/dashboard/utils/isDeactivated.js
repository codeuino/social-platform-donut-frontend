import Store from '../../../store';

export const isDeactivated = () => {
  const state = Store.getState();
  const isActivated = state.user?.userProfile?.isActivated
  console.log('isActivated ', isActivated);
  return !isActivated
}
