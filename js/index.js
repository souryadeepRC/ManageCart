var cartItemList = []
const renderCartItemCount = () => {
    if (cartItemList.length > 0) {
        $('#CartItemCount').show()
        $('#CartItemCount').text(cartItemList.length)
    } else {
        $('#CartItemCount').hide()
    }
}

const printReceipt = () =>  window.print() 
const onItemNameChange = () => $('#ItemName').val().length > 0
const validateEmptyCartBtn = () => $('#EmptyCartBtn').prop('disabled', !(cartItemList.length > 0))
const validatePrintReceiptBtn = () => $('#PrintReceiptBtn').prop('disabled', !(cartItemList.length > 0))
const validateAddToCartBtn = (itemName,itemQuantity) =>  $('#AddToCart').prop('disabled', !isBothInputDataPresent(itemName, itemQuantity))
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
 
/*  
    1.  Adding Item To cartItemList
    If Added Then
        2.  Call clearInputField := clear input field, disable AddToCart & Clear Btn
        3.  Call validateEmptyCartBtn := If no item in cartItemList => Disable EmptyCart Btn
        4.  Call renderCartItemCount := update count of cartItemList
 */
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
        validateEmptyCartBtn()
        renderCartItemCount()
        return true
    } else {
        return false
    }
}
/* 
    1.  Clearing all data present in input file
    2.  Disabling AddToCart & Clear Button 
*/
const clearInputField = () => {
    $('#ItemName').val('')
    $('#ItemDescription').val('')
    $('#ItemQuantity').val('')
    $('#AddToCart').prop('disabled', true)
    $('#ClearBtn').prop('disabled', true)
}
/*
    1.  Removing Indexed Item from cartItemList
    2.  Call showCart := Load Total Cart
    3.  Call renderCartItemCount := update count of cartItemList
    4.  Call validateEmptyCartBtn := If no item in cartItemList => Disable EmptyCart Btn
*/
const deleteItem = (index) => { 
    cartItemList.splice(index, 1) 
    showCart()
    renderCartItemCount()
    validateEmptyCartBtn()
}
/*
    1.  Call clearInputField := clear input field, disable AddToCart & Clear Btn
    2.  Show -> CartDetail  ,   Hide -> Content
    3.  If cartItemList has item THEN
        4.  Load Item in Table & Hide EmptyCartHeading
    ELSE
        5.  Load Blank Table & show EmptyCartHeading
    6.  Call validatePrintReceiptBtn := enable PrintReceipt Btn if cartItemList not empty
    7.  Call renderCartItemCount := update count of cartItemList
*/
const showCart = () => {
    clearInputField() 
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
        $('#EmptyCartHeading').hide()
        $('#CartItemSection').html(content) 
        $('#CartCount').text(`${cartItemList.length} ${ cartItemList.length >1? 'items' : 'item'}`)
    } else {
        $('#CartItemSection').html(``)
        $('#EmptyCartHeading').show() 
    } 
    validatePrintReceiptBtn()
    renderCartItemCount()
}
const emptyCart = () => {
    cartItemList = []
    $('#EmptyCartBtn').prop('disabled', !(cartItemList.length > 0))
    renderCartItemCount()
    showCart()
}
const addMoreItem = () => {
    $('#CartDetail').hide()
    $('#Content').show()
}

$(document).ready(() => {
  
    validateEmptyCartBtn() 
    $('#CartDetail').hide()
    renderCartItemCount()
    $('#AddToCart').on('click', () => {
        if (addItemToCart()) { 
            $('#SuccessMsg').show().delay(1000).fadeOut()
        } 
    })
})