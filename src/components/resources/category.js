import React from 'react';

import { List, Datagrid, TextField, Filter, TextInput, Edit, SimpleForm, Create, ArrayField, SingleFieldList, ChipField, downloadCSV }
    from 'react-admin';
import jsonExport from 'jsonexport/dist';

import * as R from 'ramda';

const exporter = (category) => {
    console.log(category);
    const data = category.map(record => ({
        Id: record.id,
        CategoryName: record.categoryName,
        SubCategories: ParseSubCategory(record.subCategories),
    }))
    jsonExport(data, {
    }, (err, csv) => {
        downloadCSV(csv, 'category');
    });
};


const ParseSubCategory = (subCategory) => {
    const result = R.pipe(
        R.map(R.prop('subCategoryName')),
        R.join('|')

    )(subCategory);

    return result;
}


export const CategoryList = (props) => (
    <List filters={<CategoryFilter />} {...props} exporter={exporter}>
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