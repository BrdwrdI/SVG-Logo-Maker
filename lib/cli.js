const inquirer = require('inquirer');
const SVG = require('./svg');
const { Circle, Triangle, Square } = require('./shapes.js');
const { writeFile } = require('fs/promises');

class CLI {
    run() {
        return inquirer
            .createPromptModule([
                {
                    type: 'input',
                    name: 'text',
                    message: 'Enter 3 characters which you would like to be the logo',
                    validate: (text) => 
                        text.length <= 3 ||
                        'The input must not be more then 3 characters',
                },
                {
                    type: 'input',
                    name: 'textColor',
                    message: 'What color would you like the text to be?'
                },
                {
                    type: 'list',
                    name: 'shape',
                    message: 'Which shape would you like your logo contained in?',
                    choices: ['circle', 'square', 'triangle'],
                },
                {
                    type: 'input',
                    name: 'shapeColor',
                    message: 'Please enter a shape color',
                },
            ])
            .then(({ text, textColor, shape, shapeColor }) => {
                let shape;
                switch (shapeType) {
                    case 'circle':
                        shape = new Circle();
                        break;

                    case 'square':
                        shape = new Square();
                        break;

                    case 'triangle':
                        shape = new Triangle();
                        break;
                }
                shape.setColor(shapeColor);

                const svg = new SVG();
                svg.setText(text, textColor);
                svg.setShape(shape);
                return writeFile('logo.svg', svg.render());
            })
            .then(() => {
                console.log('Generated logo!');
            })
            .catch((error) => {
                console.log(error);
                console.log('Something went wrong!');
            });
    };
};

module.exports = CLI;