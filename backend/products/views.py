from rest_framework import viewsets, generics
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Count
from .models import Product, ProductCategory
from jwt_auth.permissions import IsAdminOrSuperAdminOrReadOnly
from .serializers import (
    ProductCategorySerializer,
    ProductSerializer,
    ProductCategoryCountSerializer,
)
from .filters import ProductFilter
from rest_framework import filters


class ProductCategoryViewSet(viewsets.ModelViewSet):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer
    # Allow read to any user, write restricted to admin/super admin
    permission_classes = [IsAdminOrSuperAdminOrReadOnly]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    # Allow read to any user, write restricted to admin/super admin
    permission_classes = [IsAdminOrSuperAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = ProductFilter
    search_fields = ["name", "description", "category__name"]


class ProductCategoryWithProductCount(generics.ListAPIView):
    permission_classes = [IsAdminOrSuperAdminOrReadOnly]

    def get_queryset(self):
        queryset = ProductCategory.objects.annotate(count=Count("products"))
        return queryset

    def list(self, request):
        queryset = self.get_queryset()
        res_data = {}
        if queryset.exists():
            serializer = ProductCategoryCountSerializer(queryset, many=True)
            total_items = queryset.aggregate(total_items=Count("products"))[
                "total_items"
            ]
            res_data = {"category": serializer.data, "total": total_items}
            return Response(res_data)

        return Response(res_data)
