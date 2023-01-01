var courseName=document.getElementById("courseName");
var courseCategory=document.getElementById("courseCategory");
var coursePrice=document.getElementById("coursePrice");
var courseDescription=document.getElementById("courseDescription");
var courseCapacity=document.getElementById("courseCapacity");
var addBtn=document.getElementById("addBtn");
var displayNoneElement=document.getElementById("nameAlert");
console.log(displayNoneElement);
var tBody=document.getElementById("tbody");
var deleteAll=document.getElementById("deleteAll");
var searchBtn=document.getElementById("searchBtn");
console.log(searchBtn)
var currentIndex=0;
var categoryAlert=document.getElementById("categoryAlert");
var priceAlert=document.getElementById("priceAlert");
var descriptionAlert=document.getElementById("descriptionAlert");
var capacityAlert=document.getElementById("capacityAlert");

var courses;
if(JSON.parse(localStorage.getItem("courses"))==null)
{
 courses=[];
} else{
  courses=JSON.parse(localStorage.getItem("courses"));
  displayData();
}
// console.log(courseName.value,courseCategory,courseDescription,coursePrice,courseCapacity);
addBtn.onclick=function(event)
{
    event.preventDefault();
    if(addBtn.value=="Add Course"){
      addCourse();
    } 
    else
      updateCourse();
   clearInputs();
   displayData();

}
function addCourse()
{
  var course={courseName:courseName.value,
    courseCategory:courseCategory.value,
    coursePrice:coursePrice.value,
    courseDescription:courseDescription.value,
    courseCapacity:courseCapacity.value
}; 
courses.push(course);
localStorage.setItem("courses",JSON.stringify(courses));
Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Course added succesfully',
    showConfirmButton: false,
    timer: 1500
  })
  courseName.classList.remove("is-valid");
  courseCategory.classList.remove("is-valid");
  coursePrice.classList.remove("is-valid");
  courseDescription.classList.remove("is-valid");
  courseCapacity.classList.remove("is-valid");
}
//clear inputs
function clearInputs()
{
    courseName.value='';
    courseCategory.value='';
    courseDescription.value='';
    coursePrice.value='';
    courseCapacity.value='';
}
//display data..
function displayData()
{
var result='';
for(var i=0;i<courses.length;i++){
    result+=`<tr><td>${i+1}</td>
              <td>${courses[i].courseName}</td>
              <td>${courses[i].courseCategory}</td>
              <td>${courses[i].coursePrice}</td>
              <td>${courses[i].courseDescription}</td>
              <td>${courses[i].courseCapacity}</td>
              <td><button class="btn btn-outline-info" onclick='getCourse(${i})'>Update</button></td>
              <td><button class="btn btn-outline-danger" onclick='deleteCourse(${i})'>Delete</button></td>
              </tr>
              `;

}
tBody.innerHTML=result;
}
function getCourse(index)
{
  var course = courses[index];
  console.log(course);
  courseName.value=course.courseName;
  courseCategory.value=course.courseCategory;
  coursePrice.value=course.coursePrice;
  courseDescription.value=course.courseDescription;
  courseCapacity.value=course.courseCapacity;
  addBtn.value="Update Course";

  currentIndex=index;
}
function updateCourse()
{
  var course={
    courseName:courseName.value,
    courseCategory:courseCategory.value,
    coursePrice:coursePrice.value,
    courseDescription:courseDescription.value,
    courseCapacity:courseCapacity.value
  };
  var name=courses[currentIndex].courseName;
  console.log(name);
  courses[currentIndex].courseName=course.courseName;
  courses[currentIndex].courseCategory=course.courseCategory;
  courses[currentIndex].coursePrice=course.coursePrice;
  courses[currentIndex].courseDescription=course.courseDescription;
  courses[currentIndex].courseCapacity=course.courseCapacity;
  addBtn.value="Update Course";
  localStorage.setItem("courses",JSON.stringify(courses));


  Swal.fire({
    position: 'center',
    icon: 'success',
    title: `${name} updated succesfully`,
    showConfirmButton: false,
    timer: 1500
  });
  displayData();
  addBtn.value="Add Course"
}
//delete course and display updated data in table
function deleteCourse(index)
{ 
    Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
        courses.splice(index,1);
        localStorage.setItem("courses",JSON.stringify(courses));
        displayData();
      Swal.fire(
        'Deleted!',
        'Course has been deleted.',
        'success'
      )
    }
  })
 
}
// delete all courses
deleteAll.onclick=function()
{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            courses=[];
            localStorage.setItem("courses",JSON.stringify(courses));
            tBody.innerHTML='';
          Swal.fire(
            'Deleted!',
            'All data has been deleted.',
            'success'
          )
        }
      })


}
//Activate search btn
searchBtn.onkeyup=function()
{
   var result='';
   for(var i=0;i<courses.length;i++)
   {
    if(courses[i].courseName.toLowerCase().includes(searchBtn.value))
    {
        result+=`<tr><td>${i+1}</td>
        <td>${courses[i].courseName}</td>
        <td>${courses[i].courseCategory}</td>
        <td>${courses[i].coursePrice}</td>
        <td>${courses[i].courseDescription}</td>
        <td>${courses[i].courseCapacity}</td>
        <td><button class="btn btn-outline-info">Update</button></td>
        <td><button class="btn btn-outline-danger" onclick='deleteCourse(${i})'>Delete</button></td>
        </tr>
        `;
    }
   }
   tBody.innerHTML=result;
}
/* courseName Validation
First letter capital
3-15 letters
allowed numbers
pattern=/^[A-Z][a-z]{2,10}$/
*/
courseName.onkeyup=function()
{
  var pattern=/^[A-Z][a-zA-Z0-9]{2,12}/;
  if(pattern.test(courseName.value))
  { if(courseName.classList.contains("is-invalid") 
      && document.getElementById("nameAlert").classList.contains("d-block") ){
        document.getElementById("nameAlert").classList.replace('d-block','d-none');
        courseName.classList.replace("is-invalid","is-valid");
    
  } else {
    courseName.classList.add("valid");
    addBtn.removeAttribute('disabled');
  }
  } else{
    if(courseName.classList.contains("is-valid") && document.getElementById("nameAlert").classList.contains("d-none"))
    {
      courseName.classList.replace("is-valid","is-invalid");
      document.getElementById("nameAlert").classList.replace("d-none","d-block")
    }else{
      courseName.classList.add("is-invalid");
      addBtn.setAttribute('disabled','disabled');
      document.getElementById("nameAlert").classList.replace("d-none","d-block")
    }
    
  }
  
}

