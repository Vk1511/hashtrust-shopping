from django.db import models
from django.contrib.auth import get_user_model

# To get AUTH_USER_MODEL from settings.py file
User = get_user_model()


class ProductCategory(models.Model):
    """
    Represents a category of products.

    Fields:
        name: The name of the product category.
        description: Optional description of the product category.
    """

    name = models.CharField(max_length=100, unique=True, db_index=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    """
    Represents a product available for sale.

    Fields:
        name: The name of the product.
        description: Optional description of the product.
        price: The price of the product.
        category: The category to which the product belongs.
        quantity: The quantity of the product available.
        image: Optional image of the product.
    """

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(
        ProductCategory, on_delete=models.CASCADE, related_name="products"
    )
    quantity = models.IntegerField(default=0)
    image = models.ImageField(upload_to="product_images/", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ("name", "category")
