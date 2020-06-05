import React, { useEffect, useState, ChangeEvent } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker } from "react-leaflet";

import Services from "../../services";

import "./styles.css";
import logo from "../../assets/logo.svg";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectUf] = useState("0");
  const [selectedCity, setSelectCity] = useState("0");

  useEffect(() => {
    // Busca Items
    (async function () {
      const services = new Services();
      const response = await services.api().get("items");

      if (response.data) {
        setItems(response.data);
      }
    })();
  }, []);

  useEffect(() => {
    // Busca UFs
    (async function () {
      const services = new Services();
      const response = await services.getUf();

      if (response.data) {
        const ufInitials = response.data.map((uf) => uf.sigla);

        setUfs(ufInitials);
      }
    })();
  }, []);

  useEffect(() => {

    if (selectedUf === '0') {
      return;
    }

    // Busca Cidades
    (async function () {
      const services = new Services();

      const response = await services.getCity(selectedUf);

      if (response.data) {
        const cityNames = response.data.map((city) => city.nome);

        setCities(cityNames);
      }

    })();
  }, [selectedUf]);

  const handleSelectUf = (event: ChangeEvent<HTMLSelectElement>) => {

    const uf = event.target.value;

    setSelectUf(uf);
  }

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {

    const city = event.target.value;

    setSelectCity(city);
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <span>
            <FiArrowLeft />
          </span>
          <strong>Voltar para Home</strong>
        </Link>
      </header>

      <form action="">
        <h1>
          Cadastro do <br />
          ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input type="text" name="name" id="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input type="text" name="whatsapp" id="whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={[-23.5593129, -46.8429662]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-23.5593129, -46.8429662]} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" onChange={handleSelectUf}>
                <option value="0">Selecione uma UF</option>
                {ufs.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city" onChange={handleSelectCity}>
                <option value="0">Selecione uma cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de Coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
