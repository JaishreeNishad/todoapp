const PouchDB = require("pouchdb");
const pouchdb = PouchDB.default.defaults();
const db = new pouchdb("mypouchdb");
db.info().then((info) => {
  console.log("Show me ", info);
});

export function insertToDB(data) {
  return db
    .post(data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("This error ", error, "This data", data);
      console.log("------------------ ", error);
    });
}

export function getToDB() {
  const val = db
    .allDocs({ include_docs: true, descending: true }, (err, doc) => {
      return doc.rows;
    })
    .catch((err) => {
      console.error(err);
    });
  return val;
}

export function removeToDB(id) {
  console.log(id, "id======");
  db.get(id)
    .then((doc) => {
      //console.log(" doc== ", doc, "THIS doc Contain ");
      return db.remove(doc);
    })
    .catch((err) => {
      console.error("remove err IS ", err);
    });
}
