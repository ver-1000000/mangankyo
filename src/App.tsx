import React from 'react';

import './App.css';
import SplashScreen from './SplashScreen/SplashScreen';
import Settings from './Settings/Settings';

/**
 * ダウンロード時のオプション。
 */
export interface DownloadOptions {
  /** *"display"時は画面全体を、"pattern"時は最小パターンをダウンロードする。 */
  type: 'display' | 'pattern';
}

/**
 * `play`関数に渡すオプション。
 */
interface PlayOptions {
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
const getPatternCanvasContext = (triangle: HTMLCanvasElement) => {
  const [canvas, ctx] = createCanvas({ width: triangle.width * 3, height: triangle.height * 2 });
  const drawTransform = (transform: { rotate?: number, scaleX?: number, scaleY?: number, translateX?: number, translateY?: number }) => {
    const { rotate = 0, scaleX = 1, scaleY = 1, translateX = 0, translateY = 0 } = transform;
    ctx.setTransform(1, 0, 0, 1,  canvas.width / 3, canvas.height / 2);
    ctx.rotate(rad(rotate));
    ctx.scale(scaleX, scaleY);
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
  return ctx;
};

/**
 * エラーハンドリング用関数。
 */
const errorHandling = (err: any) => {
  if (err instanceof OverconstrainedError) {
    alert(`${err.name}:\n  要求されたデバイスが見つかりません。\n  設定を変更してください。`)
  } else {
    alert(err.name + ': ' + err.message);
  }
}

/**
 * MediaStreamを読み取り、requestAnimationFrameによるイベントループを開始する。
 */
const play = async (video: HTMLVideoElement, { canvas, scale, facingMode, setPatternCanvas, setAlready }: PlayOptions) => {
  assertIsDefined(canvas);
  const streamPromsie     = navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode } });
  const stream            = await streamPromsie.catch(errorHandling);
  video.srcObject         = stream || null;
  const ctx               = canvas.getContext('2d') as CanvasRenderingContext2D;
  const { width, height } = canvas.getBoundingClientRect();
  Object.assign(canvas, { width, height });
  const update = () => {
    const triangleCanvas   = getTriangleCanvas(video, { scale });
    const patternCanvasCtx = getPatternCanvasContext(triangleCanvas);
    ctx.fillStyle          = patternCanvasCtx.createPattern(patternCanvasCtx.canvas, 'repeat')!;
    ctx.fillRect(0, 0, width, height);
    setPatternCanvas(patternCanvasCtx.canvas);
    if (!video.paused) { requestAnimationFrame(update); }
  };
  await video.play().then(() => update()).then(() => setAlready(true));
  return video;
};

/**
 * 渡されたcanvasからpngを生成し、ダウンロードさせる。
 * {@param pattern} options.typeが"pattern"のとき、`pattern`のwidth/heightを利用して`main`を切り抜く
 */
const downloadImage = (main: HTMLCanvasElement | null, pattern: HTMLCanvasElement | null, options: DownloadOptions) => {
  assertIsDefined(main);
  assertIsDefined(pattern);
  const { width, height } = options.type === 'display' ? main : pattern;
  const [canvas, ctx] = createCanvas({ width, height });
  ctx.drawImage(main, 0, 0);
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

const App = () => {
  const [already, setAlready]             = React.useState<boolean>(false);
  const [facingMode, setFacingMode]       = React.useState<PlayOptions['facingMode']>('environment');
  const [scale, setScale]                 = React.useState<number>(0.5);
  const [patternCanvas, setPatternCanvas] = React.useState<HTMLCanvasElement | null>(null);
  const video     = document.createElement('video');
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const download  = React.useCallback((options: DownloadOptions) => downloadImage(canvasRef.current, patternCanvas, options), [patternCanvas]);
  React.useEffect(() => {
    play(video, { canvas: canvasRef.current, scale, facingMode, setPatternCanvas, setAlready });
    return () => {
      /** streanのリリースとvideoのポーズを行い、既存のイベントループを停止する。 */
      if (video.srcObject instanceof MediaStream) { video.srcObject.getTracks().forEach(track => track.stop()); }
      video.pause();
    };
  }, [video, scale, facingMode]);
  return (
    <>
      <canvas ref={canvasRef} className="App-canvas"></canvas>
      <SplashScreen already={already} />
      <Settings
        className="App-Settings"
        already={already}
        scale={scale}
        setScale={setScale}
        facingMode={facingMode}
        setFacingMode={setFacingMode}
        download={download}
        canvasRef={canvasRef}
      />
    </>
  );
};

export default App;
