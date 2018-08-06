new Vue({
    el: '#app',
    data(){
        return{
            isShowingCart: false,
            cart:{
                items:[]
            },
            products:[
                {
                    id: 1,
                    name: 'Macbook Pro (15 inch)',
                    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officia cumque nihil reiciendis accusamus magnam nobis iusto molestiae ad accusantium cum minima odio aspernatur nostrum, sed rerum deleniti quod necessitatibus.',
                    price: 3000,
                    inStock: 50
                },
                {
                    id: 2,
                    name: 'Surfacebook',
                    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officia cumque nihil reiciendis accusamus magnam nobis iusto molestiae ad accusantium cum minima odio aspernatur nostrum, sed rerum deleniti quod necessitatibus.',
                    price: 1800,
                    inStock: 20
                },
                {
                    id: 3,
                    name: 'Acer Aspire',
                    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officia cumque nihil reiciendis accusamus magnam nobis iusto molestiae ad accusantium cum minima odio aspernatur nostrum, sed rerum deleniti quod necessitatibus.',
                    price: 1200,
                    inStock: 0
                },
                {
                    id: 4,
                    name: 'iPhone X',
                    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officia cumque nihil reiciendis accusamus magnam nobis iusto molestiae ad accusantium cum minima odio aspernatur nostrum, sed rerum deleniti quod necessitatibus.',
                    price: 1500,
                    inStock: 100
                },
                {
                    id: 5,
                    name: 'Google Pixel',
                    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officia cumque nihil reiciendis accusamus magnam nobis iusto molestiae ad accusantium cum minima odio aspernatur nostrum, sed rerum deleniti quod necessitatibus.',
                    price: 1450,
                    inStock: 60
                },
                {
                    id: 6,
                    name: 'Macbook Air (15 inch)',
                    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officia cumque nihil reiciendis accusamus magnam nobis iusto molestiae ad accusantium cum minima odio aspernatur nostrum, sed rerum deleniti quod necessitatibus.',
                    price: 3000,
                    inStock: 50
                },
                {
                    id: 7,
                    name: 'Lenovo Yoga',
                    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officia cumque nihil reiciendis accusamus magnam nobis iusto molestiae ad accusantium cum minima odio aspernatur nostrum, sed rerum deleniti quod necessitatibus.',
                    price: 1000,
                    inStock: 35
                },
                {
                    id: 8,
                    name: 'Redmi mibook',
                    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officia cumque nihil reiciendis accusamus magnam nobis iusto molestiae ad accusantium cum minima odio aspernatur nostrum, sed rerum deleniti quod necessitatibus.',
                    price: 930,
                    inStock: 12
                },
                {
                    id: 9,
                    name: 'Chromebook',
                    description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officia cumque nihil reiciendis accusamus magnam nobis iusto molestiae ad accusantium cum minima odio aspernatur nostrum, sed rerum deleniti quod necessitatibus.',
                    price: 670,
                    inStock: 8
                }
            ]
        }
    },
    filters:{
        // Custom Pipes Creation
        currency(value){
            var formatter = Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0
            })

            return formatter.format(value)
        }
    },
    methods:{
        //to add product to cart
        addProductsToCart(product){
            var cartItem = this.getCartItem(product);
            
            if(cartItem != null){
                cartItem.quantity++
            } else {
                this.cart.items.push({
                    product: product,
                    quantity: 1
                })
            }
            product.inStock--
        },
        // Get all the cart items to increase the quantity
        getCartItem(product){
            for(var i = 0; i< this.cart.items.length; i++){
                if(this.cart.items[i].product.id === product.id){
                    return this.cart.items[i]
                }
            }
            return null;
        },
        // To increase the items Quantity in the cart
        increaseQty(cartItem){
            cartItem.product.inStock--
            cartItem.quantity++
        },
        // To remove the items from the Cart
        removeItemsFromCart(cartItem){
            var index = this.cart.items.indexOf(cartItem)
            if(index !== -1){
                this.cart.items.splice(index, 1)
            }
        },
        // To decrease the items frmo the cart
        decreaseQty(cartItem){
            cartItem.quantity--
            cartItem.product.inStock++

            if(cartItem.quantity == 0){
                this.removeItemsFromCart(cartItem)
            }
        },
        checkOut(){
            if(confirm('Are you sure that you want to purchase these products?')){
                this.cart.items.forEach((item) => {
                    item.product.inStock += item.quantity
                })
                this.cart.items = []
            }
        }
    },
    computed:{
        cartTotal(){
            var total = 0;
            this.cart.items.forEach((item) => {
                total += item.quantity * item.product.price
            })
            return total;
        },
        taxedAmt(){
            return (this.cartTotal * 0.1);
        }
    }
})