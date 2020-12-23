import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import restProvider from 'ra-data-simple-rest';

import React from 'react';
import UserList from './UserList';
import UserEdit from './UserEdit';

function AdminPage() {
  const dataProvider = restProvider(
    'http://localhost:3001'
  );
  return (
    <Admin
      dataProvider={dataProvider}
    >
         <Resource name="admin/getWatingOwner" list={UserList} edit={UserEdit}/>
    </Admin>
  );
}

export default AdminPage;
