import React from "react";
import GoogleMapReact from "google-map-react";

const K_WIDTH = 40;
const K_HEIGHT = 40;
const AnyReactComponent = ({ text }) => (
  <div
    style={{
      height: 450,
      width: 450,
      backgroundColor: "blue",
      // display: "inline-block",
      borderRadius: "50%",
      opacity: 0.3,
      position: "absolute",
      left: -K_WIDTH / 2,
      top: -K_HEIGHT / 2,

      border: "5px solid #f44336",
      // borderRadius: K_HEIGHT,
      // backgroundColor: 'white',
      textAlign: "center",
      color: "#3f51b5",
      fontSize: 16,
      fontWeight: "bold",
      padding: 4,
    }}
  ></div>
);

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 31.4511418,
      lng: 74.2924791,
    },
    zoom: 16.5,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBLrmUOoYeLf7Is8nVEXtP8e0lWF2DUetg" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={31.4511418} lng={74.2924791} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
