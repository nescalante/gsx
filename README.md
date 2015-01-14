# GSX

> Google SpreadSheets Reader

# Install

```shell
npm install gsx
```

# Usage

```
var gsx = require('gsx');

gsx('someKey', function (err, data) {
  console.log(data); // sheets

  data.sheets[0].fetch(function (err, data) {
    console.log(data); // first sheet objects
  });
})
```

## License MIT
