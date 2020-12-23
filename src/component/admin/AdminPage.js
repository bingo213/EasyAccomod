import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import simpleRestProvider  from 'ra-data-simple-rest';
// import { simpleRestClient, Admin, Resource } from 'admin-on-rest'

import React from 'react';
import UserList from './UserList';
import UserEdit from './UserEdit';

function AdminPage() {
  const dataProvider = simpleRestProvider (
    'http://localhost:3001/'
  );
  return (
    <Admin 
      dataProvider={dataProvider}
    >
         <Resource name="admin/getWatingOwner" list={ListGuesser}/>
    </Admin>
  );
}

export default AdminPage;
