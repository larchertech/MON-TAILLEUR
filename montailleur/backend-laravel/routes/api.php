<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\{
    AuthController,
    UserController,
    OrderController,
    ProductController,
    PaymentController,
    ChatController,
    MeasurementController,
    PortfolioController,
    DisputeController,
    DashboardController
};

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/refresh', [AuthController::class, 'refresh']);
Route::post('/auth/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);

// Protected routes
Route::middleware('jwt.auth')->group(function () {
    
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);
    
    // Users
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::post('/users/{id}/avatar', [UserController::class, 'uploadAvatar']);
    
    // Measurements
    Route::get('/measurements', [MeasurementController::class, 'index']);
    Route::post('/measurements', [MeasurementController::class, 'store']);
    Route::post('/measurements/ai', [MeasurementController::class, 'aiMeasurement']);
    Route::put('/measurements/{id}', [MeasurementController::class, 'update']);
    
    // Portfolio
    Route::get('/portfolio', [PortfolioController::class, 'index']);
    Route::get('/portfolio/{id}', [PortfolioController::class, 'show']);
    Route::post('/portfolio', [PortfolioController::class, 'store']);
    Route::put('/portfolio/{id}', [PortfolioController::class, 'update']);
    Route::delete('/portfolio/{id}', [PortfolioController::class, 'destroy']);
    Route::post('/portfolio/{id}/like', [PortfolioController::class, 'like']);
    
    // Products (Marketplace)
    Route::get('/products', [ProductController::class, 'index']);
    Route::get('/products/{id}', [ProductController::class, 'show']);
    Route::post('/products', [ProductController::class, 'store'])->middleware('role:tailleur,admin');
    Route::put('/products/{id}', [ProductController::class, 'update'])->middleware('role:tailleur,admin');
    Route::delete('/products/{id}', [ProductController::class, 'destroy'])->middleware('role:tailleur,admin');
    
    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::post('/orders/{id}/negotiate', [OrderController::class, 'negotiate']);
    Route::post('/orders/{id}/accept', [OrderController::class, 'acceptNegotiation']);
    Route::post('/orders/{id}/reject', [OrderController::class, 'rejectNegotiation']);
    Route::post('/orders/{id}/cancel', [OrderController::class, 'cancel']);
    
    // Payments
    Route::post('/payments/initialize', [PaymentController::class, 'initialize']);
    Route::get('/payments/{id}/status', [PaymentController::class, 'status']);
    Route::post('/payments/{id}/refund', [PaymentController::class, 'refund'])->middleware('role:admin');
    
    // Chat
    Route::get('/chats', [ChatController::class, 'index']);
    Route::post('/chats', [ChatController::class, 'store']);
    Route::get('/chats/{id}', [ChatController::class, 'show']);
    Route::get('/chats/{id}/messages', [ChatController::class, 'messages']);
    Route::post('/chats/{id}/messages', [ChatController::class, 'sendMessage']);
    Route::post('/chats/{id}/read', [ChatController::class, 'markAsRead']);
    
    // Disputes
    Route::get('/disputes', [DisputeController::class, 'index']);
    Route::get('/disputes/{id}', [DisputeController::class, 'show']);
    Route::post('/disputes', [DisputeController::class, 'store']);
    Route::put('/disputes/{id}/resolve', [DisputeController::class, 'resolve'])->middleware('role:admin');
    
    // Dashboard (Admin only)
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
        Route::get('/dashboard/revenue', [DashboardController::class, 'revenue']);
        Route::get('/dashboard/orders', [DashboardController::class, 'orders']);
        Route::get('/dashboard/users', [DashboardController::class, 'users']);
        Route::get('/dashboard/analytics', [DashboardController::class, 'analytics']);
    });
});

// Webhooks (public but secured by signature)
Route::post('/webhooks/cinetpay', [PaymentController::class, 'cinetpayWebhook']);
Route::post('/webhooks/stripe', [PaymentController::class, 'stripeWebhook']);
