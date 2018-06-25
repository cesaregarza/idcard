function CreateID(FirstName, LastName,phone,address,age){
  //We have to format the phone number in the way we want it to work
  var newphonewhodis = formatPhoneNumber(phone);
  //Now we can plug everything into the ID card easily.
  document.getElementById("thecard").style.visibility = "visible";
  document.getElementById("fnameid").innerHTML = FirstName;
  document.getElementById("lnameid").innerHTML = LastName;
  document.getElementById("phoneid").innerHTML = newphonewhodis;
  document.getElementById("addressid").innerHTML = address;
  document.getElementById("ageid").innerHTML = age;
}

function validateForm(){
  //we declare the variables we need and fish them out of the form when this function is called
  var x, z;
  var phone, address;
  x = document.getElementById("field1").value;
  z = document.getElementById("field2").value;
  phone = document.getElementById("field3").value;
  address = document.getElementById("field4").value;
  age = document.getElementById("field5").value;

  //we declare an array with various function names
  var array_of_functions = [
    validate_name,
    validate_name,
    validate_phone,
    validate_address,
    validate_age
  ];

  /*we declare an array with multiple variables that correspond in their array position to the
  array position of their corresponding functions*/
  var array_of_variables = [
    x, z, phone, address, age
  ];

  var array_of_errors = [];

  /*We initiate a for loop that will call each function within the array of functions with its
  its corresponding parameters. It then stores all the results in the array of errors we declared
  above. We do this so we can identify each and every error in the submitted form to modify
  the html page to include little red x's on each field containing an error*/
  for (let i = 0; i<array_of_variables.length; i++){
    array_of_errors.push(array_of_functions[i](array_of_variables[i]));
  }
  
  /*Now that we have an array of errors, we can make sure if there's any issues with any of the fields
  and act accordingly. */
  var i = error_handler(array_of_errors);
  if (i){
    CreateID(x,z,phone,address,age);
  }
}

function validate_name(input){
  //We test if the user has filled out the field. If not, we want to trigger an error.
  if (input === "" || input === null){
    return 1;
  }
  var re = /[^a-z\sA-Z]/;
  //We use a regex that will ONLY activate if there is NO whitespace OR letters which we then invert
    var result = re.test(String(input));
    var i = result ? 2 : 0; //If the result is false, return "valid", if not, return "not valid".
    return i;
}

function validate_phone(input){
  //We test if the user has filled out the field. If not, we want to trigger an error.
  if (input === ""|| input === null){
    return 1;
  }
  var re = /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/;
  //This regex allows for phone numbers in the formats xxx-xxx-xxx, (xxx)xxx-xxxx and xxxxxxxxxx
  var result = re.test(String(input));
  var i = result ? 0 : 2; //If the result is true, return "valid", if not, return "not valid".
  return i;
}

function validate_address(input){
  //We test if the user has filled out the field. If not, we want to trigger an error.
  if (input === "" || input === null){
    return 1;
  }
  var re = /^\d{1,5}\s[a-z\s\dA-Z]+/;
  /*This regex allows for addresses, composed of 1-5 digits followed by any number of digits
  and letters*/
  var result = re.test(String(input));
  var i = result ? 0 : 2; //If the result is true, return "valid", if not, return "not valid".
  return i;
}

function validate_age(input){
  //We test if the user has filled out the field. If not, we want to trigger an error.
  if (input === "" || input === null){
    return 1;
  }
  var re = /\D/;
  /*This regex will check if non-digits are input. If they are, it returns an invalid input error.
  Otherwise, it checks to see whether the age is between 13 and 99.*/
  var result = re.test(String(input));
  if (!result){
    //We now need to parse the string as an int to be able to check if it's between 13 and 99.
    var i = parseInt(input);
    if(i>12 && i<100){
      return 0; //input is a number AND between 13 and 99, thus valid.
    } else {
      return 2; //input is a number BUT not between 13 and 99, thus not valid.
    }
  } else {
    return 2; //input is not valid
  }
}

function error_handler(inputarray){
  /*This function will take an array of true/false values and give each corresponding field the red x
  to show an error. We have already set it up so there's two instances of errors, an error with an
  assigned value of 1 is a "empty field" error, and an error with an assigned value of 2 is a
  "invalid input" error. */
  var temp, tempy;
  var k = 0;
  for(let i = 0; i<inputarray.length; i++){
    temp = "field" + (i+1); //this is to set up where the x's will appear
    tempy = "tooltiptext" + (i+1); //this is to pop up the associated tooltip
    if(inputarray[i] === 1){
      //If there's an error in a field, show an x by the field
      document.getElementById(temp).style.backgroundSize = "16px";
      document.getElementById(tempy).style.opacity = "1";
      document.getElementById(tempy).style.visibility = "visible";
      document.getElementById(tempy).innerHTML = "Please fill out all fields";
      //now we want to hide an already-generated ID card if there's an error
      document.getElementById("thecard").style.visibility = "hidden";
    } else if(inputarray[i] === 2){
      //If there's an error in a field, show an x by the field
      document.getElementById(temp).style.backgroundSize = "16px";
      document.getElementById(tempy).style.visibility = "visible";
      document.getElementById(tempy).style.opacity = "1";
      document.getElementById(tempy).innerHTML = "Invalid entry";
      //now we want to hide an already-generated ID card if there's an error
      document.getElementById("thecard").style.visibility = "hidden";
    } else {
      //If the user has fixed the error, remove the x's.
      document.getElementById(temp).style.backgroundSize = "0px";
      document.getElementById(tempy).style.opacity = "0";
      //now we add 1 to variable k if a field has no error
      k++;
    }
  }
  //If none of the fields contain an error, go ahead and create the ID
  if (k === inputarray.length){
    return true;
  } else {
    return false;
  }
  
}
function formatPhoneNumber(input) {
  //This strips away formats and formats it as (xxx)xxx-xxxx
  var i = (""+input).replace(/\D/g, '');
  var k = i.match(/^(\d{3})(\d{3})(\d{4})$/);
  return (!k) ? null : "(" + k[1] + ") " + k[2] + "-" + k[3];
}