import React from 'react';

import './App.css';
import Settings from './Settings/Settings';

/**
 * 引数がNullableならエラーを投げる
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
 * 度（deg）を受け取ってラジアン角として返却する。
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
 * シームレス化されたパターン用のcanvasを返す。
 */
const getPattern = (triangle: HTMLCanvasElement) => {
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
  return ctx.createPattern(canvas, 'repeat') as CanvasPattern;
};

/**
 * MediaStreamを読み取り、requestAnimationFrameによるイベントループを開始する。
 */
const play = async (canvas: HTMLCanvasElement | null, scale: number) => {
  assertIsDefined(canvas);
  const streamPromsie     = navigator.mediaDevices.getUserMedia({ audio: false, video: true });
  const stream            = await streamPromsie.catch(err => alert(err.name + ': ' + err.message));
  const video             = Object.assign(document.createElement('video'), { srcObject: stream, onloadeddata });
  const ctx               = canvas.getContext('2d') as CanvasRenderingContext2D;
  const { width, height } = canvas.getBoundingClientRect();
  Object.assign(canvas, { width, height });
  const update = () => {
    const triangleCanvas = getTriangleCanvas(video, { scale });
    ctx.fillStyle        = getPattern(triangleCanvas);
    ctx.fillRect(0, 0, width, height);
    requestAnimationFrame(update);
  };
  video.play().then(() => update());
};

const downloadCanvasImage = (canvas: HTMLCanvasElement | null) => {
  assertIsDefined(canvas);
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
  const [scale, setScale] = React.useState<number>(0.5);
  const canvasRef         = React.useRef<HTMLCanvasElement>(null);
  const download          = React.useCallback(() => downloadCanvasImage(canvasRef.current), []);
  React.useEffect(() => { play(canvasRef.current, scale); }, [scale]);
  return (
    <>
      <canvas ref={canvasRef} className="App-canvas"></canvas>
      <Settings
        className="App-Settings"
        scale={scale}
        setScale={setScale}
        download={download}
        canvasRef={canvasRef}
      />
    </>
  );
};

export default App;
