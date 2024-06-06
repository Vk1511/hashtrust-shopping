from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserCartViewSet, PlaceOrderView, OrderPaymentView, OrderHistory

router = DefaultRouter()
router.register("cart", UserCartViewSet)
urlpatterns = router.urls

urlpatterns.extend(
    [
        path(
            "place-order",
            PlaceOrderView.as_view(),
            name="place-order",
        ),
        path(
            "order/<int:order_id>/payment",
            OrderPaymentView.as_view(),
            name="place-order",
        ),
        path(
            "order-history",
            OrderHistory.as_view(),
            name="place-order",
        ),
    ]
)
