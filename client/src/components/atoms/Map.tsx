import React, { useRef, useEffect } from "react";

import "./Map.css";

type Props = {
 center: any;
 zoom: number;
 className?: string;
 style?: React.CSSProperties;
};

const Map: React.FC<Props> = ({ center, zoom, className = "", style = {} }) => {
 const mapRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
  if (!mapRef.current) {
   return;
  }

  const map = new window.google.maps.Map(mapRef.current, {
   center,
   zoom,
  });

  new window.google.maps.Marker({ position: center, map });
 }, [center, zoom]);

 return <div ref={mapRef} className={`map ${className}`} style={style}></div>;
};

export default Map;
