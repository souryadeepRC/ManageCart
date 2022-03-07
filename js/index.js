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
const isValidDataPresent = (itemName,itemQuantity,itemType) => {
     
    return true
}
const addItemToCart = () => {
    let itemName  = $('#ItemName').val()
    let itemDescription = $('#ItemDescription').val()
    let itemQuantity = $('#ItemQuantity').val()
    let itemType = $('#ItemType').val()
    if(isValidDataPresent(itemName,itemQuantity,itemType)){ 
        cartItemList.push({
            'Name': itemName,
            'Description': itemDescription,
            'Quantity': itemQuantity,
            'Type': itemType
        })
        return true
    }else{
        return false
    }
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