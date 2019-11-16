import React, { useEffect, useRef } from 'react'
import styles from './map.module.scss'
import L from 'leaflet'
import 'leaflet.heat'
import visitService from '../../services/visits'

const getMarkerColor = (val) => {
  if (val > 300) {
    return '#ff0000'
  } else if (val > 200) {
    return '#ffcc00'
  } else if (val > 100) {
    return '#ffff66'
  } else {
    return '#33cc33'
  }
}

const Map = () => {
  const mapRef = useRef(null)
  useEffect(() => {
    mapRef.current = L.map('map', {
      center: [60.2908, 24.5324],
      zoom: 12,
      maxBounds: [
        [82.80, -1000],
        [-82.86, 1000]
      ],
      maxZoom: 18,
      minZoom: 3,
      preferCanvas: true,
      attributionControl: false,
      worldCopyJump: true,
      fadeAnimation: false,
      zoomControl: true,
      maxBoundsViscosity: 1.0,
      layers: [
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          zIndex: 50,
        })
      ]
    })
    const setHeatmap = async () => {
      const result = await visitService.getAll()
      //L.heatLayer(result, { radius: 35 }).addTo(mapRef.current)
      result.forEach(e => {
        L.circle([e[0], e[1]], { radius: 200, color: getMarkerColor(e[2]) }).addTo(mapRef.current)
      });
    }
    const setRoutes = async () => {
      const data = await visitService.getRoute('haukka')
      L.geoJSON(data, {
        style: (feature) => (
          { color: 'red' }
        )
      }).addTo(mapRef.current);
    }
    setRoutes()
    setHeatmap()
    window.map = mapRef.current
  }, [])

  return (
    <div id='map' className={styles.map}></div>
  )
}

export default Map