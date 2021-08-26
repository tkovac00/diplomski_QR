import React, { useState, useEffect } from 'react';
import './styles.css';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';

// for update here we need to GET the current ID of post which we need to change
const Form = ({ currentId, setCurrentId, setIsEditing}) => {

    const [postData, setPostData] = useState({
        payer_name: '', payer_surname: '', payer_adress: '', payer_postNu_city: '', title: '', bill_adress: '', bill_postNu_city: '', amount: '', IBAN: '', model: '', reference_number: '', month_year: '', date: ''
    });

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null); //dohvacanje data form redux, dohvacanje (podataka) posta koji ima isti ID kao trenutni,ako nema current ID onda null
    const dispatch = useDispatch();

    useEffect(() => { //koristili smo za update
        if (post) { setPostData(post) };
    }, [post]); // za popunit podatke u formi(useefeeect korisit se za prikazat nesto ako se nesto promijeni) ako se forma promijeni od nicega u pravi post

 
    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
            setIsEditing(false);

        } else {
            dispatch(createPost(postData)); //ako je currentId null dispatchamo createPost()
            setIsEditing(false);
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ payer_name: '', payer_surname: '', payer_adress: '', payer_postNu_city: '', title: '', bill_adress: '', bill_postNu_city: '', amount: '', IBAN: '', model: '', reference_number: '', month_year: '', date: ''});
    }

    return (
        <div className="container">
            <h2 className="titles"  >{currentId ? 'Editing the' : 'Add a new'} bill</h2>

            <form className="form" autoComplete="off" noValidate>
                <input type="text" placeholder="Name" name="payer_name" value={postData.payer_name} onChange={(e) => setPostData({ ...postData, payer_name: e.target.value })} /><br />
                <input type="text" placeholder="Surname" name="payer_surname" value={postData.payer_surname} onChange={(e) => setPostData({ ...postData, payer_surname: e.target.value })} /><br />
                <input type="text" placeholder="Adress" name="payer_adress" value={postData.payer_adress} onChange={(e) => setPostData({ ...postData, payer_adress: e.target.value })} /><br />
                <input type="text" placeholder="Postal code and city" name="payer_postNu_city" value={postData.payer_postNu_city} onChange={(e) => setPostData({ ...postData, payer_postNu_city: e.target.value })} /><br />
                <input type="text" placeholder="Bill for..." name="title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} /><br />
                <input type="text" placeholder="Payment adress" name="bill_adress" value={postData.bill_adress} onChange={(e) => setPostData({ ...postData, bill_adress: e.target.value })} /><br />
                <input type="text" placeholder="Payment postal code and city" name="bill_postNu_city" value={postData.bill_postNu_city} onChange={(e) => setPostData({ ...postData, bill_postNu_city: e.target.value })} /><br />
                <input type="text" placeholder="Amount" name="amount" value={postData.amount} onChange={(e) => setPostData({ ...postData, amount: e.target.value })} /><br />
                <input type="text" placeholder="IBAN" name="IBAN" value={postData.IBAN} onChange={(e) => setPostData({ ...postData, IBAN: e.target.value })} /><br />
                <input type="text" placeholder="MODEL" name="model" value={postData.model} onChange={(e) => setPostData({ ...postData, model: e.target.value })} /><br />
                <input type="text" placeholder="Reference number" name="reference_number" value={postData.reference_number} onChange={(e) => setPostData({ ...postData, reference_number: e.target.value })} /><br />
                <input type="month" placeholder="Payment month/year" name="month_year" value={postData.month_year} onChange={(e) => setPostData({ ...postData, month_year: e.target.value })} /><br />
                <input type="date" placeholder="Payment date" name="date" value={postData.date} onChange={(e) => setPostData({ ...postData, date: e.target.value })} /><br />
                
                <button type="button" className="cancel" onClick={()=>{setIsEditing(false);clear();}}>Cancel</button>
                <button type="submit" className="submit" onClick={handleSubmit}>Submit</button>
                
            </form>
            
        </div>
    );
}

export default Form;