import React from 'react';
import {
    List, Edit, TextField, ArrayField, SingleFieldList, ChipField, Datagrid, Filter, ReferenceInput, SelectInput, TextInput, EmailField, Create, SimpleForm, ReferenceArrayInput, SelectArrayInput,
} from 'react-admin';


export const UserList = (props) => (
    <List title="List of users with their assigned roles." filters={<UserFilter />} {...props} >
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