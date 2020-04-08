import React from 'react';

import { List, Datagrid, downloadCSV, TextField, Filter, TextInput, Edit, SimpleForm, Create, ReferenceField, ReferenceInput, SelectInput } from 'react-admin';
import jsonExport from 'jsonexport/dist';
const exporter = (subCategories, fetchRelatedRecords) => {
    fetchRelatedRecords(subCategories, 'categoryId', 'category').then((category) => {
        const data = subCategories.map(record => ({
            Id: record.id,
            SubCategoryName: record.subCategoryName,
            Category_ID: record.categoryId,
            Category_Name: category[record.categoryId].categoryName
        }))
        jsonExport(data, {
        }, (err, csv) => {
            downloadCSV(csv, 'SubCategories');
        });
    })
}




export const SubCategoryList = (props) => (
    <List filters={<SubCategoryFilter />} {...props} exporter={exporter}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="subCategoryName" />
            <ReferenceField source="categoryId" reference="category">
                <TextField source="categoryName" />
            </ReferenceField>
        </Datagrid>
    </List>
);

export const SubCategoryEdit = (props) => (
    <Edit title="Edit Subcategory" {...props}>
        <SimpleForm>
            <TextInput label="SubCategoryName" source="subCategoryName" />
            <ReferenceInput label="Category" source="categoryId" reference="category">
                <SelectInput optionText="categoryName" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

export const SubCategoryCreate = (props) => (
    <Create title="create subcategory with its category defined." {...props}>
        <SimpleForm>
            <TextInput label="SubCategoryName" source="subCategoryName" />
            <ReferenceInput label="Category" source="categoryId" reference="category">
                <SelectInput optionText="categoryName" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

const SubCategoryFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="q" alwaysOn />
        <ReferenceInput label="Category" source="categoryId" reference="category" allowEmpty>
            <SelectInput optionText="categoryName" />
        </ReferenceInput>
    </Filter>
);