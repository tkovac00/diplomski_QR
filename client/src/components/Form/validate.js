

//    const [errorMessage, setErrorMessage] = useState({
//     payer_name_error: '', payer_surname_error: '', payer_adress_error: '', payer_postNu_city_error: '', title_error: '', bill_adress_error: '', bill_postNu_city_error: '', amount_error: '', IBAN_error: '', model_error: '', reference_number_error: '', month_year_error: '', date_error: ''
// });

// const [validate, isValidate]=useState(false);

//    const changeHandler = (e) => {
//     if (e.target.name === "payer_name") {
//         if (!e.target.value.match(/^[a-zA-Z][a-zA-Z\s]*$/) && e.target.value !== "") {
//             setErrorMessage({ ...errorMessage, payer_name_error: 'Letters only' });
//             isValidate(false);
//         }
//         else
//             setErrorMessage({ ...errorMessage, payer_name_error: '' }); isValidate(true);
//     }

//     else if (e.target.name === "payer_surname") {
//         if (!e.target.value.match(/^[a-zA-Z][a-zA-Z\s]*$/) && e.target.value !== "") {
//             setErrorMessage({ ...errorMessage, payer_surname_error: 'Letters only' });
//             isValidate(false);
//         }
//         else
//             setErrorMessage({ ...errorMessage, payer_surname_error: '' });isValidate(true);
//     }

//     else if (e.target.name === "amount") {
//         if (!e.target.value.match(/^[0-9]*\.?[0-9]*$/) && e.target.value !== "") {
//             setErrorMessage({ ...errorMessage, amount_error: 'Numbers only' });
//             isValidate(false);
//         }
//         else
//             setErrorMessage({ ...errorMessage, amount_error: '' });isValidate(true);
//     }

//     else if (e.target.name === "IBAN") {
//         if (!e.target.value.match(/^[A-Z]{2}[0-9]{19,23}$/) && e.target.value !== "") {
//             setErrorMessage({ ...errorMessage, IBAN_error: 'Correct format (e.g.) : HR1234567891234567891' });
//             isValidate(false);
//         }
//         else
//             setErrorMessage({ ...errorMessage, IBAN_error: '' });isValidate(true);
//     }

//     else if (e.target.name === "model") {
//         if (!e.target.value.match(/^[A-Z]{2}[0-9]{2}$/) && e.target.value !== "") {
//             setErrorMessage({ ...errorMessage, model_error: 'Correct format (e.g.) : HR00' });
//             isValidate(false);
//         }
//         else
//             setErrorMessage({ ...errorMessage, model_error: '' });isValidate(true);
//     }
//     else if (e.target.name === "reference_number") {
//         if (!e.target.value.match(/^[0-9-]+$/) && e.target.value !== "") {
//             setErrorMessage({ ...errorMessage, reference_number_error: 'Correct format (e.g.) : 2706-153-2021' });
//             isValidate(false);
//         }
//         else
//             setErrorMessage({ ...errorMessage, reference_number_error: '' });isValidate(true);
//     }

//     else if (e.target.name === "month_year") {
//         if (e.target.value === "") {
//             setErrorMessage({ ...errorMessage, month_year_error: 'Please, select a month/year' });
//             isValidate(false);
//         }
//     }

//     else if (e.target.name === "date") {
//         if (e.target.value === "") {
//             setErrorMessage({ ...errorMessage, date_error: 'Please, select a date of paying' });
//             isValidate(false);
//         }
//     }
//     else
//         console.log("...");

// }

