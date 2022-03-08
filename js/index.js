var cartItemList = []
const renderCartItemCount = () => {
    if (cartItemList.length > 0) {
        $('#CartItemCount').css('display', 'block')
        $('#CartItemCount').text(cartItemList.length)
    } else {

        $('#CartItemCount').css('display', 'none')
    }
}
const updateCartItem = (item) => {
    cartItemList.push({
        'Name': item.Name,
        'Description': item.Description,
        'Quantity': item.Quantity,
        'Type': item.Type
    })
}
const isBothInputDataPresent = (itemName, itemQuantity) => (itemName.length > 0 && itemQuantity.length > 0) ? true : false
const isAnyInputDataPresent = (itemName, itemQuantity, itemDescription) => (itemName.length > 0 ||
    itemQuantity.length > 0 || itemDescription.length > 0) ? true : false

const onItemDetailsChange = () => {
    let itemName = $('#ItemName').val()
    let itemQuantity = $('#ItemQuantity').val()
    let itemDescription = $('#ItemDescription').val()

    $('#AddToCart').prop('disabled', !isBothInputDataPresent(itemName, itemQuantity))

    $('#ClearBtn').prop('disabled', !isAnyInputDataPresent(itemName, itemQuantity, itemDescription))

}

const onItemNameChange = () => $('#ItemName').val().length > 0

const addItemToCart = () => {
    let itemName = $('#ItemName').val()
    let itemDescription = $('#ItemDescription').val()
    let itemQuantity = $('#ItemQuantity').val()
    let itemType = $('#ItemType').val()
    if (isBothInputDataPresent(itemName, itemQuantity)) {
        cartItemList.push({
            'Name': itemName,
            'Description': itemDescription,
            'Quantity': itemQuantity,
            'Type': itemType
        })
        clearInputField()
        $('#SuccessMsg').show().delay(1000).fadeOut()
        $('#AddToCart').prop('disabled', true)
        $('#EmptyCartBtn').prop('disabled', !(cartItemList.length > 0))
        return true
    } else {
        return false
    }
}
const clearInputField = () => {
    $('#ItemName').val('')
    $('#ItemDescription').val('')
    $('#ItemQuantity').val('')
    $('#AddToCart').prop('disabled', true)
    $('#ClearBtn').prop('disabled', true)
}
const deleteItem = (index) => {
    console.log(`deleteItem ${index}`);
    console.log(cartItemList[index]);
    cartItemList.splice(index, 1)
    console.log(cartItemList);
    ShowCart()
}

const ShowCart = () => {
    clearInputField()
    console.log(cartItemList);
    $('#CartDetail').show()
    $('#Content').hide()
    if (cartItemList.length > 0) {
        let content = ''
        cartItemList.forEach((cartItem, index) => {
            content += `
           <tr><td><div class="cart-data my-2 mx-0 p-2">
               <div class="cart-item col-12 d-flex justify-content-around align-items-center m-auto w-100">
                   <p class="print col-2">${index + 1}</p>
                   <div class="col-8">
                       <h6 class="m-0">${cartItem.Name}</h6>
                       <p class="m-0">${cartItem.Description != '' ? cartItem.Description : '&nbsp;'}</p>
                   </div>
                   <h6 class="col-3 text-center m-0">${cartItem.Quantity} ${cartItem.Type}</h6>
               </div>
               <div class="d-flex justify-content-end">
                    <p class="w-15 delete-item not-print m-0 text-center text-white fa fa-trash-o" 
                        id="ItemDelete${index}" onclick="deleteItem(${index})"> </p>
                </div>
               </div></td>
           </tr>
           `
        });
        $('#CartItemSection').html(content)
        $('#CartCount').text(cartItemList.length)
    } else {
        $('#CartItemSection').html(``)
        $('#EmptyCart').show()
    }

}
const emptyCart = () => {
    cartItemList = []
    $('#EmptyCartBtn').prop('disabled', !(cartItemList.length > 0))
    renderCartItemCount()
}
const addMoreItem = () => {
    $('#CartDetail').hide()
    $('#Content').show()
}

const printReceipt = () => {
    window.print()
}
$(document).ready(() => {

    cartItemList = loadCartData()
    populateInputField()

    $('#EmptyCartBtn').prop('disabled', !(cartItemList.length > 0))
    console.log('Manage Cart Loaded ...');
    $('#CartDetail').hide()
    renderCartItemCount()
    $('#AddToCart').on('click', () => {
        if (addItemToCart()) {
            console.log('Item Added to Cart');
            renderCartItemCount()
        } else {
            console.log('Item Not Added');
        }
    })
})