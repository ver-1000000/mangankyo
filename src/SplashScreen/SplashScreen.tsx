import React from 'react';

import './SplashScreen.css';

const SplashScreen = ({ already }: { already: boolean }) => {
  const h1Ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => h1Ref.current?.classList[already ? 'add' : 'remove']('loaded'), [already]);
  return (
    <h1 className="SplashScreen-h1" title="万顔鏡" ref={h1Ref}>
      <img className="SplashScreen-img-logo" alt="万顔鏡 ロゴ画像" src="./splash-logo.svg" />
      <img className="SplashScreen-img-star" alt="" role="presentation" src="./splash-star.svg" />
    </h1>
  );
};

export default SplashScreen;
