import React from 'react';
import { useVideoProps } from '../../../contexts/VideoPropsContext';
import ServerIcon from '../../icons/ServerIcon';
import NestedMenu from '../../NestedMenu';

let servers = [
  { name: "Apollo", flag: "🚀" },
  { name: "Luna", flag: "🌙" },
  { name: "Nova", flag: "🌟" },
  { name: "Stella", flag: "⭐" },
  { name: "Cosmo", flag: "🌌" },
  { name: "Orion", flag: "🔭" }
];


const ServerSwitcherMenu = () => {
  const { metadata } = useVideoProps();
  if (metadata.type === 'tv') {
    servers = [
      { name: "Apollo", flag: "🚀" },
      { name: "Luna", flag: "🌙" }
    ];
  } else {
    console.log(metadata);
  }
  const { i18n } = useVideoProps();
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
    const serverIndex = servers.findIndex(server => server.name === serverName);
    if (serverIndex !== -1) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('server', String(serverIndex + 1));
      window.location.href = newUrl.toString();
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
