import React from 'react';

import { List, Datagrid, TextField, Filter, TextInput, Edit, SimpleForm, Create, ArrayField, SingleFieldList, ChipField }
    from 'react-admin';

export const CategoryList = (props) => (
    <List filters={<CategoryFilter />} {...props} >
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="categoryName" />
            <ArrayField source="subCategories">
                <SingleFieldList>
                    <ChipField source="subCategoryName" />
                </SingleFieldList>
            </ArrayField>
        </Datagrid>
    </List>
);

export const CategoryEdit = (props) => (
    <Edit title="Edit category" {...props}>
        <SimpleForm>
            <TextInput source="categoryName" />
        </SimpleForm>
    </Edit>
);

export const CategoryCreate = (props) => (
    <Create title="create category" {...props}>
        <SimpleForm>
            <TextInput source="categoryName" />
        </SimpleForm>
    </Create>
);

const CategoryFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
    </Filter>
);