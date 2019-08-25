module.exports = plop => {
  plop.setGenerator('component', {
    description: 'react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter component name',
      },
    ],
    actions: data => [
      {
        type: 'addMany',
        base: `templates/component/`,
        templateFiles: 'templates/component/**/*.*',
        destination: 'packages/client/src/components/{{pascalCase name}}',
      }
    ],
  })
}
