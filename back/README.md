#### Project structure

- **index** - app start, init server and register routing
    - **config** - runtime app configurations (based on [config](https://www.npmjs.com/package/config))
- **route** - accept requests, call _controller_
- **controller** - validate requests, parse request, call _service_, apply response
- **service** - prepare data, use (_mongoose_) _model_ to apply DB request, postprocess and return result
- **model** - use _mongoose_ to declare structure of the DB table and dependencies
- **public** - front-end code
