import { db } from "./firebaseConfig";
import { addDoc, collection, getDocs, doc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";

const createExpenseAsync = async (newExpense)=> {
    try{
        const docRef = await addDoc(collection(db, "expenses"), newExpense);
    }catch(error){
        console.log(error);
    }
}

const adminManagementCreateAsync = async (obj, nameCollection, onSuccess)=>{
    try{
        const docRef = await addDoc(collection(db, nameCollection), obj);
        onSuccess(); 
    }catch(error){
        console.error(error);
    }
} 

const getAllDataCollectionAsync = async (onDataRetrieved, nameCollection) => {
    let arrayData = [];
    try{
        const querySnapshot = await getDocs(collection(db, nameCollection));
        querySnapshot.forEach((doc) => {
            arrayData.push({...doc.data(), id:doc.id})
        });
        onDataRetrieved(arrayData);
    }catch(error){
        console.error(error);
    }
}

const adminDeleteDocAsync = async (onDelete, id, nameCollection)=>{
    try{
        await deleteDoc(doc(db, nameCollection, id));
        onDelete();
    }catch(error){
        console.log(error);
    } 
}

const getDocumentOfCollection = async (onDataRetrieved, id, nameCollection)=>{
    let docObj = {};
    const docSnap = await getDoc(doc(db, nameCollection, id));

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        docObj = {...docSnap.data(),id};
    } else {
        console.log("No such document!");
    }
    onDataRetrieved(docObj);
}

const updateDocument = async (onDataRetrieved, id, nameCollection,obj)=>{
    await updateDoc(doc(db, nameCollection, id),obj);
    onDataRetrieved();
}


export {
    createExpenseAsync,
    adminManagementCreateAsync, 
    getAllDataCollectionAsync,
    adminDeleteDocAsync, 
    getDocumentOfCollection,
    updateDocument,
}