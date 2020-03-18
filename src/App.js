import React from 'react';
import { Admin, Resource, } from 'react-admin';
import dataProvider from './utils/dataProvider';
import authProvider from './utils/authProvider';
import Dashboard from './components/Dashboard/Dashboard';
import { UserList, UserCreate, } from './components/resources/user';
import { CategoryList, CategoryCreate, CategoryEdit } from './components/resources/category';
import { SubCategoryList, SubCategoryCreate, SubCategoryEdit, } from './components/resources/subCategory';
import { DepartmentList, DepartmentCreate, DepartmentEdit } from './components/resources/department';
import { IssueList, IssueEdit } from './components/resources/issue';
import UserIcon from '@material-ui/icons/Group';
import RoleIcon from '@material-ui/icons/Accessibility';
import CategoryIcon from '@material-ui/icons/Category';
import SubCategoryIcon from '@material-ui/icons/ClassRounded';
import IssueIcon from '@material-ui/icons/BugReport';
import { RoleList, RoleCreate, RoleEdit } from './components/resources/role';
import LoginPage from './components/Login/LoginForm';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

const requiresPermission = (requiredPerm, allPermissionsStr, view) => {
  const allPermissions = allPermissionsStr.split(',');
  if (allPermissions.indexOf(requiredPerm) >= 0)
    return view;

  return null;
};

const App = () => (
  <Admin
    dataProvider={dataProvider}
    authProvider={authProvider}
    dashboard={Dashboard}
    loginPage={LoginPage}

  >
    {permissions => [
      requiresPermission(
        'admin', permissions,
        <Resource
          name="user"
          list={UserList}
          icon={UserIcon}
        />
      ),
      requiresPermission(
        'admin', permissions,
        <Resource name="category"
          list={CategoryList}
          create={CategoryCreate}
          edit={requiresPermission('admin', permissions, CategoryEdit)}
          icon={CategoryIcon}
        />
      ),
      requiresPermission(
        'admin', permissions,
        <Resource
          name="subCategory"
          list={SubCategoryList}
          create={SubCategoryCreate}
          edit={SubCategoryEdit}
          icon={SubCategoryIcon}
        />
      ),
      requiresPermission(
        'admin', permissions,
        <Resource
          name="issue"
          list={IssueList}
          edit={permissions === 'admin' ? IssueEdit : null}
          icon={IssueIcon}
        />
      ),
      requiresPermission(
        'moderator', permissions,
        <Resource
          name="role"
          list={RoleList}
          icon={RoleIcon}
        />
      ),
    ]}

    <Resource name="user" list={UserList} create={UserCreate} icon={UserIcon} />
    <Resource name="role" list={RoleList} create={RoleCreate} edit={RoleEdit} icon={RoleIcon} />
    <Resource name="category" list={CategoryList} create={CategoryCreate} edit={CategoryEdit} icon={CategoryIcon} />
    <Resource name="subCategory" list={SubCategoryList} create={SubCategoryCreate} edit={SubCategoryEdit} icon={SubCategoryIcon} />
    <Resource name="department" list={DepartmentList} create={DepartmentCreate} edit={DepartmentEdit} icon={AccountBalanceIcon} />
    <Resource name="issue" list={IssueList} edit={IssueEdit} icon={IssueIcon} />
  </Admin>
);

export default App;