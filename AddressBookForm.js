//Added Validations For User Input
//Name Validation
const name = document.querySelector('#name');
const nameError = document.querySelector('.name-error');
name.addEventListener('input', function() {
    let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}[ : ][A-Z]{1}[a-z]{2,}$');
    if (nameRegex.test(name.value)) nameError.textContent = "";
    else nameError.textContent = "Name is Incorrect";
})

//Phone Number Validation
const phone = document.querySelector('#phone');
const phoneError = document.querySelector('.phone-error');
phone.addEventListener('input', function() {
    let phoneRegex = RegExp('^(?=.+)[0-9]{0,3}[0-9]{10}$');
    if (phoneRegex.test(phone.value)) phoneError.textContent = "";
    else phoneError.textContent = "Phone Number is Incorrect";
})


//Address Validation
const address = document.querySelector('#address');
const addressError = document.querySelector('.address-error');
address.addEventListener('input', function() {
    let addressRegex = RegExp('.*');
    if (addressRegex.test(address.value)) addressError.textContent = "";
    else addressError.textContent = "Address is Incorrect";
})

//on save
const save = () => {
    try {
        let contactData = createAddressBookObject();
        if (contactData != undefined) UpdateLocalStorage(contactData);
        resetForm();
        window.location.replace(site_properties.home_page)
    } catch (e) {
        return;
    }
};

const createAddressBookObject = () => {

    let contactData = new AddressBookContact();
    try {
        contactData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.name-error', e);
        throw e;
    }

    contactData.name = getInputValueById('#name');
    contactData.phone = getInputValueById('#phone');
    contactData.address = getInputValueById('#address');
    contactData.city = getInputValueById('#city');
    contactData.state = getInputValueById('#state');
    contactData.zip = getInputValueById('#zip');
    contactData.id = createContactId();
    alert(contactData.toString());
    return contactData;
};

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if (item.checked)
            selItems.push(item.value);
    });
    return selItems;
}
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
};

function UpdateLocalStorage(contactData) {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressBookList != undefined) {
        addressBookList.push(contactData);
    } else {
        addressBookList = [contactData];
    }
    alert(addressBookList.toString());
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
};

const createContactId = () => {
    let contactId = localStorage.getItem("ContactID");
    contactId = !contactId ? 1 : (parseInt(contactId) + 1).toString();
    localStorage.setItem("ContactID", contactId);
    return contactId;
};

const resetForm = () => {
    setValue('#name', '');
    setValue('#phone', '');
    setValue('#address', '');
    setValue('#city', 'City');
    setValue('#state', 'State');
    setValue('#zip', '');
};

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}