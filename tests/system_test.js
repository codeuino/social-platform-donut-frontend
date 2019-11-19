/**
 * @description tests for repository structure, package.json, ,gitignore
 * it can be run using `npm run test-system`
 */
var _ = require('lodash'),
  expect = require('chai').expect,
  fs = require('fs'),
  parseIgnore = require('parse-gitignore');

/* global describe, it */
describe('SOCIAL-PLATFORM-DONUT repository', function () {
  describe('package.json', function () {
    var content,
      json;

    try {
      content = fs.readFileSync('./package.json').toString();
      json = JSON.parse(content);
    }
    catch (e) {
      console.error(e);
      content = '';
      json = {};
    }

    it('must have readable JSON content', function () {
      expect(content).to.be.ok;
      expect(json).to.not.eql({});
    });

    describe('package.json JSON data', function () {
      it('must have valid name, author and license', function () {
        expect(json).to.have.property('name', 'codeuino');
        expect(json).to.have.property('author', 'Capedcrusader23');
        expect(json).to.have.property('license', 'MIT');
      });

      it('must have a valid version string in form of <major>.<minor>.<revision>', function () {
        expect(json.version).to.match(/^((\d+)\.(\d+)\.(\d+))(?:-([\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*))?(?:\+([\dA-Za-z-]+(?:\.[\dA-Za-z-]+)*))?$/);
      });
    });

    describe.skip('dependencies', function () {
      it('must exist', function () {
        expect(json.dependencies).to.be.a('object');
      });
    });

    describe('devDependencies', function () {
      it('must exist', function () {
        expect(json.devDependencies).to.be.a('object');
      });

      it.skip('should not overlap dependencies', function () {
        var clean = [];

        json.devDependencies && Object.keys(json.devDependencies).forEach(function (item) {
          !json.dependencies[item] && clean.push(item);
        });

        expect(Object.keys(json.devDependencies)).to.eql(clean);
      });
    });

  });

  describe('README.md', function () {
    it('must exist', function (done) {
      fs.stat('./README.md', done);
    });

    it('must have readable content', function () {
      expect(fs.readFileSync('./README.md').toString()).to.be.ok;
    });
  });

  describe('CODE_OF_CONDUCT.md', function () {
    it('must exist', function (done) {
      fs.stat('./CODE_OF_CONDUCT.md', done);
    });

    it('must have readable content', function () {
      expect(fs.readFileSync('./CODE_OF_CONDUCT.md').toString()).to.be.ok;
    });
  });

  describe('LICENSE', function () {
    it('must exist', function (done) {
      fs.stat('./LICENSE', done);
    });
    it('must have readable content', function () {
      expect(fs.readFileSync('./LICENSE').toString()).to.be.ok;
    });
  });

  describe('.ignore files', function () {
    var gitignorePath = '.gitignore',
      gitignore = parseIgnore(gitignorePath);

    describe(gitignorePath, function () {
      it('must exist', function (done) {
        fs.stat(gitignorePath, done);
      });

      it('must have valid content', function () {
        expect(_.isEmpty(gitignore)).to.not.be.ok;
      });

      it('must include extensions,dist,coverage,node_modules folders', function () {
        expect(_.includes(gitignore, ['extensions/', 'dist/', 'coverage/', 'node_modules/']));
      });
    });

  });

  describe('.eslintrc', function () {
    it('must exist', function (done) {
      fs.stat('./.eslintrc.json', done);
    });

    it('must have readable content', function () {
      expect(fs.readFileSync('./.eslintrc.json').toString()).to.be.ok;
    });
  });

});
