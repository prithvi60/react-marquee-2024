
# @webibee/react-marquee-2024

A React component library for creating smooth, customizable marquee effects.


## Installation

You can install react-marquee-2024 via npm or yarn.

```bash
  npm install @webibee/react-marquee-2024
```

or

```bash
  yarn add @webibee/react-marquee-2024
```
## Usage/Examples

Here's a basic example of how to use the marquee component in your React project.

```javascript
import React from 'react';
import {Marquee} from '@webibee/react-marquee-2024';

function App() {
  return (
    <div className="App">
      <Marquee speed={50} direction="left" autofill>
       --- Your scrolling text goes here! ---
      </Marquee>
    </div>
  );
}

export default App;
```


## Props

`Marquee` Component Props : 


| Prop | Type   | Default    | Description    |
| :---:   | :---: | :---: | :--- |
| `speed` | `number`   | 50   |  Speed of the marquee (the lower the number, the faster it moves)   |
| `direction` | `string`   | left   |  Direction of the marquee (left, right) `default`: "left"  |
| `autofill` | `boloean`   | true   |  min. length of array should be 8 req. otherwise use `autofill` option to fill the blank space `default`: true  |
## Example

Basic Example

```bash
  <Marquee >Welcome to React Marquee 2024!</Marquee>
```

Marquee with Custom Direction and Speed

```bash
  <Marquee speed={30} direaction={"left"}>Welcome to React Marquee 2024!...</Marquee>
```
## Contributing

Contributions are always welcome!

We welcome contributions to improve this library. Here are some ways you can contribute:

    1. Report bugs: If you find a bug, please open an issue.

    2. Suggest features: We are open to feature requests.

    3. Submit PRs: If you want to contribute code, please open a pull request.
## License

This project is licensed under the MIT License - see the [MIT](https://choosealicense.com/licenses/mit/) file for details.



## Acknowledgements

 - Thanks to all the contributors who helped in making this library better.
