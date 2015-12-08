import t from 'tcomb-form';

import HasMany from './Factories/HasMany';
import HasOne from './Factories/HasOne';
import Model from './Factories/Model';

import hasMany from './types/hasMany';
import hasOne from './types/hasOne';
import model from './types/model';

import hasManyTemplate from './Templates/hasMany'
import hasOneTemplate from './Templates/hasOne'
import modelTemplate from './Templates/model'


t.hasMany = hasMany;
t.hasOne = hasOne;
t.model = model;

t.form.HasMany = HasMany;
t.form.HasOne = HasOne;
t.form.Model = Model;

t.form.Form.templates.hasMany = hasManyTemplate;
t.form.Form.templates.hasOne = hasOneTemplate;
t.form.Form.templates.model = modelTemplate;
t.form.Form.i18n.find = 'find';

export default t;
