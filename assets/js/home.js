

function allInputClick(e){
   
   
    let clicked = e.target;

    // Mealdetailpage Open
    if((clicked.parentNode.tagName === 'LI' || clicked.tagName === 'LI') && !clicked.classList.contains('delete') ){ 
         
        let ID;

        if(clicked.id){
            ID=clicked.id;
        }else{
            ID=clicked.parentNode.id;
        }
       
        // open mealdetail.html page
          ( async ()=> {
           

            
            window.location.href = `/project/detail/?id=${ID}`;
            let params = new URLSearchParams(window.location.search);
           
            console.log("refered");
          })();
       
        
    }
}
    



document.addEventListener('click',allInputClick);