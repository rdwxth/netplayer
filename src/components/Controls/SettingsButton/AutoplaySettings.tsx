import React from 'react';
import { useVideoProps } from '../../../contexts/VideoPropsContext';
import NestedMenu from '../../NestedMenu';
import AutoplayIcon from '../../icons/AutoplayIcon';

const AutoplaySettings: React.FC = () => {
  const { i18n, setAutoplaySettings, autoplaySettings } = useVideoProps();

  const handleAutoplayToggle = (value: string) => {
    setAutoplaySettings((prev) => ({
      ...prev,
      enabled: value === 'on',
    }));
  };

  const handleAutoplayTimeChange = (value: string) => {
    setAutoplaySettings((prev) => ({
      ...prev,
      timeBeforeEnd: parseInt(value, 10),
    }));
  };

  return (
    <NestedMenu.SubMenu
      menuKey="autoplay"
      title={i18n.settings.autoplay}
      activeItemKey={autoplaySettings.enabled ? 'on' : 'off'}
      icon={<AutoplayIcon />}
      onChange={handleAutoplayToggle}
    >
      <NestedMenu.Item
        itemKey="on"
        title={i18n.settings.autoplayOn}
        value="on"
      />
      <NestedMenu.Item
        itemKey="off"
        title={i18n.settings.autoplayOff}
        value="off"
      />
      {autoplaySettings.enabled && (
        <NestedMenu.SubMenu
          menuKey="autoplay_time"
          title={i18n.settings.autoplayTime}
          activeItemKey={autoplaySettings.timeBeforeEnd.toString()}
          onChange={handleAutoplayTimeChange}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((time) => (
            <NestedMenu.Item
              key={time}
              itemKey={time.toString()}
              title={`${time} minutes`}
              value={time.toString()}
            />
          ))}
        </NestedMenu.SubMenu>
      )}
    </NestedMenu.SubMenu>
  );
};

export default AutoplaySettings;
