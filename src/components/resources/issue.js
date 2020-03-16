import React from 'react';

import {
    List, Datagrid, TextField, Filter, TextInput, Edit, SimpleForm, Create, ReferenceManyField, ReferenceArrayField, ReferenceField,
    ReferenceInput, SelectInput, ImageField, ArrayField, SingleFieldList, ChipField, downloadCSV,
} from 'react-admin';

import { unparse as convertToCSV } from 'papaparse/papaparse.min';
import jsonExport from 'jsonexport/dist';

import { CoordsField } from '../../views/coords';

import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const coloredStyles = {
    small: { color: 'black' },
    big: { color: 'red' },
};

const exporter = (issues, fetchRelatedRecords) => {
    fetchRelatedRecords(issues, 'categoryId', 'category').then(category => {
        console.log(issues);
        const data = issues.map(record => ({

            id: record.id,
            issue: record.issues,
            priority: record.priority,
            status: record.status,
            coordinates: `${record.coords.latitude}, ${record.coords.longitude}`,
            date_created: record.dateCreated,
            category_name: category[record.categoryId].categoryName,
        }))
        jsonExport(data, {
        }, (err, csv) => {
            downloadCSV(csv, 'posts');
        });
    })
}

const ColoredNumberField = withStyles(coloredStyles)(
    ({ classes, ...props }) => (
        <TextField
            className={classnames({
                [classes.small]: props.record[props.source] = 'pending',
                [classes.big]: props.record[props.source] = 'Fixed',
            })}
            {...props}
        />
    ));
ColoredNumberField.defaultProps = TextField.defaultProps;
export const IssueList = (props) => (
    <List filters={<IssueFilter />} {...props} exporter={exporter}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="issues" />

            <TextField source="priority" style={{ color: 'red', fontWeight: 'bold' }} />

            <ImageField source="imageUrl" />
            <CoordsField source="coords" />
            {/* //<TextField source="status" /> */}
            <ColoredNumberField source="status" />
            <ReferenceArrayField label="Category" reference="category" source="categoryId">
                <SingleFieldList>
                    <ChipField source="categoryName" />
                </SingleFieldList>
            </ReferenceArrayField>

            <ReferenceArrayField label="SubCategory" reference="subCategory" source="subCategoryId">
                <SingleFieldList>
                    <ChipField source="subCategoryName" />
                </SingleFieldList>
            </ReferenceArrayField>
        </Datagrid>
    </List>
);

export const IssueEdit = (props) => (
    <Edit title="Edit Issue" {...props}>
        <SimpleForm>
            <TextInput source="issues" />
            <TextInput source="priority" />
            <ImageField source="imageUrl" />
            <TextInput source="latitude" />
            <TextInput source="longitude" />
            <SelectInput source="status" choices={[
                { id: 'pending', name: 'pending' },
                { id: 'Fixed', name: 'Fixed' },
                { id: 'Work at progress', name: 'Work at progress' },
                { id: 'Within Few Days', name: 'Within Few Days' }
            ]} />
            <ReferenceInput label="Category" source="categoryId" reference="category">
                <SelectInput optionText="categoryName" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);

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