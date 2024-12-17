export const routePath = "https://localhost:7226";

// authorization url
const AuthenUrl = `${routePath}/authentication`;
export const LoginUrl = `${AuthenUrl}/login`;
export const RegisterUrl = `${AuthenUrl}/register`;
export const LogoutUrl = `${AuthenUrl}/logout`;

//product
export const getAllProducts = `${routePath}/products`;
export const getProductDetails = `${routePath}/products`;
export const searchProducts = `${routePath}/products/search`;

//categories
export const getAllCategories = `${routePath}/categories`;
export const getCategoryDetails = `${routePath}/categories`;

//cart
const CartUrl = `${routePath}/cart`;
export const getCart = CartUrl;
export const addToCart = `${CartUrl}/addToCart`;
export const updateQuantityCartItem  = `${CartUrl}/update`;
export const removeFromCart = `${CartUrl}/remove`;
export const cleaerCart = `${CartUrl}/clear`;
export const checkout = `${CartUrl}/checkout`;
export const getNumberCartProducts = `${CartUrl}/GetNumberOfCartItem`;

//order
const OrderUrl = `${routePath}/orders`;
export const getOrders = OrderUrl;
export const getOrder = `${routePath}/orders`;
export const deleteOrder = `${routePath}/orders`;
export const getPendingOrders = `${OrderUrl}/pending`;
export const getConfirmOrders = `${OrderUrl}/confirm`;
export const getShippingOrders = `${OrderUrl}/shipping`;
export const getDeliveredOrders = `${OrderUrl}/delivered`;
export const getCanceledOrders = `${OrderUrl}/canceled`;

//user
const UserUrl = `${routePath}/user`;
export const getUserInfo = `${UserUrl}/userInformation`;
export const updateUserInfo = `${UserUrl}/UpdateUserInfo`;
export const changePassword = `${UserUrl}/ChangePassword`;



//admin
const adminUrl = `${routePath}/admin`;
//roles
export const RolesUrl = `${adminUrl}/roles`;
export const createRole = `${RolesUrl}/create`;
export const updateRole = `${RolesUrl}/update`;
export const deleteRole = `${RolesUrl}/delete`;

//products
export const adminProductsUrl = `${adminUrl}/products`;
export const adminProductUrl = `${adminUrl}/products/`;
export const createProduct = `${adminProductsUrl}/create`;
export const updateProductApi = `${adminProductsUrl}/update`;
export const deleteProductApi = `${adminProductsUrl}/delete?id=`;

//categories
export const adminCategoriesUrl = `${adminUrl}/categories`;
export const adminCategoryUrl = `${adminUrl}/categories/`;
export const createCategory = `${adminCategoriesUrl}/create`;
export const updateCategoryApi = `${adminCategoriesUrl}/update`;
export const deleteCategoryApi = `${adminCategoriesUrl}/delete?categoryId=`;

//orders
export const adminOrdersUrl = `${adminUrl}/orders`;
export const adminOrderUrl = `${adminUrl}/orders/`;
export const updateOrder = `${adminOrdersUrl}/update`;

