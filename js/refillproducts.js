fetch('../json/products.json')
  .then(response => response.json())
  .then(data => {
    const allListGH = document.getElementById('allGH-list');
    const allListDM = document.getElementById('allDM-list');
    const injectablesListGH = document.getElementById('injectablesGH-list');
    const injectablesListDM = document.getElementById('injectablesDM-list');
    const oralsListDM = document.getElementById('oralDM-list');
    const pharmacyList = document.getElementById('pharmacy-list');
    const hghListDM = document.getElementById('hghDM-list');
    const hghListGH = document.getElementById('hghGH-list');
    const oralsListGH = document.getElementById('oralGH-list');
    function displayProductsInHTML(productsArray, listHTML, type) {
      listHTML.innerHTML = '';
      productsArray.forEach(product => {
        const listItem = document.createElement('li');
        listItem.className = 'image-item';
        const anchor = document.createElement('a');
        anchor.href = `../html/products.html?product=${product.id}&type=${type}`;
        const image = document.createElement('img');
        image.src = product.image;
        image.alt = product.title;
        const originalImageSrc = product.image;
        image.addEventListener("mouseover", () => {
          image.animate(
            { opacity: [1, 0], easing: 'ease-in-out' },
            { duration: 300, fill: 'forwards' }
          ).onfinish = () => {
            image.src = product.hoverImage;
            image.animate(
              { opacity: [0, 1], easing: 'ease-in-out' },
              { duration: 300, fill: 'forwards' }
            );
          };
        });
        image.addEventListener("mouseout", () => {
          image.animate(
            { opacity: [1, 0], easing: 'ease-in-out' },
            { duration: 300, fill: 'forwards' }
          ).onfinish = () => {
            image.src = originalImageSrc;
            image.animate(
              { opacity: [0, 1], easing: 'ease-in-out' },
              { duration: 300, fill: 'forwards' }
            );
          };
        });
        anchor.appendChild(image);
        listItem.appendChild(anchor);
        const titleParagraph = document.createElement('p');
        titleParagraph.textContent = product.title;
        const priceParagraph = document.createElement('p');
        priceParagraph.textContent = `Price: ${product.price}€`;
        listItem.appendChild(titleParagraph);
        listItem.appendChild(priceParagraph);
        listHTML.appendChild(listItem);
      });
    }
    displayProductsInHTML(data.injectablesGH, injectablesListGH, 'injectablesGH');
    displayProductsInHTML(data.oralGH, oralsListGH, 'oralGH');
    displayProductsInHTML(data.hghGH, hghListGH, 'hghGH');
    displayProductsInHTML(data.injectablesDM, injectablesListDM, 'injectablesDM');
    displayProductsInHTML(data.oralDM, oralsListDM, 'oralDM');
    displayProductsInHTML(data.hghDM, hghListDM, 'hghDM');
    displayProductsInHTML(data.pharmacy, pharmacyList, 'pharmacy');
  })
  .catch(error => console.error('Error loading JSON file:', error));
