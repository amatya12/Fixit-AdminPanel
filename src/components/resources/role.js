import React from 'react';
import { List, Datagrid, TextField, Filter, TextInput, Edit, SimpleForm, Create, } from 'react-admin';
import { DisabledInput } from 'react-admin';

export const RoleList = (props) => (
    <List filters={<RoleFilter />} {...props} >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
        </Datagrid>
    </List>
);

export const RoleEdit = (props) => (
    <Edit title="Edit Role" {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Edit>
);

export const RoleCreate = (props) => (
    <Create title="create role" {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" />
        </SimpleForm>
    </Create>
);

const RoleFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);