const uniqid = require('uniqid');

class Cube {

  static #cubes = [
    {
      id: 'four-by-four-by-four',
      name: '4x4x4',
      description: 'magic cube',
      imageUrl: 'https://logicbg.com/wp-content/uploads/2021/01/rubik-kub-4x4x4-QiYi-Speed-Cube-sinya-i-zhalta.jpg',
      difficulty: 4
    }
  ];

  constructor(name, description, imageUrl, difficulty) {
    this.id = uniqid();
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.difficulty = difficulty;
  }

  static get cubes() {
    return Cube.#cubes.slice();
  }

  static add(cube) {
    Cube.#cubes.push(cube);
  }
}

module.exports = Cube;
