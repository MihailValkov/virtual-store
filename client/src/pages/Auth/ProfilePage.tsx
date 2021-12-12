import { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppRootState } from '../../+store/store';
import Profile from '../../components/profile/Profile';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const ProfilePage: FC<{}> = () => {
  const user = useSelector((state: AppRootState) => state.auth.user);
  if (!user) {
    return <LoadingSpinner />;
  }

  return <Profile user={user} />;
};

export default ProfilePage;
