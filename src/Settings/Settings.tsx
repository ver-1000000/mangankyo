import React from 'react';
import dialogPolyfill from 'dialog-polyfill';

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

const keydownHandlingCallback =
  (dialogRef: React.RefObject<HTMLDialogElement>, closeModal: () => void, showModal: () => void) => (e: KeyboardEvent) => {
  if (e.keyCode === 27) { // Escape
    e.preventDefault();
    dialogRef.current?.open ? closeModal() : showModal();
  }
};

const clickHandlingCallback = (showModal: () => void) => () => showModal();

const Settings = ({ already, scale, setScale, facingMode, setFacingMode, canvasRef, download }: Props) => {
  const dialogRef          = React.useRef<HTMLDialogElement>(null);
  const scaleRangeInputRef = React.useRef<HTMLInputElement>(null);
  const showModal          = React.useCallback(() => dialogRef.current?.showModal(), []);
  const closeModal         = React.useCallback(() => dialogRef.current?.close(), []);
  const keydownHandling    = React.useCallback(keydownHandlingCallback(dialogRef, closeModal, showModal), [closeModal, showModal]);
  const clickHandling      = React.useCallback(clickHandlingCallback(showModal), [showModal]);
  const toggleFacingMode   = React.useCallback(() => setFacingMode(facingMode === 'user' ? 'environment' : 'user'), [facingMode, setFacingMode]);

  React.useEffect(() => document.addEventListener('keydown', keydownHandling, false), [keydownHandling]);
  React.useEffect(() => canvasRef.current?.addEventListener('click', clickHandling, false), [clickHandling, canvasRef]);
  React.useEffect(() => { if (dialogRef.current) { dialogPolyfill.registerDialog(dialogRef.current); } }, [dialogRef]);

  if (!already) { return null; }

  return (
    <>
      <dialog className="Settings-dialog" ref={dialogRef} style={{top: '30px', backgroundImage: 'url(./splash-star.svg)'}}>
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
              <button type="button" onClick={() => setScale(scaleRangeInputRef.current?.valueAsNumber || 0.5)}>
                適用する
              </button>
            </dd>
          </dl>
          <dl>
            <dt>フロントカメラ / リアカメラ</dt>
            <dd>
              <small>※ デバイスが認識できない場合は切り替わりません。</small>
              <button type="button" onClick={toggleFacingMode}>切り替える</button>
            </dd>
          </dl>
        </section>
        <section>
          <h2>ダウンロード</h2>
          <dl>
            <dt>表示されているキャンバス画像を保存</dt>
            <dd>
              <button type="button" onClick={() => download({ type: 'display' })}>画面全体</button>
            </dd>
            <dd>
              <button type="button" onClick={() => download({ type: 'pattern' })}>最小パターン</button>
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
        <footer className="Settings-footer">
          <button type="button" className="sky" onClick={closeModal}>close</button>
        </footer>
      </dialog>
    </>
  );
};

export default Settings;
