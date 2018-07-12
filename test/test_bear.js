const xcall = require('../xcall');
const bearUrl = 'bear://x-callback-url';

var assert = require('assert');
describe('xcall', function() {
  describe('#call()', function() {
    it('should create note in Bear', function() {
      const bearClient = new xcall('bear');
      const title = '# Test Note\n> Hi Twitter!\n#people/twitter#';
      var noteId = null;

      bearClient.call('create', { title: title })
        .then((note) => {
          noteId = note.id;
          return bearClient.call('open-note', { title: title });
        })
        .then((note) => {
          assert.equal(note.id, noteId);
          console.log(note);
        });
    });
  });
});
