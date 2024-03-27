import React, { useState, useEffect } from 'react';
import { isDesktop, isMobile } from 'react-device-detect';
import { PLAYER_CONTAINER_CLASS } from '../../constants';
import { useVideoProps } from '../../contexts/VideoPropsContext';
import Dialog from '../Dialog';
import DownloadIcon from '../icons/DownloadIcon';
import NestedMenu from '../NestedMenu';
import Popover from '../Popover';
import ControlButton from './ControlButton';

const DownloadOption = ({ filename, url }: { filename: string, url: string }) => {
  const handleDownload = () => {
    console.log(`Downloading ${filename}...`);
    window.open(url, '_blank');
  };

  return (
    <NestedMenu.Item
      onClick={handleDownload}
      title={filename}
      value={url}
      itemKey='1'
    />
  );
};

const DownloadMenu = ({ downloads }: { downloads: { file_name: string, download_url: string }[] }) => (
  <NestedMenu
    style={{
      backgroundColor: 'rgba(0,0,0,0.9)',
      maxHeight: '20rem',
      width: isMobile ? '100%' : '20rem',
      height: 'max-content',
      padding: isMobile ? '1rem' : '0.5rem',
    }}
  >
    {downloads.map((download, index) => (
      <DownloadOption
        key={index}
        filename={download.file_name}
        url={download.download_url}
      />
    ))}
  </NestedMenu>
);

DownloadMenu.displayName = 'DownloadMenu';

const selector = `.${PLAYER_CONTAINER_CLASS}`;

const DownloadButton = () => {
  const { i18n, metadata } = useVideoProps();

  
  return (
    <React.Fragment>
      {isMobile && (
        <Dialog
          portalSelector={selector}
          reference={
            <ControlButton>
              <DownloadIcon />
            </ControlButton>
          }
        >
          <DownloadMenu downloads={metadata?.downloads} />
        </Dialog>
      )}
      {isDesktop && (
        <Popover
          portalSelector={selector}
          reference={
            <ControlButton tooltip={i18n.controls.download}>
              <DownloadIcon />
            </ControlButton>
          }
          position="top"
          overflowElement={selector}
        >
          <DownloadMenu downloads={metadata?.downloads} />
        </Popover>
      )}
    </React.Fragment>
  );
};

export default React.memo(DownloadButton);
