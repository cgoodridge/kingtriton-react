export const loadMenu = () => async (dispatch, getState) => {
    db
      .collection('menu')
      .onSnapshot(snapshot => (
        setMenuItems(snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        })))
      ))
}


export const displayAlert = () => () => {
    alert('Hello');
};