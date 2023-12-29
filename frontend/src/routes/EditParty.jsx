import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useToast from "../hooks/useToast";
import Form from "../components/form/Form";
import partyFetch from "../axios/config";

const EditParty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [party, setParty] = useState(null);

  // Função para atualizar a festa no servidor
  const updateParty = async (updatedParty) => {
    try {
      // Utilizando o id diretamente do objeto atualizado
      const res = await partyFetch.put(
        `/parties/${updatedParty._id}`,
        updatedParty
      );

      if (res.status === 201) {
        navigate(`/party/${id}`);
        useToast(res.data.msg);
      }
    } catch (err) {
      useToast(err.response.data.msg, "error");
    }
  };

  useEffect(() => {
    // Função assíncrona para carregar a festa
    const loadParty = async () => {
      try {
        const res = await partyFetch.get(`/parties/${id}`);
        setParty(res.data);
      } catch (err) {
        console.error("Erro ao carregar festa:", err);
        // Adicionar tratamento de erro aqui, como redirecionar para uma página de erro
      }
    };

    loadParty();
  }, [id]);

  if (!party) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="form-page">
      <h2>Editando: {party.title}</h2>
      <p>Ajuste as informações da sua festa</p>

      <Form
        handleSubmit={updateParty}
        btnText="Concluir Edição"
        partyData={party || {}}
      />
    </div>
  );
};

export default EditParty;
