import React from 'react';
import {
    List, Edit, TextField, ArrayField, downloadCSV, SingleFieldList, ChipField, Datagrid, Filter, ReferenceInput, SelectInput, TextInput, EmailField, Create, SimpleForm, ReferenceArrayInput, SelectArrayInput,
} from 'react-admin';
import jsonExport from 'jsonexport/dist';
import * as R from 'ramda';

const exporter = (users) => {
    const data = users.map(record => ({
        Id: record.id,
        Email: record.email,
        Assigned_Roles: ParseRoles(record.role)

    }))
    jsonExport(data, {
    }, (err, csv) => {
        downloadCSV(csv, 'category');
    });
}

const ParseRoles = (roles) => {
    return R.pipe(
        R.map(R.prop('name')),
        R.join('|')
    )(roles)
}

export const UserList = (props) => (
    <List title="List of users with their assigned roles." filters={<UserFilter />} {...props} exporter={exporter}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <EmailField source="email" />
            <ArrayField source="role">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>
        </Datagrid>
    </List>
);

export const UserCreate = (props) => (
    <Create title="Create a User" {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <ReferenceArrayInput label="Role" source="roleId" reference="role">
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);

export const UserEdit = (props) => (
    <Edit title="edit a user with its roles" {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="email" />
            <ReferenceArrayInput label="Role" source="roleId" reference="role">
                <SelectArrayInput optionText="name" />
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
);

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Role" source="roleId" reference="role" allowEmpty>
            <SelectInput optionText="name" />
        </ReferenceInput>
    </Filter>
);