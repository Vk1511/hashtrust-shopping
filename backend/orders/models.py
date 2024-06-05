from django.db import models
from products.models import Product
from django.contrib.auth import get_user_model

# To get AUTH_USER_MODEL from settings.py file
User = get_user_model()


class Order(models.Model):
    """
    Represents an order placed by a user.

    Fields:
        user: The user who placed the order.
        created_at: The date and time when the order was created.
        updated_at: The date and time when the order was last updated.
        is_completed: Indicates whether the order is completed.
    """

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return f"Order {self.pk} by {self.user.username}"


class OrderItem(models.Model):
    """
    Represents an item within an order.

    Fields:
        order: The order to which the item belongs.
        product: The product associated with the order item.
        quantity: The quantity of the product in the order.
        price: The price of the product at the time of the order.
    """

    order = models.ForeignKey(
        Order, on_delete=models.CASCADE, related_name="order_items"
    )
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in order {self.order.pk}"


class Payment(models.Model):
    """
    Represents a payment made for an order.

    Fields:
        order: The order for which the payment is made.
        amount: The amount paid.
        payment_method: The method used for payment (e.g., credit card, PayPal).
        payment_status: The status of the payment (e.g., pending, completed).
        payment_date: The date and time when the payment was made.
    """

    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, related_name="payment"
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=100)
    payment_status = models.CharField(max_length=100)
    payment_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment of {self.amount} for order {self.order.pk}"
