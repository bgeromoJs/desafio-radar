import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SimpleLineIcon from 'react-simple-line-icons';

import { formState, setUser } from '../actions/index';
import './Main.css';
import api from '../api';

const Main = ({history}) => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getusers();
  }, [])

  const deleteItem = async item => {
    await api.delete(`users/${item}`)
    getusers();
  }

  async function getusers(){
    const response = await api.get('users')
    setData(response.data)
  }

  const updateItem = item => {
    dispatch(formState('update'))
    dispatch(setUser(item))
    history.push('/form')
  }

  const newUser = () => {
    dispatch(formState('create'))
    history.push('/form')
  }

  return (
    <div className="main-container">
      <div className="create-button" onClick={() => newUser()}>
        <SimpleLineIcon name="user-follow" size='large' color='#000' style={{alignSelf: 'center'}}/>
      </div>
      
      <div className="list-container">
        <table>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Data de criação</th>
            <th colSpan='2' className="action-header">Ações</th>
          </tr>
          {(Array.isArray(data) && data.length > 0 ) ? data.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="action-buttons" onClick={() => deleteItem(item._id)}>
                <SimpleLineIcon name="trash" size='medium' color='#000'/>
              </td>
              <td className="action-buttons" onClick={() => updateItem(item._id)}>
                <SimpleLineIcon name="note" size='medium' color='#000'/>
              </td>
            </tr>
          )) : <td colSpan='5' className="empty-list">Nenhum item encontrado</td>
          }
        </table>
      </div>
    </div>
  );
}

export default Main;