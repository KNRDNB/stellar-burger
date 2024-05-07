import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../services/slices/user';

export const AppHeader: FC = () => {
  const userData = useSelector(userSelectors.selectUser);

  return <AppHeaderUI userName={userData ? userData.name : ''} />;
};
