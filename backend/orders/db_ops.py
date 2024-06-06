from django.db.models import Sum
from rest_framework.exceptions import APIException
from .models import Order, OrderItem, Payment
from .serializers import OrderSerializer, PaymentSerializer
from .utils import calculate_price_for_given_quantity


def create_order_obj(user):
    serializer = OrderSerializer(data={"user": user})
    serializer.is_valid(raise_exception=True)
    serializer.save()
    order = serializer.data
    return order


def add_order_item(order_id, cart_details):
    order = Order.objects.get(id=order_id)

    # creating object to perform bulk insert
    order_item_obj = [
        OrderItem(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=calculate_price_for_given_quantity(
                quantity=item.quantity,
                price=item.product.price,
                discount=item.product.discount,
            ),
        )
        for item in cart_details
    ]

    OrderItem.objects.bulk_create(order_item_obj)
    return order_item_obj


def complete_payment(
    order_with_items,
    payment_method,
):
    try:
        order_items = order_with_items.order_items.all()
        amount = order_items.aggregate(total_price=Sum("price"))["total_price"]
        serializer = PaymentSerializer(
            data={
                "order": order_with_items.id,
                "amount": amount,
                "payment_method": payment_method,
                "payment_status": Payment.PaymentStatus.DONE,
            }
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        order_with_items.update_order_status(status=True, save=True)
    except Exception as e:
        raise APIException("Something went wrong while processing payment request.")
