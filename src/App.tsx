import React from 'react';

import './App.css';
import FloatButtons from './FloatButtons/FloatButtons';
import SplashScreen from './SplashScreen/SplashScreen';
import Settings from './Settings/Settings';

/**
 * ダウンロード時のオプション。
 */
export interface DownloadOptions {
  /** *"display"時は画面全体を、"pattern"時は最小パターンをダウンロードする。 */
  mode: 'display' | 'pattern';
}

/**
 * `play`関数に渡すオプション。
 */
interface PlayOptions {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement | null;
  scale: number;
  setAlready: React.Dispatch<boolean>;
  setPatternCanvas: React.Dispatch<HTMLCanvasElement>;
  facingMode: MediaTrackConstraints['facingMode'];
}

/**
 * 引数がNullableならエラーを投げるアサーション関数。
 */
function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val == null) {
    alert('レンダリングエラー: ページを再読込してください。');
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
}

/**
 * エラーハンドリング用関数。
 */
const errorOnAlert = (error: Error) => {
  if (error instanceof OverconstrainedError) {
    alert(`${error.name}:\n要求されたデバイスが見つかりません。\n設定を変更してください。`)
  } else {
    alert(`${error.name}:\n${error.message}`);
  }
  return null;
}

/**
 * 現在時刻を取得するお助け関数。
 */
const now = () => new Date().toLocaleString('ja-JP', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: 'numeric'
}).replace(/\D/g, '');

/**
 * 度（deg）を受け取ってラジアン角として返却するお助け関数。
 */
const rad = (deg: number) => deg * Math.PI / 180;

/**
 * width/heightを設定したHTMLCanvasElement/CanvasRenderingContext2Dを返すお助け関数。
 */
const createCanvas = ({ width, height }: { width: number, height: number }) => {
  const canvas = Object.assign(document.createElement('canvas'), { width, height });
  const ctx    = canvas.getContext('2d') as CanvasRenderingContext2D;
  return [canvas, ctx] as const;
};

/**
 * videoから正三角形に切り抜かれた基準となるcanvasを返す。
 */
const getTriangleCanvas = (video: HTMLVideoElement, { scale }: { scale: number }) => {
  const width         = Math.min(video.videoWidth, video.videoHeight) * scale;
  const height        = width / 2 * Math.tan(rad(60)); // 正三角形の高さ
  const [canvas, ctx] = createCanvas({ width, height });
  const points        = [{ x: width / 2, y: 0 }, { x: width, y: height }, { x: 0, y: height }];
  const shiftX        = -Math.max(0, (video.videoWidth - video.videoHeight) / 2);
  const shiftY        = -Math.max(0, (video.videoHeight - video.videoWidth) / 2);
  ctx.save();
  ctx.scale(scale, scale);
  ctx.drawImage(video, shiftX, shiftY, video.videoWidth, video.videoHeight);
  ctx.restore();
  ctx.globalCompositeOperation = 'destination-in';
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  ctx.lineTo(points[1].x, points[1].y);
  ctx.lineTo(points[2].x, points[2].y);
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  return canvas;
};

/**
 * シームレス化されたパターン用のCanvasRenderingContext2Dを返す。
 */
const getPatternCanvasContext = (triangle: HTMLCanvasElement, setPatternCanvas: React.Dispatch<HTMLCanvasElement>) => {
  const [canvas, ctx] = createCanvas({ width: triangle.width * 3, height: triangle.height * 2 });
  const drawTransform = (transform: { rotate?: number, scaleY?: number, translateX?: number, translateY?: number }) => {
    const { rotate = 0, scaleY = 1, translateX = 0, translateY = 0 } = transform;
    ctx.setTransform(1, 0, 0, 1,  canvas.width / 3, canvas.height / 2);
    ctx.rotate(rad(rotate));
    ctx.scale(1, scaleY);
    ctx.translate(translateX, translateY);
    ctx.drawImage(triangle, -canvas.width / 3, -canvas.height / 2);
  }
  drawTransform({ rotate: 0,   scaleY: 1 });
  drawTransform({ rotate: 0,   scaleY: -1 });
  drawTransform({ rotate: 0,   scaleY: 1,  translateX: triangle.width * 1.5, translateY: triangle.height });
  drawTransform({ rotate: 0,   scaleY: -1, translateX: triangle.width * 1.5, translateY: triangle.height });
  drawTransform({ rotate: 120, scaleY: 1 });
  drawTransform({ rotate: 120, scaleY: -1 });
  drawTransform({ rotate: 120, scaleY: 1,  translateX: 0,                    translateY: -triangle.height * 2 });
  drawTransform({ rotate: 120, scaleY: -1, translateX: 0,                    translateY: triangle.height * 2 });
  drawTransform({ rotate: 120, scaleY: 1,  translateX: triangle.width * 1.5, translateY: triangle.height });
  drawTransform({ rotate: 240, scaleY: 1 });
  drawTransform({ rotate: 240, scaleY: -1 });
  drawTransform({ rotate: 240, scaleY: 1,  translateX: 0,                    translateY: triangle.height * 2 });
  drawTransform({ rotate: 240, scaleY: -1, translateX: 0,                    translateY: -triangle.height * 2 });
  drawTransform({ rotate: 240, scaleY: -1, translateX: triangle.width * 1.5, translateY: triangle.height });
  setPatternCanvas(canvas);
  return ctx.createPattern(ctx.canvas, 'repeat')!;
};

/**
 * WebカメラのMediaStreamを返す。 初期化処理も行う。
 */
