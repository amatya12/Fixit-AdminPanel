import React from 'react';

import { List, Datagrid, TextField, Filter, TextInput, Edit, SimpleForm, Create, ReferenceField, ReferenceInput, SelectInput, ImageField, ArrayField, SingleFieldList, ChipField }
    from 'react-admin';

export const IssueList = (props) => (
    <List filters={<IssueFilter />} {...props} >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="issues" />
            <TextField source="priority" />
            <ImageField source="imageUrl" />
            <TextField source="location" />
            <TextField source="latitude" />
            <TextField source="longitude" />
            <TextField source="status" />
            <ReferenceField source="categoryId" reference="category">
                <TextField source="categoryName" />
            </ReferenceField>
        </Datagrid>
    </List>
);

// export const CategoryEdit = (props) => (
//     <Edit title="Edit category" {...props}>
//         <SimpleForm>
//             <TextInput source="categoryName" />
//         </SimpleForm>
//     </Edit>
// );

// export const CategoryCreate = (props) => (
//     <Create title="create category" {...props}>
//         <SimpleForm>
//             <TextInput source="categoryName" />
//         </SimpleForm>
//     </Create>
// );

const IssueFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Category" source="categoryId" reference="category" allowEmpty>
            <SelectInput optionText="categoryName" />
        </ReferenceInput>
    </Filter>
);