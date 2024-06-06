from rest_framework import serializers
from .models import CartItem
from products.models import Product
from products.serializers import ProductSerializer


class CartItemSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    product_details = serializers.SerializerMethodField("get_product_details")

    class Meta:
        model = CartItem
        fields = "__all__"
        read_only_fields = ["available_qty"]

    def get_product_details(self, obj):
        if obj:
            serializers = ProductSerializer(obj.product)
            return serializers.data

    def validate(self, attrs):
        quantity = attrs.get("quantity", 1)
        product = attrs.get("product", None)

        if self.instance and not product:
            product = self.instance.product

        if quantity > product.quantity:
            raise serializers.ValidationError(
                f"Product is out of stock or available quantity is less than your requirement."
            )

        return attrs

    def update(self, instance, validated_data):
        # Update only the 'quantity' field
        instance.quantity = validated_data.get("quantity", instance.quantity)
        instance.save()
        return instance
