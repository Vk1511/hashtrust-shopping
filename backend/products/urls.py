from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProductCategoryViewSet,
    ProductViewSet,
    ProductCategoryWithProductCount,
)

router = DefaultRouter()
router.register("categories", ProductCategoryViewSet)
router.register("", ProductViewSet)
urlpatterns = router.urls

urlpatterns.extend(
    [
        path(
            "categories-info",
            ProductCategoryWithProductCount.as_view(),
            name="fetch-category-with-product-count",
        ),
    ]
)
