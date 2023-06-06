import { db } from "./firebaseConfig";
import { addDoc, collection, getDocs, doc } from "firebase/firestore";

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

const getMetodosPagamentoAsync = async onDataRetrieved => {
    let metodosPagamento = [];
    try{
        const querySnapshot = await getDocs(collection(db, "metodosPagamento"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            metodosPagamento.push({...doc.data(), id:doc.id})
        });
        onDataRetrieved(metodosPagamento);
    }catch(error){
        console.error(error);
    }

}


export {
    createExpenseAsync,
    adminManagementCreateAsync, 
    getMetodosPagamentoAsync, 
}