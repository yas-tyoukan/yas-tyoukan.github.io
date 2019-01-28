import React from 'react';
import NotificationsList from '.';

import sampleNotifications from './notifications.sample.json';

export default stories => stories
  .add('loading', () => (<NotificationsList loading/>))
  .add('default', () => (<NotificationsList notifications={sampleNotifications}/>))
  .add('0件', () => (<NotificationsList notifications={[]}/>));
