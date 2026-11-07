import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function VideoPlayer({ src, mobile, className, ...rest }) {
  const videoUrl = useBaseUrl(src);

  return (
    <video
      className={clsx('dyte-video-showcase', className, mobile && 'mobile')}
      src={videoUrl}
      autoPlay
      loop
      controls={false}
      muted
      {...rest}
    />
  );
}
