import Input from "./Input";
import TextArea from "./TextArea";

import SubmitButton from "./SubmitButton";

import { useState, useEffect } from "react";

import partyFetch from "../../axios/config";

const Form = ({ handleSubmit, btnText, partyData }) => {
  const [party, setparty] = useState(partyData || {});
  const [services, setservices] = useState([]);
  const [partyServices, setpartyServices] = useState(partyData?.services || []);

  const handleServices = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.filter((s) => s._id === value);

    if (checked) {
      setpartyServices((services) => [...services, filteredService[0]]);
    } else {
      setpartyServices((services) => services.filter((s) => s._id !== value));
    }
  };
  const handleServicesEdit = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const filteredService = services.find((s) => s._id === value);

    let updatedPartyServices;

    if (checked) {
      updatedPartyServices = party.services
        ? [...party.services, filteredService]
        : [filteredService];
    } else {
      updatedPartyServices = party.services
        ? party.services.filter((s) => s._id !== value)
        : [];
    }

    setparty((prevParty) => ({ ...prevParty, services: updatedPartyServices }));
  };

  const submit = (e) => {
    e.preventDefault();
    const updatedParty = {
      ...party,
      services: partyServices,
    };

    // Verifica se a party já possui um ID para determinar se é uma operação de edição
    const isEditOperation = party._id !== undefined;

    // Envia party se for edição, caso contrário, envia updatedParty
    handleSubmit(isEditOperation ? party : updatedParty);
  };

  function handleChange(e) {
    setparty({ ...party, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    const loadServices = async () => {
      const res = await partyFetch.get("/services");

      setservices(res.data);
    };
    loadServices();
  }, []);

  return (
    <form onSubmit={submit}>
      <Input
        text="Nome da festa"
        name="title"
        type="text"
        placeholder="Seja criativo..."
        required
        handleOnChange={handleChange}
        value={party.title || ""}
      />
      <Input
        text="Anfitrião"
        name="author"
        type="text"
        placeholder="Quem vai dar a festa?"
        required
        handleOnChange={handleChange}
        value={party.author || ""}
      />
      <TextArea
        text="Descrição"
        name="description"
        handleOnChange={handleChange}
        value={party.description || ""}
        placeholder="Conte mais sobre a festa"
      />
      <Input
        text="Orçamento"
        name="budget"
        type="number"
        placeholder="Quanto você pretentede investir?"
        required
        handleOnChange={handleChange}
        value={party.budget || ""}
      />
      <Input
        text="Imagem"
        name="image"
        type="text"
        placeholder="URL da imagem da festa"
        required
        handleOnChange={handleChange}
        value={party.image || ""}
      />
      <div>
        <h2>Escolha os serviços</h2>
        <div className="services-container">
          {services.length === 0 && <p>Carregando...</p>}
          {party.services ? (
            <div className="services-container">
              {services.length > 0 &&
                services.map((service) => (
                  <div className="service" key={service._id}>
                    <img src={service.image} alt={service.name} />
                    <p className="service-name">{service.name}</p>
                    <p className="service-price">R${service.price}</p>
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        value={service._id}
                        onChange={(e) => handleServicesEdit(e)}
                        checked={
                          party.services.find(
                            (partyService) => partyService._id === service._id
                          ) || ""
                        }
                      />
                      <p>Marque para solicitar</p>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="services-container">
              {services.length > 0 &&
                services.map((service) => (
                  <div className="service" key={service._id}>
                    <img src={service.image} alt={service.name} />
                    <p className="service-name">{service.name}</p>
                    <p className="service-price">R${service.price}</p>
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        value={service._id}
                        onChange={(e) => handleServices(e)}
                      />
                      <p>Marque para solicitar</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
      <SubmitButton value={btnText} classname="btn" />
    </form>
  );
};

export default Form;
