import React from 'react';
import dialogPolyfill from 'dialog-polyfill';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LineShareButton, LineIcon } from 'react-share';

import { DownloadOptions } from '../App';
import './Settings.css';

interface Props {
  already: boolean;
  scale: number;
  facingMode: MediaTrackConstraints['facingMode'];
  settingsVisibled: boolean;
  floatButtonsVisibled: boolean;
  floatButtonsDownloadMode: DownloadOptions['mode'];
  download: (option: DownloadOptions) => void;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  setFacingMode: React.Dispatch<React.SetStateAction<this['facingMode']>>;
  setFloatButtonsVisibled: React.Dispatch<React.SetStateAction<boolean>>;
  setFloatButtonsDownloadMode: React.Dispatch<React.SetStateAction<DownloadOptions['mode']>>;
  setSettingsVisibled: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * `react-share`で利用する属性値定数郡。
 */
const SHARE = {
  url: 'https://ver-1000000.github.io/mangankyo/',
  title: 'Mangankyo | 万顔鏡',
  via: 'Ver1000000000',
  size: '2rem'
}

/**
 * フロントカメラ / リアカメラを切り替える。
 */
const toggleFacingModeCallback = (facingMode: Props['facingMode'], setFacingMode: Props['setFacingMode']) => () => {
  setFacingMode(facingMode === 'user' ? 'environment' : 'user');
}

/**
 * キーダウンイベントの取り回し。 ESC押下時にモーダルの表示状態を切り替える。
 */
const keydownEffect = (settingsVisibled: boolean, setSettingsVisibled: Props['setSettingsVisibled']) => () => {
  const keydownHandling = (e: KeyboardEvent) => {
    if (e.keyCode === 27) { // Escape
      e.preventDefault();
      setSettingsVisibled(!settingsVisibled);
    }
  };
  document.addEventListener('keydown', keydownHandling);
  return () => document.removeEventListener('keydown', keydownHandling);
};

/**
 * `settingsVisibled`が変更されるのに合わせてdialogの表示を切り替える。
 */
const settingsVisibledEffect = (settingsVisibled: boolean, dialogRef: React.RefObject<HTMLDialogElement>) => () => {
  if (dialogRef.current == null) { return; }
  dialogPolyfill.registerDialog(dialogRef.current);
  if (settingsVisibled && !dialogRef.current.open) {
    dialogRef.current.showModal();
  } else if (!settingsVisibled && dialogRef.current.open) {
    dialogRef.current.close();
  }
  return () => {};
};

const Settings = ({
  already,
  scale,
  setScale,
  facingMode,
  floatButtonsVisibled,
  floatButtonsDownloadMode,
  download,
  setFacingMode,
  setFloatButtonsVisibled,
  setFloatButtonsDownloadMode,
  settingsVisibled,
  setSettingsVisibled
}: Props) => {
  const dialogRef          = React.useRef<HTMLDialogElement>(null);
  const scaleRangeInputRef = React.useRef<HTMLInputElement>(null);
  const toggleFacingMode   = React.useCallback(toggleFacingModeCallback(facingMode, setFacingMode), [facingMode]);
  React.useEffect(keydownEffect(settingsVisibled, setSettingsVisibled), [settingsVisibled, setSettingsVisibled]);
  React.useEffect(settingsVisibledEffect(settingsVisibled, dialogRef), [settingsVisibled, dialogRef, already]);

  if (!already) { return null; }

  return (
    <>
      <dialog
        className="Settings-dialog"
        ref={dialogRef}
        onClick={() => setSettingsVisibled(false)}
        style={{ backgroundImage: 'url(./splash-star.svg)' }}>
        <section onClick={e => e.stopPropagation()}>
          <h2>設定</h2>
          <dl>
            <dt>パターンの大きさ</dt>
            <dd>
              <output>{scaleRangeInputRef.current?.value ?? 0}</output>
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
              <button type="button" className="button" onClick={toggleFacingMode}>切り替える</button>
            </dd>
          </dl>
          <dl>
            <dt>ボタンの表示 / 非表示</dt>
            <dd>
              <small>※ ボタンが非表示の時、キャンバスをクリックすると設定画面が開きます。</small>
              <button type="button" className="button" onClick={() => setFloatButtonsVisibled(!floatButtonsVisibled)}>
                ボタンを{floatButtonsVisibled ? '非表示にする' : '表示する'}
              </button>
            </dd>
          </dl>
          {(() => {
            if (!floatButtonsVisibled) { return; }
            return (
              <dl>
                <dt>
                  ダウンロードボタン
                  <img src="./button-download.svg" className="Settings-download-img" alt="" />
                  のモード
                </dt>
                <dd>
                  <small>
                    ※ 現在は [{floatButtonsDownloadMode === 'display' ? '画面全体' : '最小パターン'}モード] です。
                  </small>
                  <button
                    type="button"
                    className="button"
                    onClick={() => setFloatButtonsDownloadMode(floatButtonsDownloadMode === 'display' ? 'pattern' : 'display')}>
                    [{floatButtonsDownloadMode === 'display' ? '最小パターン' : '画面全体'}モード] にする
                  </button>
                </dd>
              </dl>
            )
          })()}
        </section>
        <section onClick={e => e.stopPropagation()}>
          <h2>ダウンロード</h2>
          <dl>
            <dt>表示されているキャンバス画像を保存</dt>
            <dd>
              <button type="button" className="button" onClick={() => download({ mode: 'display' })}>画面全体</button>
            </dd>
            <dd>
              <button type="button" className="button" onClick={() => download({ mode: 'pattern' })}>最小パターン</button>
            </dd>
          </dl>
        </section>
        <section onClick={e => e.stopPropagation()}>
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
        <section onClick={e => e.stopPropagation()}>
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
        <footer className="Settings-footer" onClick={e => e.stopPropagation()}>
          <button type="button" className="button sky" onClick={() => setSettingsVisibled(false)}>close</button>
        </footer>
      </dialog>
    </>
  );
};

export default Settings;
