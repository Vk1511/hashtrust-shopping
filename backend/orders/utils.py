from rest_framework.exceptions import APIException


def calculate_payment_summary(cart_details):
    total_amount = 0
    total_discount = 0
    final_amount = 0

    for item in cart_details:
        total_amount += item["amount"]
        total_discount += item["product_details"]["discount"]
        final_amount += item["final_amount"]

    if total_discount != 0:
        total_discount = (total_amount / total_discount) * 100

    return {
        "total_amount": total_amount,
        "total_discount": total_discount,
        "final_amount": final_amount,
    }


def is_product_in_stock(cart_details):
    for cart_item in cart_details:
        if cart_item.quantity > cart_item.product.quantity:
            raise APIException(
                "Product is out of stock or quantity is less than your requested quantity."
            )


def calculate_price_for_given_quantity(quantity, price, discount):
    total = quantity * price
    if discount != 0:
        total = (total / discount) * 100
    return total
