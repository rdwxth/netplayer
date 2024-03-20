import React from 'react'; // Import React from 'react' instead of using '* as React'
import { useVideo } from '../../../contexts/VideoContext';
import { useVideoProps } from '../../../contexts/VideoPropsContext';
import ServerIcon from '../../icons/ServerIcon';
import NestedMenu from '../../NestedMenu';

const servers = [
  "English",
  "German",
  "Portuguese",
  "French",
  "English (2)",
  "English (3)",
  "English (4)"
];

const ServerSwitcherMenu = () => {
const { i18n } = useVideoProps();
const currentServer = 'Server'; // Implement logic to get the current server
const handleChangeServer = (value: string) => {
    // Implement logic to switch servers
    console.log('Switching to server:', value);
};

  return (
    <NestedMenu.SubMenu
      menuKey="server"
      title={i18n.settings.serverSwitcher}
      activeItemKey={currentServer.toString()}
      icon={<ServerIcon />}
      onChange={handleChangeServer}
    >
      {servers.map((server, index) => (
        <NestedMenu.Item
          key={index}
          itemKey={server}
          title={server}
          value={server}
        />
      ))}
    </NestedMenu.SubMenu>
  );
};

export default React.memo(ServerSwitcherMenu);
