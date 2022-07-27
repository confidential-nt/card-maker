import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  set,
} from "firebase/database";

class Database {
  db;
  constructor(app) {
    this.db = getDatabase(app);
  }

  writeData(root, object, id = null, callback = null) {
    const dataListRef = ref(this.db, `${root}`);
    const newDataRef = push(dataListRef);
    if (id) {
      set(ref(this.db, `${root}/` + id), object);
    } else {
      set(newDataRef, object);
    }

    if (callback) {
      newDataRef.then((val) => {
        callback(val);
      });
    }
  }

  readDataById(root, id) {
    return get(child(ref(this.db), `${root}/${id}`));
  }

  readData(root) {
    return get(child(ref(this.db), `/${root}/`));
  }
}

// 사용자가 폼을 제출하면 품에 제출한 정보를 기반으로 오브젝트 만들고, 카드디비에 저장하고 그거 만든 유저의 아이디를 저장하고,
// 마찬가지로 유저디비에도 카드들의 아이디를 나태내야함.
// readDataById, writeData, updateData, deleteData

export default Database;
