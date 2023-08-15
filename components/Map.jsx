import { View, Text, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { auth } from "../Firebase/firebase-setup";
import PressableButton from "./PressableButton";

export default function Map({ hasPermission, initialRegion }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 49.2827,
    longitude: -123.1207,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <>
      {hasPermission ? (
        <>
          <Text>=====</Text>
          <PressableButton>
            <Text>go to my base</Text>
          </PressableButton>
          <Text>=====</Text>
          <MapView
            style={{ flex: 1 }}
            initialRegion={initialRegion}
            provider="google"
            showsUserLocation={true}
            showsMyLocationButton={true}
            onPress={(e) => {
              setSelectedLocation({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              });
            }}
          >
            {selectedLocation && (
              <Marker
                coordinate={{
                  latitude: selectedLocation.latitude,
                  longitude: selectedLocation.longitude,
                }}
              />
            )}
          </MapView>
        </>
      ) : (
        <Text>You need to give access to location</Text>
      )}
    </>
  );
}
