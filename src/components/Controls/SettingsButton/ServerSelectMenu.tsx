import React from 'react';
import { useVideoProps } from '../../../contexts/VideoPropsContext';
import ServerIcon from '../../icons/ServerIcon';
import NestedMenu from '../../NestedMenu';

const ServerSwitcherMenu = () => {
  const { servers, i18n } = useVideoProps();

  const getCurrentServer = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const serverIndex = urlParams.get('server');
    if (serverIndex && servers[Number(serverIndex) - 1]) {
      return servers[Number(serverIndex) - 1].name;
    }
    return '';
  };

  const currentServer = getCurrentServer();

  const handleChangeServer = (serverName: string) => {
    const server = servers.find(server => server.name === serverName);
    if (server) {
      server.onClick();
    }
  };

  return (
    <NestedMenu.SubMenu
      menuKey="server"
      title={i18n.settings.serverSwitcher}
      activeItemKey={currentServer}
      icon={<ServerIcon />}
      onChange={handleChangeServer}
    >
      {servers.map((server, index) => (
        <NestedMenu.Item
          key={index}
          itemKey={server.name}
          title={`${server.flag} ${server.name}`}
          value={server.name}
        />
      ))}
    </NestedMenu.SubMenu>
  );
};

export default React.memo(ServerSwitcherMenu);
