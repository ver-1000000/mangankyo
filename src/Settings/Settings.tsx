import React from 'react';
import dialogPolyfill from 'dialog-polyfill';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LineShareButton, LineIcon } from 'react-share';

import { DownloadOptions } from '../App';
import './Settings.css';

interface Props {
  already: boolean;
  className: string;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  facingMode: MediaTrackConstraints['facingMode'];
  setFacingMode: React.Dispatch<React.SetStateAction<this['facingMode']>>;
  download: (option: DownloadOptions) => void;
}

const SHARE = {
  url: 'https://ver-1000000.github.io/mangankyo/',
  title: 'Mangankyo | 万顔鏡',
  via: 'Ver1000000000',
  size: '2rem'
}

/**
 * モーダルの表示状態を切り替える。
 */
const toggleModal = ({ current }: React.RefObject<HTMLDialogElement>) => {
  if (current == null) { return; }
  dialogPolyfill.registerDialog(current);
  if (current.open) {
    current.close();
  } else {
    current.showModal();
  }
};

/**
 * キーダウンイベントの取り回し。 ESC押下時にモーダルの表示状態を切り替える。
 */
const keydownHandlingCallback = (dialogRef: React.RefObject<HTMLDialogElement>) => (e: KeyboardEvent) => {
  if (e.keyCode === 27) { // Escape
    e.preventDefault();
    toggleModal(dialogRef);
  }
};

/**
 * クリックイベントの取り回し。 モーダルの表示状態を切り替える。
 */
const clickHandlingCallback = (dialogRef: React.RefObject<HTMLDialogElement>) => () => {
  toggleModal(dialogRef);
};

/**
 * フロントカメラ / リアカメラを切り替える。
 */
const toggleFacingModeHandlingCallback = (
  setFacingMode: React.Dispatch<React.SetStateAction<MediaTrackConstraints['facingMode']>>,
  facingMode:  MediaTrackConstraints['facingMode']
) => () => {
  setFacingMode(facingMode === 'user' ? 'environment' : 'user');
}

const Settings = ({ already, scale, setScale, facingMode, setFacingMode, canvasRef, download }: Props) => {
  const dialogRef                = React.useRef<HTMLDialogElement>(null);
  const scaleRangeInputRef       = React.useRef<HTMLInputElement>(null);
  const keydownHandling          = React.useCallback(keydownHandlingCallback(dialogRef), []);
  const clickHandling            = React.useCallback(clickHandlingCallback(dialogRef), []);
  const toggleFacingModeHandling = React.useCallback(toggleFacingModeHandlingCallback(setFacingMode, facingMode), []);

  React.useEffect(() => document.addEventListener('keydown', keydownHandling, false), [keydownHandling]);
  React.useEffect(() => canvasRef.current?.addEventListener('click', clickHandling, false), [clickHandling, canvasRef]);

  if (!already) { return null; }

  return (
    <>
      <dialog className="Settings-dialog" ref={dialogRef} style={{ backgroundImage: 'url(./splash-star.svg)' }}>
        <section>
          <h2>設定</h2>
          <dl>
            <dt>パターンの大きさ</dt>
            <dd>
              <output>{scaleRangeInputRef.current?.value}</output>
            </dd>
            <dd>
              <input
                type="range"
                step="0.1"
                min="0.1"
                max="2.0"
                defaultValue={scale}
                ref={scaleRangeInputRef}
              />
            </dd>
            <dd>
              <button
                type="button"
                className="button"
                onClick={() => setScale(scaleRangeInputRef.current?.valueAsNumber || 0.5)}>
                適用する
              </button>
            </dd>
          </dl>
          <dl>
            <dt>フロントカメラ / リアカメラ</dt>
            <dd>
              <small>※ デバイスが認識できない場合は切り替わりません。</small>
              <button type="button" className="button" onClick={toggleFacingModeHandling}>切り替える</button>
            </dd>
          </dl>
        </section>
        <section>
          <h2>ダウンロード</h2>
          <dl>
            <dt>表示されているキャンバス画像を保存</dt>
            <dd>
              <button type="button" className="button" onClick={() => download({ type: 'display' })}>画面全体</button>
            </dd>
            <dd>
              <button type="button" className="button" onClick={() => download({ type: 'pattern' })}>最小パターン</button>
            </dd>
          </dl>
        </section>
        <section>
          <h2>万顔鏡について</h2>
          <dl>
            <dt>Source on GitHub</dt>
            <dd><a href="https://github.com/ver-1000000/mangankyo">mangankyo</a></dd>
          </dl>
          <dl>
            <dt>WebSite / Author</dt>
            <dd>
              <a href="https://ver1000000.com">Ver.1000000</a> / <a href="https://twitter.com/Ver1000000000">@Ver1000000000</a>
            </dd>
          </dl>
        </section>
        <section>
          <h2>SNSで共有</h2>
          <dl>
            <dd className="Settings-shareButton-container">
              <FacebookShareButton url={SHARE.url}>
                <FacebookIcon size={SHARE.size} />
              </FacebookShareButton>
              <TwitterShareButton url={SHARE.url} title={SHARE.title} via={SHARE.via}>
                <TwitterIcon size={SHARE.size} />
              </TwitterShareButton>
              <LineShareButton url={SHARE.url} title={SHARE.title}>
                <LineIcon size={SHARE.size} />
              </LineShareButton>
            </dd>
          </dl>
        </section>
        <footer className="Settings-footer">
          <button type="button" className="button sky" onClick={clickHandling}>close</button>
        </footer>
      </dialog>
    </>
  );
};

export default Settings;
