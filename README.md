# xcall

A Node x-callback-url client for bi-directional communication with x-callback-url enabled macOS applications.

### Requires:

- macOS
- Node
- Uses xcall (included).

### Usage

Create with a scheme (`bear`). Call with an action (`open-note`) and params (`{ id: yourNoteId }`). Returns a promise with results.

```
const xcall = require('xcall');
const client = new xcall('bear');

client.call('open-note', { id: noteId }).then((note) => {
  console.log(note);
});
```

```
{
  "note" : "# Test Note\n",
  "modificationDate" : "2018-07-12T22:53:37Z",
  "creationDate" : "2018-07-12T22:53:37Z",
  "title" : "Test Note",
  "is_trashed" : "no",
  "identifier" : "96F620E1-3743-469E-AA45-B863DD67F9E3-36492-0002D30FF2B6AFF5"
}
```
