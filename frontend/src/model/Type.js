export const Product = {
    productId: null,         // Assuming a null placeholder value
    categoryId: null,        // Placeholder value for category ID
    name: null,             // Empty null as placeholder
    description: null,      // Empty null for description
    price: null,           // Default price
    picture: null           // Default picture URL as an empty null
};

export const Category = {
    categoryId: null,
    name: null,
    description: null,
}

export const CartItem = {
    cartItemId: null,
    productId: null,
    productName: null,
    quantity: null,
    price: null,
    picture: null,
}

export const OrderItem = {
    orderId: null,   // Placeholder for null
    userId: null,    // Placeholder for null
    quantity: null,  // Placeholder for null
    price: null,      // Placeholder for null
    picture: null,
};

export const Order = {
    orderId: null,            // Placeholder for null
    userId: null,             // Placeholder for null
    orderDate: new Date(),    // Default to the current date
    totalAmount: null,        // Placeholder for null
    status: null,             // Placeholder for status
    items: [OrderItem]        // Array with one placeholder `OrderItem`
};

export const Cart = {
    cartItemId: null,
    productId: null,    
    productName: null,
    quantity: null,  
    price: null      
};

export const Role = {
    id: 0,
    name: "",    
};

export const UserInfo = {
    userName: null,
    firstName: null,    
    lastName: null,
    email: null,
    shipName: null,  
    shipAddress: null,
    phonenull: null,
    roles: [Role]
};












