import * as React from 'react';
import Avatar, { ConfigProvider } from 'react-avatar';

// interface Props {
//   name: string;
//   size: number;
// }

const UserProfileIcon:React.FC<{ name: string; size: string }> = ({
  name,
  size,
}) => (
  <ConfigProvider>
    <Avatar maxInitials={3} name={name} round size={size} />
  </ConfigProvider>
);

export default UserProfileIcon;
