### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PATCH /api/auth/update-me` - Update user profile
- `PATCH /api/auth/update-password` - Update password
- `POST /api/auth/forgot-password` - Request password reset
- `PATCH /api/auth/reset-password` - Reset password

### Product Endpoints

- `GET /api/products` - Get all products (with filtering, sorting, pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Seller/Admin only)
- `PATCH /api/products/:id` - Update product (Owner/Admin only)
- `DELETE /api/products/:id` - Delete product (Owner/Admin only)
- `GET /api/products/my/products` - Get seller's products

### Cart Endpoints

- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PATCH /api/cart/:productId` - Update cart item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Order Endpoints

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PATCH /api/orders/:id/cancel` - Cancel order
- `PATCH /api/orders/:id/status` - Update order status (Seller/Admin)

### Transaction Endpoints

- `POST /api/transactions/initialize` - Initialize payment
- `GET /api/transactions/verify/:reference` - Verify payment
- `GET /api/transactions` - Get user's transactions
- `GET /api/transactions/:id` - Get single transaction

### Webhook Endpoints

- `POST /api/webhooks/paystack` - Paystack webhook handler