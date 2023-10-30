
let issueForm = document.querySelector('.issueForm');
let  Form = document.querySelector('.issueForm>form');


function allInputClick(e){
   
   
    let clicked = e.target;
    

    // Mealdetailpage Open
    if(clicked.classList.contains('CreatenewIssue')){ 

        console.log("clicked create issue");

        if(issueForm.style.display === 'none'){

             issueForm.style.display = 'block';
             Form.style.display = 'block';
             console.log("display = 'block';");

        }else if(issueForm.style.display === 'block'){

            issueForm.style.display = 'none';
            Form.style.display = 'none';  
            console.log("display = 'none';");
        }

    }
}
    



document.addEventListener('click',allInputClick);