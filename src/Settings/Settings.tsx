import React from 'react';
import dialogPolyfill from 'dialog-polyfill';

import './Settings.css';

interface Props {
 className: string;
 canvasRef: React.RefObject<HTMLCanvasElement>;
 scale: number;
 setScale: React.Dispatch<React.SetStateAction<number>>;
 download: () => void;
}

const keydownHandlingCallback =
  (dialogRef: React.RefObject<HTMLDialogElement>, closeModal: () => void, showModal: () => void) => (e: KeyboardEvent) => {
  if (e.keyCode === 27) { // Escape
    e.preventDefault();
    dialogRef.current?.open ? closeModal() : showModal();
  }
};

const clickHandlingCallback = (showModal: () => void) => () => showModal();;

const Settings = (props: Props) => {
  const { setScale, canvasRef, scale } = props;
  const dialogRef          = React.useRef<HTMLDialogElement>(null);
  const scaleRangeInputRef = React.useRef<HTMLInputElement>(null);
  const showModal          = React.useCallback(() => dialogRef.current?.showModal(), []);
  const closeModal         = React.useCallback(() => dialogRef.current?.close(), []);
  const changeInput        = React.useCallback(() => setScale(scaleRangeInputRef.current?.valueAsNumber || 0.5), [setScale]);
  const keydownHandling    = React.useCallback(keydownHandlingCallback(dialogRef, closeModal, showModal), [closeModal, showModal]);
  const clickHandling      = React.useCallback(clickHandlingCallback(showModal), [showModal]);

  React.useEffect(() => document.addEventListener('keydown', keydownHandling, false), [keydownHandling]);
  React.useEffect(() => canvasRef.current?.addEventListener('click', clickHandling, false), [clickHandling, canvasRef]);
  React.useEffect(() => { if (dialogRef.current) { dialogPolyfill.registerDialog(dialogRef.current); } }, [dialogRef]);

  return (
    <>
      <dialog className="Settings-dialog" ref={dialogRef} style={{top: '30px'}}>
        <section>
          <h2>設定</h2>
          <dl>
            <dt>パターンの大きさ</dt>
            <dd>
              <output>{scale}</output>
              <input
                type="range"
                step="0.1"
                min="0.1"
                max="2.0"
                value={scale}
                ref={scaleRangeInputRef}
                onChange={changeInput}
                />
            </dd>
          </dl>
          <dl>
            <dt>現在表示されているキャンバス画像をダウンロード</dt>
            <dd>
              <small>
                ダウンロードが上手く行かない場合は、<br />
                キャンバスを<em>ロングタップ/右クリック</em>してダウンロードしてください。
              </small>
              <button type="button" onClick={props.download}>ダウンロード</button>
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
        <button type="button" onClick={closeModal}>close</button>
      </dialog>
    </>
  );
};

export default Settings;
