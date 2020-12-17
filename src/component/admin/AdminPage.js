import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import React from 'react';
import UserList from './UserList';
import UserEdit from './UserEdit';

function AdminPage() {
  const dataProvider = jsonServerProvider(
    'https://jsonplaceholder.typicode.com'
  );
  return (
    <Admin
      dataProvider={jsonServerProvider('http://jsonplaceholder.typicode.com')}
    >
         <Resource name="users" list={UserList} edit={UserEdit}/>
    </Admin>
  );
}

export default AdminPage;
