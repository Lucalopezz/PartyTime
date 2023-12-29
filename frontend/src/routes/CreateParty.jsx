import partyFetch from "../axios/config";


import { useNavigate } from "react-router-dom";

import useToast from "../hooks/useToast";

import "./Form.css";

import Form from "../components/form/Form";

const CreateParty = () => {


  const navigate = useNavigate();

  const createPartyy = async (party) => {
    try {
      //console.log(party); 
      const res = await partyFetch.post("/parties", party);

      if (res.status === 201) {
        navigate("/");

        useToast(res.data.msg);
      }
    } catch (error) {
      useToast(error.response.data.msg , "error");
    }
  };
  return (
    <div className="form-page">
      <h2>Crie sua próxima Festa</h2>
      <p>Defina o seu orçamento e escolha os serviços</p>
      <Form btnText="Criar Festa" handleSubmit={createPartyy}/>
    </div>
  );
};

export default CreateParty;
