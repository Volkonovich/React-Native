import React from "react";
import { View, Text, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => (
  <View>
    <MapView
      tooltip={true}
      showsUserLocation={true}
      minZoomLevel={5}
      style={{ width: "100%", height: 400, marginTop: 30 }}
    >
      <Marker
        title="like photo"
        coordinate={{
          latitude: route.params.info.location.latitude,
          longitude: route.params.info.location.longitude,
        }}
      >
        <Image
          style={{
            width: 40,
            height: 40,
            marginBottom: 20,
            borderRadius: 20,
          }}
          source={{ uri: route.params.info.image }}
        />
      </Marker>
    </MapView>

    <Text>map</Text>
  </View>
);