const getWebcamStream = async (video: HTMLVideoElement, facingMode: MediaTrackConstraints['facingMode']) => {
   // モバイルでは新しいストリームを取得する前に、trackをすべてstopする必要がある
  if (video.srcObject instanceof MediaStream) { video.srcObject.getTracks().forEach(track => track.stop()); }
  return navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode } }).catch(errorOnAlert);
};

/**
 * MediaStreamを読み取り、requestAnimationFrameによるイベントループを開始する。
 */
const play = async (video: HTMLVideoElement, { canvas, scale, facingMode, setPatternCanvas, setAlready }: PlayOptions) => {
  assertIsDefined(canvas);
  video.srcObject         = await getWebcamStream(video, facingMode);
  const ctx               = canvas.getContext('2d') as CanvasRenderingContext2D;
  const { width, height } = canvas.getBoundingClientRect();
  Object.assign(canvas, { width, height });
  const update = () => {
    const triangleCanvas   = getTriangleCanvas(video, { scale });
    ctx.fillStyle          = getPatternCanvasContext(triangleCanvas, setPatternCanvas);
    ctx.fillRect(0, 0, width, height);
    if (!video.paused) { requestAnimationFrame(update); }
  };
  await video.play().then(() => update()).then(() => setAlready(true));
  return video.srcObject;
};

/**
 * 渡されたcanvasからpngを生成し、ダウンロードさせる。
 * {@param pattern} options.modeが"pattern"のとき、`pattern`のwidth/heightを利用して`main`を切り抜く
 */
const downloadCallback = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  pattern: HTMLCanvasElement | null
) => (options: DownloadOptions) => {
  assertIsDefined(canvasRef.current);
  assertIsDefined(pattern);
  const { width, height } = options.mode === 'display' ? canvasRef.current : pattern;
  const [canvas, ctx] = createCanvas({ width, height });
  ctx.drawImage(canvasRef.current, 0, 0);
  const anchor = document.createElement('a');
  const img    = document.createElement('img');
  document.body.appendChild(anchor);
  document.body.appendChild(img);
  anchor.href     = img.src = canvas.toDataURL()
  anchor.download = `mangankyo_${now()}.png`;
  anchor.click();
  anchor.remove();
  img.remove();
};

/**
 * オンメモリー上でAPIを提供し続けるためのvideo。
 */
const VIDEO = (() => {
  const internalVideo = document.createElement('video');
  ['playsinline', 'muted', 'autoplay'].forEach(attr => internalVideo.setAttribute(attr, '')); // Mobile Safariでの再生に必須
  return internalVideo;
})();

/**
 * 値の変更に連動し、videoの再生と停止などを行う。
 */
const startPlayEffect = ({
  video,
  canvasRef,
  scale,
  facingMode,
  setPatternCanvas,
  setAlready
}: Omit<PlayOptions, 'canvas'> & { canvasRef: React.RefObject<HTMLCanvasElement> }) => () => {
  if (typeof navigator.mediaDevices?.getUserMedia !== `function`) {
    errorOnAlert(new Error('お使いのブラウザはgetUserMedia()に未対応です。\n他のブラウザをご利用ください。'));
    return;
  }
  const streamPromise = play(video, { video, canvas: canvasRef.current, scale, facingMode, setPatternCanvas, setAlready });
  return () => {
    setAlready(false);
    streamPromise.then(() => video.paused || video.pause()).then(() => setAlready(true));
  };
};

const App = () => {
  const [already, setAlready]                                   = React.useState<boolean>(false);
  const [floatButtonsVisibled, setFloatButtonsVisibled]         = React.useState<boolean>(true);
  const [floatButtonsDownloadMode, setFloatButtonsDownloadMode] = React.useState<DownloadOptions['mode']>('display');
  const [settingsVisibled, setSettingsVisibled]                 = React.useState<boolean>(false);
  const [facingMode, setFacingMode]                             = React.useState<PlayOptions['facingMode']>('user');
  const [scale, setScale]                                       = React.useState<number>(0.5);
  const [patternCanvas, setPatternCanvas]                       = React.useState<HTMLCanvasElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const download  = React.useCallback(downloadCallback(canvasRef, patternCanvas), [patternCanvas]);
  const video     = VIDEO;
  React.useEffect(startPlayEffect({
    video,
    canvasRef,
    scale,
    facingMode,
    setPatternCanvas,
    setAlready
  }), [canvasRef, scale, facingMode]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="App-canvas"
        style={{ pointerEvents: floatButtonsVisibled ? 'none' : 'auto' }}
        onClick={() => setSettingsVisibled(true)}>
      </canvas>
      <SplashScreen already={already} />
      <FloatButtons
        already={already}
        floatButtonsVisibled={floatButtonsVisibled}
        floatButtonsDownloadMode={floatButtonsDownloadMode}
        download={download}
        setSettingsVisibled={setSettingsVisibled}
      />
      <Settings
        already={already}
        scale={scale}
        facingMode={facingMode}
        floatButtonsVisibled={floatButtonsVisibled}
        floatButtonsDownloadMode={floatButtonsDownloadMode}
        download={download}
        setScale={setScale}
        setFacingMode={setFacingMode}
        settingsVisibled={settingsVisibled}
        setSettingsVisibled={setSettingsVisibled}
        setFloatButtonsVisibled={setFloatButtonsVisibled}
        setFloatButtonsDownloadMode={setFloatButtonsDownloadMode}
      />
    </>
  );
};

export default App;
