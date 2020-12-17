import React from 'react';
import { Datagrid, EditButton, EmailField, List, TextField } from 'react-admin';

function UserList(props) {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="name" />
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="phone" />
        <EditButton />
      </Datagrid>
    </List>
  );
}

export default UserList;
