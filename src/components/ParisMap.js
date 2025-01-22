import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import LoadingSpinner from './LoadingSpinner';

const ParisMap = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace this empty string with your presigned URL
  const presignedUrl = 'https://geojson-paris.s3.us-east-1.amazonaws.com/paris.geojson?response-content-disposition=inline&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQC5S0gA6pMxCjNa4oKmvLlcoPN9lBolX9IgmodIa9qi2wIgN9%2ByJOLm7zJeaU6QhxDEHjJCdOpWvdJ29PS%2BSPT1VTcq1AMI0%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwyNTczOTQ0ODM2MjgiDGHKitIul2uqgKc4ICqoA1BYNhviDgpfyGFrKndth8RRfDccHRucgiyXdRfqZanqdGG%2BfzYIPxkkrwYQXcCjhVMgiHyyhGo4yeeXfN6Rdxwk568wnXd3Yoy8uS4KyYUY9gbOFoednopZoUmryXHpJtOkdoQiq%2FEoVRh3knEgrFplVOOY%2Fug0106A%2BDtgI9H%2FZBHstCRmv9sv4yQKCnW7i%2FmRh49cZvHeSjLrEL2HGcTEcdgn7JlLiHkaYWje9prdaDFwUITEXSKZ7r6JBtOjhmL4NeZGb8%2FtO4SeAZpVo7MhKb6y9WaVrTnQR3TcYaVke5TG3FfBIc0Jrjbttv0RKp34jGGF8tsCOqbT3k4EU8UzWYCcgrzkXNQjdy5rrOoKimqRVbwuuSg6X%2FKMFihedC3%2Bwqi5kwrRgQiZtu%2FOsCwtSAHtbQDa0O1TGr3LZbagpeoPf4OWTjymKYaFLkRq5aO1IRzTsLflnTGog3O9MLVciW68oLbMWAlNhKtAgomQxqImZMLEtgslnSERZG%2BdAOK5zxigYt1A5EUyIZaEyZATIkYVo3s8eFOyG4PqAnbmg3ZWXqMDfu8wiOrCvAY65AI0gUgMByMNNSAqG6qk%2FkscPucQTbugFqCHh0Nb76f51aP%2BrZRsa9Xua6lLdq%2FjzPn8D3jTRdY5Bff1rXLPNO%2B3hJOC38SchKOAxdbN1jvY4ceWblT184fQzpvowF8K6J4vbJkZ7003UvLfU%2BKi1tOvfjZToiNBp%2B%2FNz1R5QYe%2BQoIzwguYo2GcOXS1HEoewEWTHJAyXkYofqYh8raFu0zzBcZJw5sog7O6WRHX8rkl3Vu6od1KHZ4mcE3toJmYN3UeklLAONLX7edYtmcC68iW5D%2B1NvwOiMdH7L0UZJ42EpIfhGiRWLMg7BIjTnpLN1dtZv378Q0Wm3nhIwgX9ueAK19HQ7gk5cCLttnMZrkUh9llyBAuOBvbZwcfhs3zA1OjGmtmrSIzvouAXoPyrqThtZBVVo4L6WXIo9IJkE7XDwKQ7BaKrBFN0xOoGPh1VAZFVq%2FIUVd3lmHKej0CSMcKy9no8Q%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIATX3PIEGWMJRI2WUL%2F20250122%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250122T100113Z&X-Amz-Expires=180&X-Amz-SignedHeaders=host&X-Amz-Signature=210a4744aec0370ab1e6b695ccb2add36e8d01df936ecd4b3c2cd03c14f2b154';

  // Fallback GeoJSON data from your response
  const fallbackGeoJSON = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "coordinates": [
            [
              [1.9443492686975858, 48.83153301456095],
              [1.9767472166413798, 48.85575680090301],
              [1.9836554728177305, 48.85376505346381],
              [1.9922069082878924, 48.85345963915595],
              [1.9956032791973295, 48.855439885922856],
              [2.0129466363911055, 48.85768878559207],
              [2.0194574156199225, 48.85604246712358],
              [2.0212267042239977, 48.85763088481691],
              [2.0237200753923386, 48.85986374773951],
              [2.024994940515327, 48.860935417680125],
              [2.030495981446093, 48.86418191756677],
              [2.0501434026293768, 48.866956660444266]
            ],
            [
              [2.0501434026293768, 48.866956660444266],
              [2.029778793476202, 48.86389729680401],
              [2.026228466134633, 48.862033717749576],
              [2.0236657292508813, 48.85985431048187],
              [2.0211851442289586, 48.85766652043327],
              [2.0194020587712385, 48.85608698301734],
              [2.012217564863374, 48.85792560481857],
              [1.9957671552164293, 48.85542327350857],
              [1.9922069082878924, 48.85345963915595],
              [1.9836554728177305, 48.85376505346381],
              [1.976570235927407, 48.85574629332596],
              [1.9443492686975858, 48.83153301456095]
            ]
          ],
          "type": "MultiLineString"
        },
        "properties": {
          "route_id": "IDFM:C02313",
          "route_short_name": "01",
          "route_long_name": "01",
          "route_type": "Bus",
          "route_color": "CFE2F3",
          "route_url": null,
          "id_ilico": "C02313",
          "operatorname": "Transdev Sud Yvelines",
          "networkname": "Centre et Sud Yvelines",
          "url": "https://ilico.iledefrance-mobilites.fr/uploads/fiches/20241230T145438Z-f76bc4dd-b210-4aed-8f3a-9fc35d67f8a9.pdf",
          "long_name_first": "0",
          "geo_point_2d": {
            "lon": 1.9954105830552935,
            "lat": 48.85373356107776
          }
        }
      }
    ]
  };

  useEffect(() => {
    const fetchGeoJson = async () => {
      try {
        if (!presignedUrl) {
          console.log('Using fallback GeoJSON data');
          setGeoJsonData(fallbackGeoJSON);
          setIsLoading(false);
          return;
        }

        const response = await fetch(presignedUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to load map data: ${response.status}`);
        }

        const data = await response.json();
        setGeoJsonData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading GeoJSON:', error);
        // Use fallback data if fetch fails
        console.log('Using fallback GeoJSON data');
        setGeoJsonData(fallbackGeoJSON);
        setIsLoading(false);
      }
    };
    
    fetchGeoJson();
  }, [presignedUrl]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="map-wrapper">
      <div className="map-container">
        <MapContainer 
          // Center on the route's approximate center
          center={[48.85373356107776, 1.9954105830552935]}
          zoom={13}
          zoomControl={false}
          className="map"
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {geoJsonData && (
            <GeoJSON 
              data={geoJsonData}
              style={(feature) => ({
                color: `#${feature.properties.route_color || '4a90e2'}`,
                weight: 4,
                opacity: 0.7
              })}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default ParisMap;