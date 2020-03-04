import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title } from 'react-admin';
import CardHeader from '@material-ui/core/CardHeader';


export default () => (
    <Card>
        <CardHeader title="Welcome to FixIt Admin Panel." />
        {/* //<Title title="Welcome to Southeastern Admin Portal 2.0!" /> */}
        <CardContent>Please select a menu item to begin...</CardContent>
    </Card>
)