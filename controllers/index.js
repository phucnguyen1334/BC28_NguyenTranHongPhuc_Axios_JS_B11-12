function getProductApi(){
    var promise = axios({
        url:'http://svcy.myclass.vn/api/Product/GetAll',
        method:'GET'
    });
    promise.then(function(result){
        console.log(result.data);
        renderProduct(result.data);
    });
    promise.catch(function(err){
        console.log(err);
    })
}
window.onload = function(){
    getProductApi();
}
function renderProduct(arrProduct) { 
    var html = '';
    for (var i = 0; i < arrProduct.length; i++) {
        var prod = arrProduct[i];
        html += `
            <tr>
                <td>${prod.id}</td>
                <td>
                    <img src="${prod.img}" width="200" height="100"/>
                </td>
                <td>${prod.name}</td>
                <td>${prod.price}</td>
                <td>${prod.description}</td>
                <td>${prod.type}</td>
                <td>   
                    <button class="btn btn-danger" onclick="deleteProduct('${prod.id}')">
                        <i class="fa fa-trash"></i>
                    </button>
                    <button class="btn btn-primary mr-2" onclick="editProduct('${prod.id}')">
                        <i class="fa fa-edit"></i>
                    </button>
                </td>
            </tr>
        `;
    }
    document.querySelector('tbody').innerHTML = html;
}
//Create
document.querySelector('#btnCreate').onclick = function(){
    var prod = new Product();
    prod.id = document.querySelector('#ID').value;
    prod.name = document.querySelector('#name').value;
    prod.price = document.querySelector('#price').value;
    prod.img = document.querySelector('#image-link').value;
    prod.description = document.querySelector('#desc').value;
    prod.type = document.querySelector('#product-type').value;
    console.log('prod', prod);
    var promise = axios({
        url:'http://svcy.myclass.vn/api/Product/CreateProduct',
        method:'POST',
        data: prod
    })
    promise.then(function(result){
        console.log('result', result);
        getProductApi();
    });
    promise.catch(function(error){
        console.log('error', error.response.data);
    });
}
//Delete
function deleteProduct(idClick){
    console.log(idClick);
    var promise = axios({
        url:'http://svcy.myclass.vn/api/Product/DeleteProduct/' + idClick,
        method:'DELETE'
    }); 
    promise.then(function(result){
        console.log('result',result.data);
        getProductApi();
    });
    promise.catch(function(error){
        console.log(error);
    });
}
//Edit
function editProduct(idClick){
    var promise = axios({
        url:'http://svcy.myclass.vn/api/Product/GetById/' + idClick,
        method:'GET'
    });
    promise.then(function(result){
        var prodInfo = [];
        proInfo = result.data;
        document.querySelector('#ID').value = prodInfo.id;
        document.querySelector('#name').value = prodInfo.name;
        document.querySelector('#price').value = prodInfo.price;
        document.querySelector('#image-link').value = prodInfo.img;
        document.querySelector('#product-type').value = prodInfo.type;
        document.querySelector('#desc').value = prodInfo.desc;
    });
    promise.catch(function(error){
        console.log(error);
    })
}
//Update
document.querySelector('#btnUpdate').onclick = function(){
    var prod = new Product();
    prod.id = document.querySelector('#ID').value;
    prod.name = document.querySelector('#name').value;
    prod.price = document.querySelector('#price').value;
    prod.img = document.querySelector('#image-link').value;
    prod.description = document.querySelector('#desc').value;
    prod.type = document.querySelector('#product-type').value;
    console.log('prod', prod);
    var promise = axios({
        url:'http://svcy.myclass.vn/api/Product/UpdateProduct/' + prod.id,
        method:'PUT',
        data: prod
    });
    promise.then(function(result){
        console.log(result.data);
        getProductApi();
    });
    promise.catch(function(error){
        console.log(error);
    })
}

//Search
document.querySelector('.btnSearch').onclick = function(){
    var name = document.querySelector('#h-search').value;
    var promise = axios({
        url:'http://svcy.myclass.vn/api/Product/SearchByName?name=' + name,
        method:'GET'
    });
    promise.then(function(result){
        var prodInfo = result.data;
        for (var i = 0; i < prodInfo.length; i++) {
            var prod = prodInfo[i];
            var html = '';
            html += `
                <tr>
                    <td>${prod.id}</td>
                    <td>
                        <img src="${prod.img}" width="200" height="100"/>
                    </td>
                    <td>${prod.name}</td>
                    <td>${prod.price}</td>
                    <td>${prod.description}</td>
                    <td>${prod.type}</td>
                </tr>
            `;
        }
        document.querySelector('#tblSearch').innerHTML = html;
    });
    promise.catch(function(error){
        console.log(error);
    })
}
