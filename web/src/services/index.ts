import axios from "axios";

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

class Services {
  api() {
    return axios.create({
      baseURL: "http://localhost:3333",
    });
  }

  async getUf() {
    return await axios.get<IBGEUFResponse[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );
  }

  async getCity(uf: string) {
    return await axios.get<IBGECityResponse[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );
  }
}

export default Services;
