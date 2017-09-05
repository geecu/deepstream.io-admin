React components for creating admin GUIs for the [deepstream.io](https://deepstreamhub.com/open-source/?io) server. Inspired by the [admin-on-rest](https://github.com/marmelab/admin-on-rest) package.

## Usage

```js
import React, { Component } from 'react';
import {
  App,
  Provider,
  List,
  DataGrid,
  Edit,
  TextField,
  TextInput,
  RichTextInput,
} from 'deepstream-admin';
import {
  IconMenu,
  MenuItem,
} from 'material-ui';
import { browserHistory } from 'react-router';

const ResourceIcon from 'material-ui/svg-icons/action/book';

const ResourceList = (props) => (
  <List {...props}>
    <DataGrid dsRecord="resources">
      <TextField source="name" />
      <TextField source="description" />
    </DataGrid>
  </List>
)

const ResourceEdit = (props) => (
  <Edit {...props}>
    <TextInput source="name" />
    <RichTextInput source="description" />
  </Edit>
)

const Menu = (props) => (
  <IconMenu>
    {
      props.resources.map(resource =>
        <MenuItem key={resource.name}
                  primaryText={resource.name}
                  leftIcon={<resource.icon />}
                  onClick={props.router.push(resource.name)}
        />
    }
  </IconMenu>
)

//render the admin
(
<Provider ds={dsClient}>
  <App title="Deepstream admin test" history={browserHistory} menu={Menu}>
    <Resource name="resource"
              create={ResourceEdit}
              edit={ResourceEdit}
              list={ResourceList}
              icon={ResourceIcon}
    />
</App>
</Provider>
)
```
