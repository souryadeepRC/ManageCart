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

$(document).ready(() => {
    console.log('Manage Cart Loaded ...');
    renderCartItemCount()
    $('#AddToCart').on('click', () => {
        cartItemList.push({
            'Name': 'Cold Drinks',
            'Description': 'Pepsi can',
            'Quantity': '2',
            'Type': 'Pc.'
        })
        renderCartItemCount()
    })
})