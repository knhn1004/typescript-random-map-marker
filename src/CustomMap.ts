export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(public divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0,
      },
    });
  }

  addMarker(item: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: item.location.lat,
        lng: item.location.lng,
      },
      icon: `http://maps.google.com/mapfiles/ms/icons/${item.color}-dot.png`,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: item.markerContent(),
    });

    marker.addListener('click', () => {
      infoWindow.open(this.googleMap, marker);
    });
  }
}
