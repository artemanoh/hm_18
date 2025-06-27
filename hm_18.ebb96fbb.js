document.addEventListener("DOMContentLoaded",()=>{let t=document.querySelector("#students-table tbody"),e=document.getElementById("get-students-btn"),n=document.getElementById("add-student-form"),d=null;function l(){fetch("http://localhost:3000/students").then(t=>t.json()).then(e=>{t.innerHTML="",e.forEach(e=>{let n=document.createElement("tr");n.innerHTML=`
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.age}</td>
            <td>${e.course}</td>
            <td>${e.skills.join(", ")}</td>
            <td>${e.email}</td>
            <td>${e.isEnrolled?"Так":"Ні"}</td>
            <td>
              <button class="edit-btn" data-id="${e.id}">\u{420}\u{435}\u{434}\u{430}\u{433}\u{443}\u{432}\u{430}\u{442}\u{438}</button>
              <button class="delete-btn" data-id="${e.id}">\u{412}\u{438}\u{434}\u{430}\u{43B}\u{438}\u{442}\u{438}</button>
            </td>
          `,t.appendChild(n)})}).catch(()=>{})}e.addEventListener("click",l),t.addEventListener("click",t=>{var e;t.target.classList.contains("delete-btn")&&(e=t.target.dataset.id,fetch(`http://localhost:3000/students/${e}`,{method:"DELETE"}).then(t=>{t.ok&&l()}).catch(()=>{})),t.target.classList.contains("edit-btn")&&function(t){fetch(`http://localhost:3000/students/${t}`).then(t=>t.json()).then(e=>{document.getElementById("name").value=e.name,document.getElementById("age").value=e.age,document.getElementById("course").value=e.course,document.getElementById("skills").value=e.skills.join(", "),document.getElementById("email").value=e.email,document.getElementById("isEnrolled").checked=e.isEnrolled,d=t}).catch(()=>{})}(t.target.dataset.id)}),n.addEventListener("submit",t=>{t.preventDefault();let e={name:document.getElementById("name").value.trim(),age:Number(document.getElementById("age").value),course:document.getElementById("course").value.trim(),skills:document.getElementById("skills").value.split(",").map(t=>t.trim()),email:document.getElementById("email").value.trim(),isEnrolled:document.getElementById("isEnrolled").checked};d?fetch(`http://localhost:3000/students/${d}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(t=>{t.ok&&(d=null,n.reset(),l())}).catch(()=>{}):fetch("http://localhost:3000/students",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(t=>t.json()).then(()=>{n.reset(),l()}).catch(()=>{})})});
//# sourceMappingURL=hm_18.ebb96fbb.js.map
