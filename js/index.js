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
const ShowCart = () => {
     let content = ''
     cartItemList.forEach((cartItem,index) => {
        content += `
        <tr><td><div class="cart-data">
            <div class="cart-item col-12 d-flex justify-content-around">
                <p class="print col-2">${index+1}</p>
                <div class="col-8">
                    <h6>${cartItem.Name}</h6>
                    <p>${cartItem.Description!='' ? cartItem.Description : '&nbsp;'}</p>
                </div>
                <h6 class="col-3 text-center">${cartItem.Quantity} ${cartItem.Type}</h6>
            </div>
            <p class="delete-item not-print m-0 text-end" id="ItemDelete${index}"><i class="fa fa-trash-o"></i></p>
            </div></td>
        </tr>
        `
    });
    /* cartItemList.forEach((cartItem,index) => {
        content += `
        <div class="bg-info cart-data m-auto p-3 my-1 w-75">
            <div class="cart-item col-12">
                <p class="col-2">${index+1}</p>
                <div class="col-8">
                    <h6>${cartItem.Name}</h6>
                    <p>${cartItem.Description}</p>
                </div>
                <h6 class="col-2">${cartItem.Quantity} ${cartItem.Type}</h6>
            </div>
            <p class="delete-item not-print m-0 pt-4 text-end" id="ItemDelete${index}">Delete</p>
        </div>
        `
    }); */
     $('#CartItemSection').html(content)
     $('#CartCount').text(cartItemList.length)
    $('#CartDetail').show()
    $('#Content').hide()
}
const printReceipt = () => { 
    window.print()
}
$(document).ready(() => {

    cartItemList = loadCartData()

    console.log('Manage Cart Loaded ...');
    $('#CartDetail').hide()
    renderCartItemCount()
    $('#AddToCart').on('click', () => {
        if (addItemToCart()) {
            console.log('Item Added to Cart');
            renderCartItemCount()
        } else {
            console.log('ITem Not Added');
        }
    })
})