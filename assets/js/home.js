

function allInputClick(e){
   
   
    let clicked = e.target;

    // Mealdetailpage Open
    if((clicked.parentNode.tagName === 'LI' || clicked.tagName === 'LI') && !clicked.classList.contains('delete') ){ 

       
        // open mealdetail.html page
          ( async ()=> {
           

            
            window.location.href = `/project/detail/?id=${clicked.id}`;
            let params = new URLSearchParams(window.location.search);
           
            console.log("refered");
          })();
       
        
    }
    



document.addEventListener('click',allInputClick);