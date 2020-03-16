import React from 'react';
import { FunctionField } from 'react-admin';
import * as R from 'ramda';
const coordsToString = (coords) => {
    if (coords) {
        return `${coords.latitude}, ${coords.longitude}`;
    }
    return '';
};

export const CoordsField = (props) => (
    <FunctionField
        render={(record, source) => {
            const coords = R.path(source.split('.'))(record);
            return coordsToString(coords);
        }}
        {...props}
    />
);