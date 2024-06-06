from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import APIException, NotFound
from django.db import transaction
from .serializers import (
    CartItemSerializer,
    OrderItemSerializer,
    OrderPaymentPayloadSerializer,
    OrderHistorySerializer,
    OrderSerializer,
)
from .models import CartItem, Order, Payment
from .utils import calculate_payment_summary, is_product_in_stock
from .db_ops import create_order_obj, add_order_item, complete_payment


class UserCartViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()

    def get_queryset(self):
        queryset = CartItem.objects.filter(user=self.request.user.id)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)

        # Calculate Payment Summary
        payment_summary = calculate_payment_summary(cart_details=serializer.data)

        return Response(
            {"cart_details": serializer.data, "payment_summary": payment_summary}
        )


class PlaceOrderView(APIView):
    def post(self, request, *args, **kwargs):
        response = {"order": None, "order_items": []}

        user_cart_details = CartItem.objects.filter(
            user=request.user.id
        ).select_related("product")

        if not user_cart_details.exists():
            raise APIException("Your Cart is Empty. Please Add Product to Cart.")

        # Check is product available
        _ = is_product_in_stock(cart_details=user_cart_details)

        try:
            with transaction.atomic():
                # create order object
                order = create_order_obj(user=request.user.id)
                response["order"] = order

                # Adding iteam in OrderItem Model (Moving from CartItem -> OrderItem)
                order_item_obj = add_order_item(
                    order_id=order["id"], cart_details=user_cart_details
                )
                serializer = OrderItemSerializer(order_item_obj, many=True)
                response["order_items"] = serializer.data

                # updating Product Quantity
                for cart_item in user_cart_details:
                    _ = cart_item.product.deduct_quantity(
                        qty=cart_item.quantity, save=True
                    )

                # Deleting products from cart
                user_cart_details.delete()
        except Exception as e:
            raise APIException({"message": "Something went wrong while placing order."})

        return Response(response, status=status.HTTP_200_OK)


class OrderHistory(generics.ListAPIView):
    serializer_class = OrderSerializer
    queryset = Order.objects.prefetch_related().all()

    def get_queryset(self):
        queryset = Order.objects.prefetch_related().filter(user=self.request.user.id)
        return queryset


class OrderPaymentView(APIView):
    def post(self, request, *args, **kwargs):
        order_id = self.kwargs.get("order_id", None)
        order_with_items = None

        serializer = OrderPaymentPayloadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            order_with_items = Order.objects.prefetch_related("order_items").get(
                id=order_id
            )
        except Order.DoesNotExist:
            raise NotFound(detail="Order not found", code=404)

        if order_with_items:
            _ = complete_payment(
                order_with_items=order_with_items,
                payment_method=request.data["payment_method"],
            )

        return Response({"message": "Payment Done."}, status=status.HTTP_200_OK)
