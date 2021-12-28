import { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppRootState } from '../../+store/store';

import Profile from '../../components/profile/Profile';


const ProfilePage: FC<{}> = () => {
  const user = useSelector((state: AppRootState) => state.auth.user);

  return <Profile user={user!} />;
};

export default ProfilePage;
