import React from 'react';

import { List, Datagrid, TextField, Filter, TextInput, Edit, SimpleForm, Create, UrlField }
    from 'react-admin';

export const DepartmentList = (props) => (
    <List filters={<CategoryFilter />} {...props} >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <UrlField source="url" />
            <TextField source="phoneNumber" />
            <TextField source="location" />
        </Datagrid>
    </List>
);

export const DepartmentEdit = (props) => (
    <Edit title="Edit category" {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <UrlField source="url" />
            <TextInput source="phoneNumber" />
            <TextInput source="location" />
        </SimpleForm>
    </Edit>
);

export const DepartmentCreate = (props) => (
    <Create title="create category" {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <UrlField source="url" />
            <TextInput source="phoneNumber" />
            <TextInput source="location" />
        </SimpleForm>
    </Create>
);

const CategoryFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);