/*
courseCategory
First letter capital
letters between 2-20
just using letters, no numbers
/^[A-Z][a-z]{2,20}$/
*/
courseCategory.onkeyup=function()
{
  var pattern=/^[A-Z][a-zA-Z\s]{2,20}$/;
  if(pattern.test(courseCategory.value))
  { if(courseCategory.classList.contains("is-invalid")
   && categoryAlert.classList.contains("d-block")){
    courseCategory.classList.replace("is-invalid","is-valid");
    categoryAlert.classList.replace("d-block","d-none")
  } else {
    courseCategory.classList.add("valid");
    addBtn.removeAttribute('disabled');
  }
  } else{
    if(courseCategory.classList.contains("is-valid") 
     && categoryAlert.classList.contains("d-none"))
    {
      courseCategory.classList.replace("is-valid","is-invalid");
      categoryAlert.classList.replace("d-none","d-block");
    }else{
      courseCategory.classList.add("is-invalid");
      categoryAlert.classList.replace("d-none","d-block");
      addBtn.setAttribute('disabled','disabled');
    }
    
  }
}

/*
coursePrice
Just using numbers

/^[0-9]{3,4}$/
*/
coursePrice.onkeyup=function()
{
  var pattern=/^[0-9]{3,4}$/;
  if(pattern.test(coursePrice.value))
  { if(coursePrice.classList.contains("is-invalid") &&
     priceAlert.classList.contains("d-block")){
    coursePrice.classList.replace("is-invalid","is-valid");
     priceAlert.classList.replace("d-block","d-none");
  } else {
    coursePrice.classList.add("valid");
    addBtn.removeAttribute('disabled');
  }
  } else{
    if(coursePrice.classList.contains("is-valid"))
    {
      coursePrice.classList.replace("is-valid","is-invalid");
      priceAlert.classList.replace("d-none","d-block");
    }else{
      coursePrice.classList.add("is-invalid");
      addBtn.setAttribute('disabled','disabled');
      priceAlert.classList.replace("d-none","d-block");

    }
    
  }
}

/*
courseDescription
first letter capital 
letters between 3-120
numbers
/^[A-Z][A-Za-z0-9/s]{3,120}$/
*/
courseDescription.onkeyup=function()
{
  var pattern=/^[A-Z][A-Za-z0-9.'\s]{3,120}$/;
  if(pattern.test(courseDescription.value))
  { if(courseDescription.classList.contains("is-invalid") &&
     descriptionAlert.classList.contains("d-block")){
    courseDescription.classList.replace("is-invalid","is-valid");
    descriptionAlert.classList.replace("d-block","d-none");

  } else {
    courseDescription.classList.add("valid");
    addBtn.removeAttribute('disabled');
  }
  } else{
    if(courseDescription.classList.contains("is-valid") &&
     descriptionAlert.classList.contains("d-none"))
    {
      courseDescription.classList.replace("is-valid","is-invalid");
      descriptionAlert.classList.replace("d-none","d-block");
    }else{
      courseDescription.classList.add("is-invalid");
      addBtn.setAttribute('disabled','disabled');
      descriptionAlert.classList.replace("d-none","d-block");

    }
    
  }
}
/*
courseCapacity
Just using numbers 2-3 numbers
/^[0-9]{2,3}$/
*/
courseCapacity.onkeyup=function()
{
  var pattern=/^[0-9]{2,3}$/;
  if(pattern.test(courseCapacity.value))
  { if(courseCapacity.classList.contains("is-invalid") 
     && capacityAlert.classList.contains("d-block")){
    capacityAlert.classList.replace("d-block","d-none");
    courseCapacity.classList.replace("is-invalid","is-valid");
  } else {
    courseCapacity.classList.add("valid");
    addBtn.removeAttribute('disabled');
  }
  } else{
    if(courseCapacity.classList.contains("is-valid") && 
     capacityAlert.classList.contains("d-none"))
    {
      capacityAlert.classList.replace("d-none","d-block");
      courseCapacity.classList.replace("is-valid","is-invalid");
      
    }else{
      capacityAlert.classList.replace("d-none","d-block");
      courseCapacity.classList.add("is-invalid");
      addBtn.setAttribute('disabled','disabled');
    }
    
  }
}