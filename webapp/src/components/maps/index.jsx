import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => (
  <div
    style={{
      height: 250,
      width: 250,
      backgroundColor: "blue",
      display: "inline-block",
      borderRadius: "50%",
      opacity: 0.3,
    }}
  ></div>
);

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 31.4467901,
      lng: 74.3939335,
    },
    zoom: 13.5,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBLrmUOoYeLf7Is8nVEXtP8e0lWF2DUetg" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={31.4467901} lng={74.3939335} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
