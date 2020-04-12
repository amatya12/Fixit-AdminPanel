import React from 'react';

import {
    List, Datagrid, TextField, Filter, TextInput, Edit, SimpleForm, Create, ReferenceManyField, ReferenceArrayField, ReferenceField,
    ReferenceInput, SelectInput, ImageField, DateInput, SingleFieldList, ChipField, downloadCSV,
} from 'react-admin';
import jsonExport from 'jsonexport/dist';

import { CoordsField } from '../../views/coords';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import * as R from 'ramda';

const useStyles = makeStyles({
    pending: { color: 'red', fontWeight: "bold" },
    fixed: { color: 'green', fontWeight: "bold" },
    workinprogress: { color: 'skyblue', fontWeight: "bold" },
    high: { color: 'red', fontWeight: 'bold' },
    low: { color: 'green', fontWeight: 'bold' },
    medium: { color: 'skyblue', fontWeight: 'bold' }
});

const exporter = (issues, fetchRelatedRecords) => {
    fetchRelatedRecords(issues, 'categoryId', 'category').then((category) => {
        console.log(issues);
        //console.log(subcategory);
        const data = issues.map(record => ({
            id: record.id,
            issue: record.issues,
            priority: record.priority,
            status: record.status,
            coordinates: `${record.coords.latitude}, ${record.coords.longitude}`,
            date_created: record.dateCreated,
            category_name: parseCategory(record.categoryId, category),
            SubCategories: parseSubCategory(record.subCategoryId, category, record.categoryId)
        }))

        jsonExport(data, {
        }, (err, csv) => {
            downloadCSV(csv, 'issue');
        });
    })
}

const parseCategory = (categoryId, category) => {
    console.log(category, R);
    return R.pipe(
        R.filter(c => categoryId.indexOf(c.id) >= 0),
        R.map(R.prop('categoryName')),
        R.values,
        R.join('|'),
    )(category);
}
const parseSubCategory = (subCategoryId, category, categoryId) => {
    const result = R.pipe(
        R.map(R.prop('subCategories')),
        R.values,
        R.unnest,
        R.filter(sc => subCategoryId.indexOf(sc.id) >= 0),
        R.map(R.prop('subCategoryName')),
        R.join('|')
    )(category);
    return result;
}

const ColoredStatusField = props => {
    const classes = useStyles();
    return (
        <TextField
            className={classnames({
                [classes.pending]: props.record[props.source] === 'pending',
                [classes.fixed]: props.record[props.source] === 'fixed',
                [classes.workinprogress]: props.record[props.source] === 'work-in-progress',
                [classes.high]: props.record[props.source] === 'High',
                [classes.low]: props.record[props.source] === 'Low',
                [classes.medium]: props.record[props.source] === 'Medium'
            })}
            {...props}
        />
    )
}

ColoredStatusField.defaultProps = TextField.defaultProps;

export const IssueList = (props) => (
    <List filters={<IssueFilter />} {...props} exporter={exporter}>
        <Datagrid rowClick="edit" expand={<IssueEdit />}>
            <TextField source="id" />
            <TextField source="issues" options={{ multiLine: true }} />
            <ColoredStatusField source="priority" />
            <ImageField label="Image" source="imageUrl" />
            <CoordsField source="coords" />
            <ColoredStatusField source="status" />
            <TextField source="dateCreated" />
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


// export const IssueEdit = (props) => (
//     <Edit title="Edit Issue" {...props}>
//         <SimpleForm>
//             <TextInput source="issues" options={{ multiLine: true }} />
//             <TextInput source="priority" />
//             <ImageField source="imageUrl" />
//             <TextInput source="latitude" />
//             <TextInput source="longitude" />
//             <SelectInput source="status" choices={[
//                 { id: 'pending', name: 'pending' },
//                 { id: 'Fixed', name: 'Fixed' },
//                 { id: 'Work at progress', name: 'Work at progress' },
//             ]} />
//             <ReferenceInput label="Category" source="categoryId" reference="category">
//                 <SelectInput optionText="categoryName" />
//             </ReferenceInput>
//         </SimpleForm>
//     </Edit>
// );


export const IssueEdit = (props) => (
    <Edit title="Edit Issue" {...props}>
        <SimpleForm>
            <SelectInput source="status" choices={[
                { id: 'pending', name: 'pending' },
                { id: 'fixed', name: 'fixed' },
                { id: 'work-in-progress', name: 'work-in-progress' },
            ]} />
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
        <SelectInput label="Status" source="Status" choices={[
            { id: 'Pending', name: 'pending' },
            { id: 'Fixed', name: 'fixed' },
            { id: 'Work-In-Progress', name: 'work-in-progress' },
        ]}
            allowEmpty

        />
        <SelectInput label="Priority" source="Priority" choices={[
            { id: 'High', name: 'High' },
            { id: 'Low', name: 'Low' },
            { id: 'Medium', name: 'Medium' },
        ]}
            allowEmpty

        />
        <DateInput
            source="FromDate"
            label="From date:"

            options={{
                mode: "portrait",
                locale: "nl"
            }}
            alwaysOn
        />

        <DateInput
            source="ToDate"
            label="To Date:"
            options={{
                mode: "portrait",
                locale: "nl"
            }}
            alwaysOn
        />

    </Filter>
);