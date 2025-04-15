"user-strict"

window.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayData();
});


const apiUrl = `https://randomuser.me/api/`

let correctScore = document.getElementById('correct-ans')
let wrongScore = document.getElementById('wrong-ans')


function fetchAndDisplayData() {
//FETCH TRENDS/TOP GAMES INFO
fetch(apiUrl).then(res => res.json()).then(data => {
    
    const personlist = document.querySelectorAll('#person-detail li')
    const personimgs = document.querySelectorAll('#person-imgs li')

    data.results.forEach(item => {
    
        //LIST RANDOM PERSON DETAILS
        personlist.forEach((li, index) => {
            li.classList.remove('fade-in', 'show');
         
          
            if(index == 0){li.innerHTML = `Name: <span class='api-res'>${item.name.first} ${item.name.last}</span>`}
            else if(index == 1){li.innerHTML = `Age: <span class='api-res'>${item.dob.age}</span>`}
            else if(index == 2){li.innerHTML = `Gender: <span class='api-res'>${item.gender}</span>`}
            else if(index == 3){li.innerHTML = `Country: <span class='api-res'>${item.location.country}</span>`}
           
            // Let browser render, then trigger transition
         
            requestAnimationFrame(() => {
             li.classList.add('fade-in', 'show')
              });
         
         

        });

        //SET DITO UNG IMAGES RANDOMLY
                    let apiUrlimg = `https://randomuser.me/api/?gender=${item.gender}&inc=picture&results=2`
{/* <img src="${item.picture.large}" alt="person1"> */}
                    let personsImg = [`<img src="${item.picture.large}" alt="person" class='random-images'>`]; // COLLECTION OF 3 IMG
                    
                    fetch(apiUrlimg).then(res => res.json()).then(data => { 
                            data.results.forEach(imgs => {
                                
                                personsImg.push(`<img src="${imgs.picture.large}" alt="person" class='random-images'>`)

                             })
                               

                            //  console.log(shuffleArray(personsImg));
                             let holdimagesposition = shuffleArray(personsImg) //SHUFFLE IMAGES
                
                             personimgs.forEach((li, index) =>{ //DISPLAY DOM HTML

                                li.classList.remove('fade-in', 'show');
                                li.innerHTML = holdimagesposition[index];               
                                requestAnimationFrame(() => {
                                    li.classList.add('fade-in', 'show')
                                     });                              
                            
                             })

                             document.querySelectorAll('.random-images').forEach(img => {

                                img.addEventListener('click', () => {
                                    
                                            let x = wrongScore.innerHTML
                                            let y = correctScore.innerHTML 

                                            if(img.src == item.picture.large){
                                                correctScore.innerHTML = Number(y) + 1
                                                alert('Correct!')
                                            }else{
                                                wrongScore.innerHTML = Number(x) + 1
                                                alert('Wrong!')
                                            }

                                           
                                          
                                            setTimeout(() => {
                                                fetchAndDisplayData();
                                              }, 800);
                                     
                                            


                                });
                            });
                            
                           
                    }).catch(error => console.error('Error:', error));
            })

}).catch(error => console.error('Error:', error));

}




//SHUFFLE IMAGES
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Get a random index
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
}

let mdl = document.getElementById('modal-res')
function test(){
    mdl.classList.remove('modal-fade', 'show-green')
    mdl.classList.remove('modal-fade', 'show-red')
   
    if((Math.floor(Math.random() * 2 + 1)) == 1){
        
        requestAnimationFrame(() => {
            mdl.classList.add('modal-fade', 'show-green')
             });  
    }else{

        requestAnimationFrame(() => {
            mdl.classList.add('modal-fade', 'show-red')
             });  
    }
    
}


    //FETCH MY METHOD
    // fetch(apiUrl).then(res => res.json()).then(data => {
    //}).catch(error => console.error('Error:', error));

    




