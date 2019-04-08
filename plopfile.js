module.exports = plop => {
  plop.setGenerator('component', {
    description: 'react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter component name',
      },
      {
        type: 'confirm',
        name: 'createTest',
        message: 'Create .test file',
        default: true,
      },
    ],
    actions: data =>
      [
        {
          type: 'add',
          path: 'packages/client/src/components/{{pascalCase name}}/index.ts',
          templateFile: 'templates/component/index.hbs',
        },
        {
          type: 'add',
          path:
            'packages/client/src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
          templateFile: 'templates/component/Component.hbs',
        },
        data.createTest
          ? {
              type: 'add',
              path:
                'packages/client/src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
              templateFile: 'templates/component/Component.test.hbs',
            }
          : null,
      ].filter(a => !!a),
  })
}
