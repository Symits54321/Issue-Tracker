
let issueForm = document.querySelector('.issueForm');
let  Form = document.querySelector('.issueForm>form');
let  Author = document.querySelector('.authorFilter');
let  Label = document.querySelector('.labelFilter');
 let projectId =  document.querySelector('#project_id').textContent;

 let issueList = document.querySelector('.issuelist-ul');
 //let filterDetails = document.querySelector('.filter-details');
 





// List of issue to be displayed 

    let projectIssues  ;
    let authorsToFilter;
    let labelsToFilter;

async function IssueApiCall(){

    let url = `http://localhost:8100/api/issue/filter/?project_id=${projectId}`;
     
 // calling api and checking   
  let response = await fetch(url);
    if (!response.ok) {
        console.log("response error");
        throw new Error(`HTTP error! status: ${response.status}`);
        
    }
 // fetching json from url response  
 const jsonData = await response.json();

  projectIssues = await jsonData.issue; 
  authorsToFilter= await jsonData.authorsToFilter;
  labelsToFilter= await jsonData.labelsToFilter;

    console.log(projectIssues);

    return projectIssues;
}


async function displayIssues(Issues){

    let length= await Issues.length;

      // refreshing mainpage
      issueList.innerHTML=``;
      // adding headpart of list
      let dropdownLabels = labelsToFilter.map(label => `<li class='labelList'>${label}</li>`).join('');
      let dropdownAuthors = authorsToFilter.map(label => `<li class='authorList'>${label}</li>`).join('');
      issueList.innerHTML=`

      <div id="headList">
      <p style="font-weight: 600;">Issues:-${Issues.length} by api</p>
      <div class="filter-details">
      <a class="clear-filter">Clear filter</a>
      </div>
      <p style="margin-left:auto ;">Filter by :- </p>
      <!-- dropdown filter of author and labels  -->
      <div class="dropdown" >
        <p  class="authorbtn">Author </p>
         
              <ul class="authorFilter collapsed" style="display: none;">
               ${dropdownAuthors}
              </ul>
          </div>
      <div class="dropdown">
          <p class="labelbtn">Label</p>
              <ul class="labelFilter collapsed" style="display: none;">
                 ${dropdownLabels}
                
              </ul>

            </div>
            
        </div>
      
      `;


      // creating list to be appended
     
      
      for(issue of Issues){
        let labels = issue.label.map(label => `<li>${label}</li>`).join(''); // join by space ' ' and not ','
        let list = document.createElement('LI');
       
        list.innerHTML = `
        <h3 style="text-decoration: underline;">${issue.title}</h3>
        <p style="margin-top:5px ; font-style: italic;">${ issue.description}</p>
        <p style="font-size: 13px;">by ${ issue.author } </p>
        <ul class="bug">
            <h5>Labels:-</h5>
            ${labels}
        </ul>     
        `;

        issueList.appendChild(list)
      } 


}


async function refreshFilterDisplay(){

    let filterDetails = document.querySelector('.filter-details');

    let savedData1 = await sessionStorage.getItem('myAuthors');
    let authorsFiltered = savedData1 ? JSON.parse(savedData1) : [];

    const savedData2 = await sessionStorage.getItem('myLabels');
    let labelsFiltered = savedData2 ? JSON.parse(savedData2) : [];

    filterDetails.innerHTML=``;

    filterDetails.innerHTML=` 

      <a class="clear-filter">Clear filter</a>
      <p>${authorsFiltered}</p>
      <p>${labelsFiltered}</p>
    `;

}


async function issueFilterApi(){

    let savedData1 = await sessionStorage.getItem('myAuthors');
    let authorsfilter = await savedData1 ? JSON.parse(savedData1) : [];

    const savedData2 = await sessionStorage.getItem('myLabels');
    let labelsfilter = await savedData2 ? JSON.parse(savedData2) : [];


    filterUrl=`http://localhost:8100/api/issue/filter/?project_id=${projectId}&author=${authorsfilter}&label=${labelsfilter}`;



    // calling api and checking   
    let response = await fetch(filterUrl);
    if (!response.ok) {
        console.log("response error");
        throw new Error(`HTTP error! status: ${response.status}`);
      
    }

    // fetching json from url response  
    const jsonData = await response.json();

    let filteredIssues = await jsonData.issue; 
    //authorsToFilter= await jsonData.authorsToFilter;
    //labelsToFilter= await jsonData.labelsToFilter;

    console.log(filteredIssues);

    displayIssues(filteredIssues);

   

}





// All click in screen manager(i.e event listener)

