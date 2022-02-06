import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Aviso } from '../../componentes/outros/aviso';
import '../../css/mapa.css';
import { Fetch } from '../../utilidades/utils/fetch';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default function Mapa(props) {
    const [prop] = useState(props['props']);
    // console.log(prop);

    // Ao carregar o componente, set a coordenada;
    const [coordenada, setCoordenada] = useState(null);
    useEffect(() => {
        async function getCoordenadas() {
            const numeroEndereco = prop.numeroEndereco;
            const rua = prop.rua;
            const cidade = prop.cidades.nome;

            if (!rua || !cidade) {
                Aviso.warn('Houve um erro ao encontrar a localização desse estabelecimento no mapa!', 5000);
                console.log('Rua: ' + rua + '. Cidade: ' + cidade);
                return false;
            }

            const baseUrlNomatim = 'https://nominatim.openstreetmap.org/';
            const urlPais = 'country=Brazil';
            const urlCidade = 'city=' + cidade;
            const urlRua = (numeroEndereco) ? ('street=' + numeroEndereco + ' ' + rua) : ('street=' + rua);
            const urlFormato = 'format=json';
            const urlParametrosNomatim = 'search?' + urlPais + '&' + urlCidade + '&' + urlRua + '&' + urlFormato;
            const urlFinalNominatim = baseUrlNomatim + urlParametrosNomatim;
            // console.log(urlFinalNominatim);

            let resposta = await Fetch.getApi(urlFinalNominatim);
            if (resposta) {
                if (resposta[0]) {
                    var latitude = resposta[0].lat;
                    var longitude = resposta[0].lon;

                    const coordenadaJson = [latitude, longitude];
                    setCoordenada(coordenadaJson);
                } else {
                    Aviso.warn(`A rua "${rua.replace('Rua ', '')}" da cidade "${cidade}" não foi localizada no mapa!`, 5000);
                }
            } else {
                Aviso.warn('Houve um erro ao encontrar a localização desse estabelecimento no mapa!', 5000);
            }
        }

        getCoordenadas();
    }, [prop.cidades.nome, prop.numeroEndereco, prop.rua]);

    // Enquanto não finalizar o "coordenada"...
    if (!coordenada) {
        return null;
    }

    return (
        <div className='mt-3 sem-highlight'>
            <MapContainer center={coordenada} zoom={14} scrollWheelZoom={true} className='mapa'>
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={coordenada}>
                    <Popup>
                        <span>{prop.nome}</span>
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

