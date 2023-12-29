import partyFetch from "../axios/config";

import { useEffect, useState } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import useToast from '../hooks/useToast'

import "./Party.css"

const Party = () => {
  const { id } = useParams();

  const [party, setparty] = useState(null);

  const navigate = useNavigate()

  //loading da festa
  useEffect(() => {
    const loadParty = async () => {
      const res = await partyFetch.get(`/parties/${id}`);
      setparty(res.data);
    };
    loadParty();
  }, []);

    //deletando essa festa
    const handleDelete = async () =>{
        const res = await partyFetch.delete(`/parties/${id}`)

        if(res.status === 200){
            navigate("/")

            useToast(res.data.msg)
        }
    }



  if(!party){
    return <p>Carregando...</p>
  }
  return <div className="party">
    <h1>{party.title}</h1>
    <div className="actions-container">
        <Link className="btn" to={`/party/edit/${id}`}>Editar</Link>
        <button onClick={handleDelete} className="btn-secondary">Excluir</button>
    </div>
    <p>Orçamento: R${party.budget}</p>
    <h3>Serviços contratados:</h3>
    <div className="services-container">
        {party.services.map((service) =>(
            <div className="service" key={service._id}>
                <img src={service.image} alt={service.name} />
                <p>{service.name}</p>
            </div>
        ))}
    </div>

  </div>;
};

export default Party;