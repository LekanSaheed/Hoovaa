import React, {useState, useCallback} from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const Map = () => {
    const containerStyle = {
        width: '400px',
        height: '400px'
    }
    const center = {
        lat: -3.745,
        lng: -38.523
    }
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ''
    })

    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map){
        setMap(null)
    },[])
    return isLoaded ?  (
       <GoogleMap 
       mapContainerStyle={containerStyle}
       center={center}
       zoom={10}
       onLoad={onLoad}
       onUnmount={onUnmount}
       >
           {'Markers'}
       </GoogleMap>
    ) : <div>Loading</div>
}

export default React.memo(Map)
