from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserCartViewSet

router = DefaultRouter()
router.register("cart", UserCartViewSet)
urlpatterns = router.urls

# urlpatterns.extend(
#     [
#         # path(
#         #     "categories-info",
#         #     ProductCategoryWithProductCount.as_view(),
#         #     name="fetch-category-with-product-count",
#         # ),
#     ]
# )
