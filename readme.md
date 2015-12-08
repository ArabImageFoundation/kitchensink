- validation without triggering errors
- possibility to load items
- async validation

# tcomb-models

Additions to tcomb-form for handling relationships and async validation.

## How to use:

```js

```

## How to run example:

```sh
git clone https://github.com/xananax/tcomb-models.git
cd tcomb-models
npm install
npm run server
```

Then go to http://localhost:8080/bundle

## Additions:

## Validation and Schemas:

#### t.model(name,props)

#### t.hasOne(model)

#### t.hasMany(model,min,max)

#### t.condition(type,predicate,name)

### Factories and templates:

#### t.form.Model, t.form.templates.model

#### t.form.HasMany, t.form.templates.hasMany

#### t.form.HasOne, t.form.templates.hasOne

## npm scripts:

Run the example server:
```sh
npm run server
```

Compile code to ES5 in `./lib`
```sh
npm run compile
```
