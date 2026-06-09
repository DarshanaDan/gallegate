const packageList=document.getElementById("packageList");
const packageFilters=document.getElementById("packageFilters");

function createFilters(){
  const categories=["all",...new Set(packages.map(pkg=>pkg.category))];
  packageFilters.innerHTML=categories.map(category=>{
    const label=category==="all"?"All":category.charAt(0).toUpperCase()+category.slice(1);
    return `<button onclick="filterPackages('${category}')">${label}</button>`;
  }).join("");
}

function displayPackages(packageArray){
  packageList.innerHTML="";
  packageArray.forEach(pkg=>{
    const highlights=pkg.highlights.map(item=>`<li>${item}</li>`).join("");
    packageList.innerHTML+=`
      <article class="package-card">
        <img src="${pkg.image}" alt="${pkg.name}" onerror="this.src='assets/placeholder.svg'">
        <div class="package-body">
          <span class="category-label">${pkg.category}</span>
          <h3>${pkg.name}</h3>
          <p>${pkg.description}</p>
          <div class="package-meta"><span>${pkg.duration}</span><span>${pkg.price}</span></div>
          <p><strong>Time:</strong> ${pkg.time}</p>
          <ul>${highlights}</ul>
          <button onclick="openModal(${packages.indexOf(pkg)})">View Details</button>
          <button class="secondary-btn" onclick="selectPackage('${pkg.name}')">Choose Package</button>
        </div>
      </article>`;
  });
}

function filterPackages(category){
  displayPackages(category==="all"?packages:packages.filter(pkg=>pkg.category===category));
}

function openModal(index){
  const pkg=packages[index];
  const itineraryHTML=pkg.itinerary.length
    ? pkg.itinerary.map(item=>`<div class="timeline-item"><strong>${item.time} - ${item.place}</strong><p>${item.description}</p></div>`).join("")
    : "<p>Detailed itinerary can be customized based on your requirement.</p>";
  document.getElementById("modalBody").innerHTML=`
    <img class="modal-image" src="${pkg.image}" onerror="this.src='assets/placeholder.svg'" alt="${pkg.name}">
    <h2>${pkg.name}</h2><p>${pkg.description}</p>
    <p><strong>Duration:</strong> ${pkg.duration}</p>
    <p><strong>Time:</strong> ${pkg.time}</p>
    <p><strong>Price:</strong> ${pkg.price}</p>
    <h3>Places to Visit / Itinerary</h3>${itineraryHTML}
    <h3>Package Includes</h3><ul>${pkg.includes.map(i=>`<li>${i}</li>`).join("")}</ul>
    <h3>Optional Add-ons</h3><ul>${pkg.optionalAddons.map(i=>`<li>${i}</li>`).join("")}</ul>
    <button onclick="selectPackage('${pkg.name}'); closeModal();" class="modal-select-btn">Choose This Package</button>`;
  document.getElementById("packageModal").style.display="block";
}

function closeModal(){document.getElementById("packageModal").style.display="none";}
function selectPackage(packageName){document.getElementById("selectedPackage").value=packageName;document.getElementById("inquiry").scrollIntoView({behavior:"smooth"});}

document.getElementById("inquiryForm").addEventListener("submit",function(event){
  event.preventDefault();
  const name=document.getElementById("customerName").value;
  const email=document.getElementById("customerEmail").value;
  const phone=document.getElementById("customerPhone").value;
  const packageName=document.getElementById("selectedPackage").value;
  const message=document.getElementById("customerMessage").value;
  const whatsappMessage=`Hello Galle Gate.lk,%0A%0AI would like to inquire about a tour package.%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0ASelected Package: ${packageName}%0AMessage: ${message}`;
  window.open(`https://wa.me/${companyWhatsappNumber}?text=${whatsappMessage}`,"_blank");
});

window.onclick=function(event){const modal=document.getElementById("packageModal");if(event.target===modal)closeModal();};
createFilters();displayPackages(packages);