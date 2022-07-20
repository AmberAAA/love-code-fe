import React, { useEffect, useRef } from "react";

export const Camera: React.FC = () => {
  const $video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.navigator.mediaDevices.getUserMedia({ video: true }).then((res) => {
      $video.current!.srcObject = res;
      $video.current!.play();
    });

  }, []);

  return (
    <div>
      <video width={640} height={480} ref={$video}></video>
    </div>
  );
};
