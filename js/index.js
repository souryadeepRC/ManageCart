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
const isValidDataPresent = (itemName,itemQuantity) =>  (itemName.length >0 && itemQuantity.length>0) ?  true : false 

const onItemDetailsChange = () => {
    console.log($('#ItemName').val().length,$('#ItemQuantity').val().length);
     if(isValidDataPresent($('#ItemName').val(),$('#ItemQuantity').val())){
        $('#AddToCart').prop('disabled',false)
     }else{ 
        $('#AddToCart').prop('disabled',true)
     }
}

const onItemNameChange = () => $('#ItemName').val().length>0

const addItemToCart = () => {
    let itemName  = $('#ItemName').val()
    let itemDescription = $('#ItemDescription').val()
    let itemQuantity = $('#ItemQuantity').val()
    let itemType = $('#ItemType').val()
    if(isValidDataPresent(itemName,itemQuantity)){ 
        cartItemList.push({
            'Name': itemName,
            'Description': itemDescription,
            'Quantity': itemQuantity,
            'Type': itemType
        })
        clearInputField()
        $('#SuccessMsg').show().delay(1000).fadeOut()
        $('#AddToCart').prop('disabled',true)
        return true
    }else{
        return false
    }
}
const clearInputField = () => {
    $('#ItemName').val('')
    $('#ItemDescription').val('')
    $('#ItemQuantity').val('') 
}

$(document).ready(() => {
    console.log('Manage Cart Loaded ...');
    renderCartItemCount() 
    $('#AddToCart').on('click', () => {
        if(addItemToCart()){
            console.log('Item Added to Cart');
            renderCartItemCount()
        }else{
            console.log('ITem Not Added');
        }
    })
})