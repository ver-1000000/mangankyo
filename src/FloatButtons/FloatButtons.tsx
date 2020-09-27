import React from 'react';

import './FloatButtons.css';
import { DownloadOptions } from '../App';

interface Props {
  already: boolean;
  floatButtonsVisibled: boolean;
  floatButtonsDownloadMode: DownloadOptions['mode'];
  setSettingsVisibled: React.Dispatch<boolean>;
  download: (options: DownloadOptions) => void;
}

const FloatButtons = ({ already, floatButtonsVisibled, floatButtonsDownloadMode, setSettingsVisibled, download }: Props) => {
  if (!already || !floatButtonsVisibled) { return null; }

  return (
    <>
      <ul className="FloatButtons-ul">
        <li>
          <input
            type="image"
            className="FloatButtons-button"
            src="./button-download.svg"
            alt="ダウンロードボタン"
            title="キャンバス画像をダウンロード"
            onClick={() => download({ mode: floatButtonsDownloadMode })}
          />
        </li>
        <li>
          <input
            type="image"
            className="FloatButtons-button"
            src="./button-settings.svg"
            alt="設定ボタン"
            title="設定画面を開く"
            onClick={() => setSettingsVisibled(true)}
          />
        </li>
      </ul>
    </>
  )
};

export default FloatButtons;
