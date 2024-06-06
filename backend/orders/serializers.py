from rest_framework import serializers
from .models import CartItem, Order, OrderItem, Payment
from products.models import Product
from products.serializers import ProductSerializer

# total_amount = serializers.SerializerMethodField("get_total_amount")


class CartItemSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())
    product_details = serializers.SerializerMethodField("get_product_details")
    amount = serializers.SerializerMethodField("get_amount")
    final_amount = serializers.SerializerMethodField("get_final_amount")

    class Meta:
        model = CartItem
        fields = "__all__"
        read_only_fields = ["total_amount", "amount"]

    def get_product_details(self, obj):
        if obj:
            serializers = ProductSerializer(obj.product)
            return serializers.data

    def get_amount(self, obj):
        if obj:
            final_amount = obj.product.price * obj.quantity
            if obj.product.discount != 0:
                final_amount = (final_amount / obj.product.discount) * 100
            return final_amount

    def get_final_amount(self, obj):
        if obj:
            amount = obj.product.price * obj.quantity
            return amount

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


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = "__all__"


class OrderPaymentPayloadSerializer(serializers.Serializer):
    payment_method = serializers.ChoiceField(choices=Payment.PaymentMethods.choices)


class OrderHistorySerializer(serializers.Serializer):
    order = OrderSerializer()
    order_items = OrderItemSerializer(many=True)
    payment = PaymentSerializer()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        order_items_data = representation.pop("order_items")
        representation["order_items"] = order_items_data
        return representation
