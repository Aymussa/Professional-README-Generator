import inquirer from "inquirer";
import fs from "fs/promises";


//This function first check for an input and prompts the user to enter an input which needs to be validated to be passed if not it will return a message
const requireInput = (input) => {
  if (input) {
    return true;
  } else {
    return "Please input the required information to proceed.";
  }
};

//await function to a promise to wait for the user input to all be completed
let {title ,description, tableContent, installation, usage,license, contributing, test, github,email }= await inquirer
.prompt([
    /*pass your questions in here*/
    {
        type: "input",
      name: "title",
      message: "What is the title of your project?",
      validate: requireInput,
    },
    {
      type: "input",
      name: "description",
      message:
        "write a description of the project",
        validate: requireInput,
    },
    {
      type: "input",
      name: "tableContent",
      message:
      "Write the table of content for your project  or selected ENTER for the default content",
      default: ` - [Project description](####Project-description
      - [Installation](#####Installation)
      - [Usage](#####usage)
      - [License](#####License)
      - [Contributing](#####Contributing)
      - [Test](#####Test)
      - [Questions](#####Questions)
       `,
      },
      {
        type: "input",
        name: "installation",
        message:
          "What is the installation requirements and instructions for you project?",
      },
      {
        type: "input",
        name: "usage",
        message:
          "What is the use of the application?",
      },
      {
        type: "list",
        name: "license",
        message: "Does your project have a license?",
        choices: [
          "apache",
          "boost",
          "eclipse",
        ],
        filter(val){
            return val.toLowerCase();
        }
      },
      {
        type: "input",
        name: "contributing",
        message:
          "has anyone else contributed to this project?",
      },
      {
        type: "input",
        name: "test",
        message:
          "Please enter some test instructions for you project if applicable",
      },
    {
      type: "input",
      name: "github",
      message:
        "Please enter your github username",
    },
      {
        type: "input",
        name: "email",
        message:
          "Please enter your email address",
      },
])

//readme text layout setup for when the file is created
let readmeText = `# Project Title
${title}

## Project description
${description}

## Table Of Content
${tableContent}

## Installation
${installation}

## Usage
${usage}

## License
This application is covered under:
${generateLicense(license)}

## Contributing
${contributing}

## Code of Conduct
* [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/code_of_conduct.md)


## Test
${test}

## Questions
* For additional help or questions about collaboration, please reach out to
GitHub username: ${github} 
or via email on
Email : ${email}

`

//Node fs modile creates a new md file and writes the contents for the prompt questions above
await fs.writeFile("READMEgenerator.md",readmeText )

//This function generates a license from the selected list/
//user input will determine the output of this statement as selected
function generateLicense(license){

  if(license === "apache"){
    return "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
}
else if (license === "boots"){
    return "[![License](https://img.shields.io/badge/License-Boost_1.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
}

else if (license === "eclipse"){
    return "[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)";
}
}
console.log("success!");