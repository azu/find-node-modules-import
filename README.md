# find-node-modules-import

Find specific node modules import statement in your source code.

## Features

- Find all imported module name
- Find specific module name
- Find Node.js built-in module name like `node:fs` or `assert`

📝 This tool only support `import` syntax. `require` syntax is not supported.

## Install

Install with [npm](https://www.npmjs.com/):

    npm install find-node-modules-import --global

## Usage

    Usage
      $ npx find-node-modules-import [file|glob*]
 
    Options
      --module          [String] filter the result by module name
      --builtinModules      [Boolean] filter the result by Node.js builtin modules. Default: false

    Examples
      # show all imports
      $ find-node-modules-import "src/**/*.{js, ts}"
      # show Node.js builtin modules
      $ find-node-modules-import "src/**/*.{js, ts}" --builtinModules
      # show specific module
      $ find-node-modules-import "src/**/*.{js, ts}" --module "lodash"

## Changelog

See [Releases page](https://github.com/azu/find-node-modules-import/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/find-node-modules-import/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- azu: [GitHub](https://github.com/azu), [Twitter](https://twitter.com/azu_re)

## License

MIT © azu
