from django_filters import FilterSet, NumberFilter, BooleanFilter
from .models import Product


class ProductFilter(FilterSet):
    # Filter by category ID
    category = NumberFilter(field_name="category__id")
    is_available_only = BooleanFilter(method="filter_by_availability")

    class Meta:
        model = Product
        fields = [
            "category",
            "is_available_only",
        ]

    def filter_by_availability(self, queryset, name, value):
        if value:
            return queryset.filter(quantity__gt=0)
        return queryset
