module.exports = {
  preset: 'ts-jest',
  verbose: true,
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  rootDir: 'src'
};
