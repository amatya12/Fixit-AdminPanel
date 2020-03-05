import React from 'react';
import { Admin, Resource, } from 'react-admin';
import dataProvider from './utils/dataProvider';
import authProvider from './utils/authProvider';
import Dashboard from './components/Dashboard/Dashboard';
import { UserList, UserCreate, } from './components/resources/user';
import { CategoryList, CategoryCreate, CategoryEdit } from './components/resources/category';
import { SubCategoryList, SubCategoryCreate, SubCategoryEdit, } from './components/resources/subCategory';
import UserIcon from '@material-ui/icons/Group';
import RoleIcon from '@material-ui/icons/Accessibility';
import CategoryIcon from '@material-ui/icons/Category';
import SubCategoryIcon from '@material-ui/icons/ClassRounded';
import { RoleList, RoleCreate, RoleEdit } from './components/resources/role';
import LoginPage from './components/Login/LoginForm';

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    loginPage={LoginPage}

  >
    {/* {permissions => [

      permissions === 'admin' ? <Resource name="users" list={UserList} icon={UserIcon} /> : null,

      permissions === 'moderator' ? <Resource name="roles" list={RoleList} icon={RoleIcon} /> : null

    ]} */}

    <Resource name="user" list={UserList} create={UserCreate} icon={UserIcon} />
    <Resource name="role" list={RoleList} create={RoleCreate} edit={RoleEdit} icon={RoleIcon} />
    <Resource name="category" list={CategoryList} create={CategoryCreate} edit={CategoryEdit} icon={CategoryIcon} />
    <Resource name="subCategory" list={SubCategoryList} create={SubCategoryCreate} edit={SubCategoryEdit} icon={SubCategoryIcon} />

  </Admin>
);

export default App;