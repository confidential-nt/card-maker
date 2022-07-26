import {
  child,
  get,
  getDatabase,
  onChildAdded,
  onValue,
  orderByChild,
  push,
  query,
  ref,
  set,
} from "firebase/database";

class Database {
  db;
  constructor(app) {
    this.db = getDatabase(app);
  }

  writeCardData(cardDataObject) {
    set(ref(this.db, "cards/" + cardDataObject.id), cardDataObject);
  }

  writeCardDataTwo(cardDataObject) {
    const cardListRef = ref(this.db, "cards");
    const newCardRef = push(cardListRef);
    set(ref(this.db, "cards/" + newCardRef.key), cardDataObject);
    // console.log(newCardRef.key);
    // newCardRef.then((val) => {
    //   cardDataObject.id = val.key;
    //   set(newCardRef, cardDataObject);
    // });
  }

  writeUserData(userId, userObject) {
    // {uid: ..., cards: [] 정도로만.}
    // 사용자가 로그인하면...아니면 firebase 자체적인걸 사용? 아무튼...
    // get(child(this.db, `users/${userId}`)).then((snapshot) => {
    //   console.log("snapshot?", snapshot);
    //   // if (!snapshot) {
    //   //   set(ref(this.db, "users/" + userId), userObject);
    //   // }
    // });
    set(ref(this.db, "users/" + userId), userObject);
  }

  writeData(root, object, id = null) {
    if (id) {
      set(ref(this.db, `${root}/` + id), object);
    } else {
      const dataListRef = ref(this.db, `${root}`);
      const newDataRef = push(dataListRef);
      newDataRef.then((val) => {
        object.id = val.key;
        set(newDataRef, object);
      });
    }
  }

  readDataById(root, id, callback) {
    onValue(
      ref(this.db, `/${root}/` + id),
      (snapshot) => {
        callback(snapshot.val());
      },
      {
        onlyOnce: true,
      }
    );
  }

  readData(root, target) {
    onValue(
      ref(this.db, `/${root}/`),
      (snapshot) => {
        // snapshot.forEach((childSnapshot) => {
        //   target.push(childSnapshot.val());
        // });
        target["result"] = snapshot.val();
      },
      {
        onlyOnce: true,
      }
    );
  }

  readCardData() {
    // onValue(
    //   ref(this.db, "cards"),
    //   (snapshot) => {
    //     let i = 1;
    //     // let data = [];
    //     snapshot.forEach((childSnapshot) => {
    //       if (i > snapshot.size) return data;
    //       if(i === 1){

    //       }
    //       const childKey = childSnapshot.key;
    //       const childData = childSnapshot.val();
    //       // data.push(childData);
    //       i++;
    //       // console.log(data);
    //     });
    //   },
    //   {
    //     onlyOnce: true,
    //   }
    // );
    const cardListRef = ref(this.db, "cards");
  }
}

// 사용자가 폼을 제출하면 품에 제출한 정보를 기반으로 오브젝트 만들고, 카드디비에 저장하고 그거 만든 유저의 아이디를 저장하고,
// 마찬가지로 유저디비에도 카드들의 아이디를 나태내야함.
// readDataById, writeData, updateData, deleteData

export default Database;
