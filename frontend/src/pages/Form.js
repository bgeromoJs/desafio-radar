import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { BubbleLoader  } from 'react-css-loaders';

import './Form.css';
import api from '../api';

export default function Form({history}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stat, setStat] = useState('');
  const [error, setError] = useState(false);

  const formType = useSelector(state => state.form.formState);
  const userId = useSelector(state => state.userId.userId);
  
  useEffect(()=> {
    if(formType === 'update') {
      getuser();
    }
    if(formType === 'create') {
      reset();
    }

  }, [userId])
  
  function reset() {
    setName('');
    setEmail('');
    setAddress('');
    setCity('');
    setStat('');
  }

  const getuser = async () => {
    const response = await api.get(`users/${userId}`)
    setName(response.data.name)
    setEmail(response.data.email)
    setAddress(response.data.address)
    setCity(response.data.city)
    setStat(response.data.state)
  }
  
  

  async function submit() {
    setLoading(true);
    
    if(name === '' || email === '' || address === '' || city === '' || stat === ''){
      setLoading(false);
      return setError(true)
    }

    let form = {
      name,
      email,
      address,
      city,
      state: stat
    }

    if(formType === 'create') {
      await api.post('users', form)
        .then(function (response) {
          setLoading(false);
          history.push('/');
        })
        .catch(function (error) {
          console.log(error)
          return setLoading(false);
        });
    }
    if(formType === 'update'){
      await api.put(`users/${userId}`, form)
        .then(function (response) {
          setLoading(false);
          history.push('/');
        })
        .catch(function (error) {
          console.log(error)
          return setLoading(false);
        });
    }

    
  }

  return (
    <div className="form-section container">
      <h1>{formType === 'update' ? 'Alterar Usuário' : 'Novo Usuário'}</h1>

      {loading &&
        <BubbleLoader color="#fff"/>
      }
      <div className="form-wrapper">
        <div className={(error ? "form validate-error" : "form")}>
          <div className="input-block">
            <label>Nome</label>
            <input id="form-name" value={name} onChange={(text) => {setName(text.target.value); setError(false)}}/>
          </div>

          <div className="input-block">
            <label>E-mail</label>
            <input type="email" value={email} id="form-email" onChange={(text) => {setEmail(text.target.value); setError(false)}}/>
          </div>

          <div className="input-block">
            <label>Endereço</label>
            <input id="form-address" value={address} onChange={(text) => {setAddress(text.target.value); setError(false)}}/>
          </div>

          <div className="input-block">
            <label>Cidade</label>
            <input id="form-city" value={city} onChange={(text) => {setCity(text.target.value); setError(false)}}/>
          </div>

          <div className="input-block">
            <label>Estado</label>
            <input id="form-state" value={stat} onChange={(text) => {setStat(text.target.value); setError(false)}}/>
          </div>
          <div className="actions">
            <button className="btn-form submit" onClick={() => submit()}>{formType === 'update' ? 'Alterar' : 'Novo'}</button>
            <button className="btn-form cancel" onClick={() => history.push('/')}>Cancelar</button>
          </div>
        </div>
      </div>
      {error &&
        <div className="error">
          <label>
            Preencha todos os campos!
          </label>
        </div>
      }
    </div>
  );
}
