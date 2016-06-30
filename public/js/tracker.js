document.addEventListener('DOMContentLoaded', () => {
  const socket = io('/')

  const positionOptions = {
    enableHighAccuracy: true,
    maximumAge: 0
  }

  setInterval(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude: lat, longitude: lng } = pos.coords
      socket.emit('updateLocation', { lat, lng })
    }, err => {
      console.error(err)
    }, positionOptions)
  }, 2000)

})