async function allInputClick(e){
   
   
    let clicked = e.target;
    
    console.log("you clicked"+clicked.classList);
    console.log(projectId);

    // createIssue page
    if(clicked.classList.contains('CreatenewIssue') || clicked.classList.contains('cancel')){ 

        console.log("clicked create issue");

        if(issueForm.classList.contains('collapsed')){
         
             issueForm.style.animation = "scrollDown 600ms linear";
             console.log("scrolldown");
             issueForm.classList.remove('collapsed');
             issueForm.style.height='400px';
             issueForm.style.border='1px solid lightgrey';
             Form.style.height='400px';
           

        }else {

            issueForm.style.animation = "scrollUp 600ms linear";
            console.log("scrollup");
            issueForm.classList.add('collapsed');
            issueForm.style.height='0px';
            issueForm.style.border='none';
            Form.style.height='0px';
           
        }

    }

   //clear Filters
   if(clicked.classList.contains('clear-filter')){
    removeDataOnPageReload();
    fetchDataAndDisplayIssues();
    refreshFilterDisplay();

   } 


// Author Filter eventlistener

    if(clicked.classList.contains('authorbtn') || clicked.classList.contains('authorList')){ 

                    
            let  Author = document.querySelector('.authorFilter');
            let  Label = document.querySelector('.labelFilter');

        console.log("clicked filter author part");

        if(Author.classList.contains('collapsed')){
         
             Label.style.display='none';
             Label.classList.add('collapsed');
             console.log("Filter on");
             Author.classList.remove('collapsed');
             Author.style.display='block';
            
           

        }else {
// saving list of authors to be filtered

           if(clicked.classList.contains('authorList')){
                let newauthor=clicked.textContent;
                let temp=[];
                temp.push(newauthor);
                const newdata = temp.map((item) => item.trim());
                
                const savedData = sessionStorage.getItem('myAuthors');
                let authors = savedData ? JSON.parse(savedData) : [];

                  authors =   [...new Set([...authors, ...newdata])];
                
                  sessionStorage.setItem('myAuthors', JSON.stringify(authors));

                console.log("authors:-"+authors);

                
                // render filter list
                   issueFilterApi();
                   
                

           }
            
            console.log("Filter off");
            Author.classList.add('collapsed');
            Author.style.display='none';
           
        }

       
    }


// Label Filter  eventlistener

    if(clicked.classList.contains('labelbtn') || clicked.classList.contains('labelList')){ 

                        
            let  Author = document.querySelector('.authorFilter');
            let  Label = document.querySelector('.labelFilter');

        console.log("clicked filter label part");

        if(Label.classList.contains('collapsed')){
         
            Author.style.display='none';
            Author.classList.add('collapsed');
             console.log("Filter on");
             Label.classList.remove('collapsed');
             Label.style.display='block';
            
           

        }else {

// saving list of labels to be filtered

           if(clicked.classList.contains('labelList')){
            let newlabel=clicked.textContent;
            let temp=[];
            temp.push(newlabel);
            const newdata = temp.map((item) => item.trim());
            
            const savedData = sessionStorage.getItem('myLabels');
            let labels = savedData ? JSON.parse(savedData) : [];

              labels =   [...new Set([...labels, ...newdata])];

              sessionStorage.setItem('myLabels', JSON.stringify(labels));

            console.log("labels :-"+labels);


             // render filter list           
                issueFilterApi();

       }


            
            console.log("Filter off");
            Label.classList.add('collapsed');
            Label.style.display='none';
           
        }

      
    }

// Outside clicked event listener    
    
    if(!clicked.classList.contains('labelbtn') && !clicked.classList.contains('labelList') && !clicked.classList.contains('authorbtn') && !clicked.classList.contains('authorList')){
        
        // when clicking outside off the dropdown
        let  Author = document.querySelector('.authorFilter');
        let  Label = document.querySelector('.labelFilter');
        console.log("Full Filter dropdown off");
        Author.classList.add('collapsed');
        Author.style.display='none';
        Label.classList.add('collapsed');
        Label.style.display='none';
    }
// refreshes the filter results (as saving and displaying cannot occur simultaneously)
    setTimeout(refreshFilterDisplay, 200); 
}


    
document.addEventListener('click',allInputClick);




//refreshing session
function removeDataOnPageReload() {
    sessionStorage.removeItem('myAuthors');
    sessionStorage.removeItem('myLabels');
  }

  window.addEventListener('beforeunload', removeDataOnPageReload); 


// Api call on Loading page
  async function fetchDataAndDisplayIssues() {
    try {
      const issues = await IssueApiCall(); // Assuming IssueApiCall is an asynchronous function
      displayIssues(issues);
    } catch (error) {
      console.error('Error fetching issues:', error);
    }
  }
  
  window.onload = function() {
    smoothScroll();
    fetchDataAndDisplayIssues();
  }
 
  // Smooth scrolll while opening page
function smoothScroll() {
    const start = window.scrollY;
    const end = 300; // Scroll down to 10 pixels from the top
    const duration = 1500; // Animation duration in milliseconds

    function scroll(timestamp) {
        const currentTime = timestamp || new Date().getTime();
        const progress = Math.min((currentTime - start) / duration, 1);

        window.scrollTo(0, start + (end - start) * progress);

        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    }

    requestAnimationFrame(scroll);
}
  
  
  